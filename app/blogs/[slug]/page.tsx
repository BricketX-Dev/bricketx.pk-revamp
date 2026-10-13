// app/blogs/[slug]/page.tsx
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  // Safely truncate the description to ~125 characters for optimal social/SEO preview
  const safeDescription = post.excerpt.length > 125 
    ? post.excerpt.substring(0, 122).trim() + "..." 
    : post.excerpt;

  return {
    title: post.title,
    description: safeDescription, // Google Meta (truncated)
    openGraph: {
      title: post.title,
      description: safeDescription, // Social OG (truncated)
      type: "article",
      siteName: "BricketX", // FIX: Added site_name for Discord/Slack
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.featureImage,
          width: 1200, 
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: safeDescription,
      images: [post.featureImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}