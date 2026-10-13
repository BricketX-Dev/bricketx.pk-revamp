import { Metadata } from "next";
import InsightsClient from "./InsightsClient";

export const metadata: Metadata = {
  title: "Insights on Finance, Technology, and Governance | BricketX",
  description: "Practical breakdowns, operational updates, and industry research written directly by our operating desks.",
  openGraph: {
    title: "Insights & Reports | BricketX",
    description: "Practical breakdowns, operational updates, and industry research written directly by our operating desks.",
    type: "website",
    // NOTE: Add a default image to your public folder for the main page preview
    images: [
      {
        url: "/images/blog/default-og-image.webp", 
        width: 1200,
        height: 630,
        alt: "BricketX Insights",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Insights & Reports | BricketX",
    description: "Practical breakdowns, operational updates, and industry research written directly by our operating desks.",
  }
};

export default function InsightsPage() {
  return <InsightsClient />;
}