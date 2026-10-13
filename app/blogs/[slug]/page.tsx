// app/blogs/[slug]/page.tsx
import { Metadata } from "next";
import { blogPosts } from "@/lib/blog-data";
import BlogPostClient from "./BlogPostClient";

// 1. Update Props to reflect that params is a Promise
type Props = {
  params: Promise<{ slug: string }>;
};

// 2. Make generateMetadata async and await params
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
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
      description: post.excerpt,
      images: [post.featureImage],
    },
  };
}

// 3. Make the page component async and await params
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}