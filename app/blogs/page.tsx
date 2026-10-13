// app/blogs/page.tsx
import { Metadata } from "next";
import InsightsClient from "./InsightsClient";

// FIX: Shortened to fit comfortably inside the 125-150 char limits
const safeDescription = "Practical breakdowns, operational updates, and industry research from our desks.";

export const metadata: Metadata = {
  title: "Insights on Finance, Technology, and Governance | BricketX",
  description: safeDescription,
  openGraph: {
    title: "Insights & Reports | BricketX",
    description: safeDescription,
    type: "website",
    siteName: "BricketX", // FIX: Added site_name
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
    description: safeDescription,
  }
};

export default function InsightsPage() {
  return <InsightsClient />;
}