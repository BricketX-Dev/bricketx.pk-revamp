import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact // BricketX Pakistan",
  description: "Get in touch with the BricketX operational hub in Karachi. Let's build the next system.",
};

export default function ContactPage() {
  return (
    <main className="w-full bg-[#0a0a0b] min-h-screen">
      {/* 1. DARK: Interactive Vector & Information Cards */}
      <ContactHero />

      {/* 2. LIGHT: Professional Inquiry Form */}
      <ContactForm />
    </main>
  );
}