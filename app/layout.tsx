import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BricketX Pakistan // Operational & Innovation Hub",
  description: "The Karachi engine room powering the global BricketX network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="bg-[#0a0a0b] text-white flex flex-col min-h-screen selection:bg-bricket-gold/30 selection:text-white">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <div className="flex-grow">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}