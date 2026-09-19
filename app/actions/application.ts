"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("CRITICAL: Missing Supabase Environment Variables.");
}

if (!resendApiKey) {
  throw new Error("CRITICAL: Missing Resend API Key.");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

export async function submitApplicationAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const department_id = formData.get("department_id") as string;
    const department_name = formData.get("department_name") as string; // Fetching full name
    const resumeFile = formData.get("resume") as File;

    if (!resumeFile || resumeFile.size === 0) {
      throw new Error("A resume file is required.");
    }

    const fileBuffer = await resumeFile.arrayBuffer();
    const fileExt = resumeFile.name.split('.').pop();
    const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${department_id}/${uniqueFileName}`; 

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(filePath, fileBuffer, {
        contentType: resumeFile.type,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw new Error(`Storage Error: ${uploadError.message}`);

    const { error: dbError } = await supabase.from("applications").insert([
      {
        name,
        email,
        phone: phone || null,
        department_id,
        resume_path: uploadData.path,
      },
    ]);

    if (dbError) throw new Error(`Database Error: ${dbError.message}`);

    const { data: signedUrlData } = await supabase.storage
      .from("resumes")
      .createSignedUrl(uploadData.path, 604800); 

    const resumeLink = signedUrlData?.signedUrl || "#";

    await resend.emails.send({
      from: "BricketX HR <info@bricketx.pk>", 
      to: "info@bricketx.pk",
      subject: `New Requisition Application // ${department_name.toUpperCase()} // ${name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0D0E12; padding: 24px; border-bottom: 3px solid #C39967;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">BricketX <span style="color: #C39967;">Hiring Desk</span></h2>
          </div>
          
          <div style="padding: 32px 24px;">
            <h3 style="margin-top: 0; margin-bottom: 24px; color: #111827; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">New Application Received</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 140px;">Applicant Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Target Department</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600; text-transform: uppercase;">${department_name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Return Route</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #C39967; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Phone Number</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${phone || "Not Provided"}</td>
              </tr>
            </table>

            <div style="margin-top: 32px; text-align: center;">
              <a href="${resumeLink}" style="display: inline-block; padding: 14px 28px; background-color: #111827; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; border: 1px solid #374151;">
                Download Resume (PDF/DOCX)
              </a>
              <p style="margin-top: 12px; color: #9ca3af; font-size: 11px;">This secure link expires in 7 days.</p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">BricketX Application Routing System</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "BricketX Careers <info@bricketx.pk>", 
      to: email,
      subject: "Application Secured // BricketX",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <div style="background-color: #0D0E12; padding: 32px 24px; border-bottom: 3px solid #C39967; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Bricket<span style="color: #C39967;">X</span></h2>
          </div>
          
          <div style="padding: 40px 32px;">
            <h3 style="margin-top: 0; color: #111827; font-size: 18px; font-weight: 600;">Status: Application Logged & Secured</h3>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px; margin-top: 20px;">Hi ${name},</p>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">Thank you for your interest in joining the BricketX hub. We have successfully received and securely encrypted your application and resume for the <strong>${department_name.toUpperCase()}</strong> division.</p>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">Our hiring operations desk is currently reviewing your profile. If your methodology and background align with our current requisitions, a team member will reach out to schedule an initial discussion.</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
              <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 700;">The BricketX Hiring Desk</p>
              <p style="margin: 4px 0 0 0; color: #C39967; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Building the future of alternative investments.</p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Confidential Requisition &bull; End-to-End Encrypted</p>
            <p style="margin: 8px 0 0 0; color: #9ca3af; font-size: 11px;">BricketX Hub - Karachi, Pakistan</p>
          </div>

        </div>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Application Submission Error:", error);
    return { success: false, error: error.message };
  }
}