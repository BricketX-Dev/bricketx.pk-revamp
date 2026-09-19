"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase Environment Variables");
}

if (!resendApiKey) {
  throw new Error("Missing Resend API Key");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const resend = new Resend(resendApiKey);

export async function submitLeadAction(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  site_origin: string;
}) {
  try {
    // 1. Insert data into Supabase
    const { error: dbError } = await supabase.from("leads").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: formData.service,
        message: formData.message,
        site_origin: formData.site_origin,
        form_type: "contact",
      },
    ]);

    if (dbError) throw new Error(`Supabase Error: ${dbError.message}`);

    // 2. Send Professional Notification Email to Admin (Internal)
    await resend.emails.send({
      from: "BricketX Operations <info@bricketx.pk>", 
      to: "info@bricketx.pk",
      subject: `New Operations Lead // ${formData.name}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0D0E12; padding: 24px; border-bottom: 3px solid #C39967;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 1px;">BricketX <span style="color: #C39967;">Operations</span></h2>
          </div>
          
          <div style="padding: 32px 24px;">
            <h3 style="margin-top: 0; margin-bottom: 24px; color: #111827; font-size: 18px; border-bottom: 1px solid #e5e7eb; padding-bottom: 12px;">Incoming Transmission Received</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px; width: 120px;">Entity Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${formData.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Return Route</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;"><a href="mailto:${formData.email}" style="color: #C39967; text-decoration: none;">${formData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Phone Number</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${formData.phone || "Not Provided"}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 14px;">Category</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 14px; font-weight: 600;">${formData.service}</td>
              </tr>
            </table>

            <div style="margin-top: 28px; padding: 20px; background-color: #f9fafb; border-radius: 6px; border: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700;">Payload / Message Details</p>
              <p style="margin: 0; color: #111827; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>

          <div style="background-color: #f9fafb; padding: 16px 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 0; color: #9ca3af; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">BricketX Database Routing System</p>
          </div>
        </div>
      `,
    });

    // 3. Send Professional Confirmation Email to the User (External)
    await resend.emails.send({
      from: "BricketX <info@bricketx.pk>", 
      to: formData.email,
      subject: "Inquiry Acknowledged // BricketX",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <div style="background-color: #0D0E12; padding: 32px 24px; border-bottom: 3px solid #C39967; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">Bricket<span style="color: #C39967;">X</span></h2>
          </div>
          
          <div style="padding: 40px 32px;">
            <h3 style="margin-top: 0; color: #111827; font-size: 18px; font-weight: 600;">Status: Inquiry Logged & Acknowledged</h3>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px; margin-top: 20px;">Hi ${formData.name},</p>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">Thank you for initiating contact with the BricketX hub. We have successfully received and securely logged your inquiry regarding <strong>${formData.service.toUpperCase()}</strong>.</p>
            
            <p style="color: #4b5563; line-height: 1.6; font-size: 15px;">Our internal operations desk is currently reviewing your communication. A dedicated team member will be assigned to your case and will respond to this email address shortly.</p>
            
            <div style="margin-top: 40px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
              <p style="margin: 0; color: #111827; font-size: 15px; font-weight: 700;">The BricketX Operations Team</p>
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
    console.error("Submission error:", error);
    return { success: false, error: error.message };
  }
}