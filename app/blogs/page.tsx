"use client";

import { useState, useRef, useMemo, MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

export default function InsightsPage() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const cube1X = useRef<gsap.QuickToFunc | null>(null);
  const cube1Y = useRef<gsap.QuickToFunc | null>(null);
  const cube2X = useRef<gsap.QuickToFunc | null>(null);
  const cube2Y = useRef<gsap.QuickToFunc | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogPosts.map((p) => p.category.split("·")[0].trim())));
    return ["All", ...cats];
  }, []);

  const featuredPost = blogPosts[0];

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (selectedCategory === "All") return true;
      return post.category.toLowerCase().includes(selectedCategory.toLowerCase());
    });
  }, [selectedCategory]);

  useGSAP(
    () => {
      cube1X.current = gsap.quickTo(".interactive-cube-1", "x", { duration: 0.8, ease: "power3.out" });
      cube1Y.current = gsap.quickTo(".interactive-cube-1", "y", { duration: 0.8, ease: "power3.out" });
      cube2X.current = gsap.quickTo(".interactive-cube-2", "x", { duration: 1.2, ease: "power3.out" });
      cube2Y.current = gsap.quickTo(".interactive-cube-2", "y", { duration: 1.2, ease: "power3.out" });

      gsap.to(".cube-float-1", {
        y: -15,
        rotation: 4,
        transformOrigin: "center center",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".cube-float-2", {
        y: 12,
        rotation: -5,
        transformOrigin: "center center",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".insight-hero-block",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".filter-capsule",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          "-=0.4"
        )
        .fromTo(
          ".editorial-card",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.3"
        );
    },
    { scope: container, dependencies: [selectedCategory] }
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 100;
    const y = (e.clientY / window.innerHeight - 0.5) * 100;

    cube1X.current?.(x * 0.6);
    cube1Y.current?.(y * 0.6);
    cube2X.current?.(x * -0.4);
    cube2Y.current?.(y * -0.4);
  };

  return (
    <main
      ref={container}
      onMouseMove={handleMouseMove}
      className="w-full min-h-screen bg-[#07090b] text-[#f4f4f5] selection:bg-[#C39967]/20 selection:text-white pt-28 md:pt-36 pb-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[850px] h-[360px] bg-[#C39967]/10 blur-[180px] rounded-full" />
        <div className="absolute top-[40%] -right-32 w-[550px] h-[550px] bg-[#C39967]/5 blur-[200px] rounded-full" />

        <div className="interactive-cube-1 absolute -top-4 -right-4 md:top-8 md:right-16 will-change-transform">
          <svg
            viewBox="0 0 240 260"
            className="w-[220px] h-[240px] md:w-[320px] md:h-[350px] opacity-30 cube-float-1"
          >
            <polygon points="120,20 200,66 120,112 40,66" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="40,66 120,112 120,204 40,158" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="120,112 200,66 200,158 120,204" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        <div className="interactive-cube-2 absolute top-[48%] -left-12 md:left-6 will-change-transform">
          <svg
            viewBox="0 0 240 260"
            className="w-[180px] h-[200px] md:w-[260px] md:h-[280px] opacity-20 cube-float-2"
          >
            <polygon points="120,20 200,66 120,112 40,66" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="40,66 120,112 120,204 40,158" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
            <polygon points="120,112 200,66 200,158 120,204" fill="none" stroke="#5A6572" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="insight-hero-block mb-12 text-center md:text-left">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-6 rounded-md bg-zinc-900 border border-zinc-800 text-xs font-mono font-medium text-[#C39967] uppercase tracking-wider">
            <BookOpen size={13} />
            Intelligence &amp; Reports
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] max-w-3xl mx-auto md:mx-0">
            Insights on Finance, Technology, and Governance.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mx-auto md:mx-0">
            Practical breakdowns, operational updates, and industry research written directly by our operating desks.
          </p>
        </div>

        {featuredPost && (
          <section className="insight-hero-block mb-20 md:mb-28">
            <Link
              href={`/blogs/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#0f1317] border border-zinc-800/80 rounded-3xl p-6 md:p-10 transition-all duration-300 hover:border-[#C39967]/50 hover:shadow-[0_20px_50px_rgba(195,153,103,0.1)]"
            >
              {/* Featured Image Widescreen Aspect Ratio Box */}
              <div className="lg:col-span-7 w-full aspect-video rounded-2xl bg-[#07090b] border border-zinc-800/60 relative overflow-hidden">
                {featuredPost.featureImage ? (
                  <Image 
                    src={featuredPost.featureImage}
                    alt={featuredPost.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover object-center opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1317] via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-black bg-[#C39967] px-3 py-1.5 rounded font-bold shadow-md">
                    Featured Report
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs font-mono text-zinc-400">
                    {featuredPost.date}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-600" />
                  <span className="text-xs font-mono text-[#C39967] font-semibold">
                    {featuredPost.category}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-[1.15] mb-5 group-hover:text-[#C39967] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-zinc-400 text-base leading-relaxed mb-8 line-clamp-3 font-normal">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-zinc-500">
                    <Clock size={13} className="text-[#C39967]" /> {featuredPost.readTime}
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-[#C39967] uppercase tracking-wider">
                    Read Briefing <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-zinc-800/80 gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              All Publications
            </h2>
            <p className="text-sm text-zinc-400 font-normal">
              Technical notes, architecture reviews, and market blogs.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-capsule text-xs font-mono py-2 px-4 rounded-full transition-all duration-200 border cursor-pointer ${
                    isSelected
                      ? "bg-[#C39967] text-black border-[#C39967] font-bold shadow-md"
                      : "bg-[#0f1317] text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="editorial-card group flex flex-col justify-between"
            >
              <div>
                <div className="w-full aspect-video rounded-2xl bg-[#0f1317] border border-zinc-800/80 mb-5 relative overflow-hidden flex items-end p-4 transition-all duration-300 group-hover:border-[#C39967]/50 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                  {post.featureImage ? (
                    <Image 
                      src={post.featureImage} 
                      alt={post.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover object-center opacity-60 group-hover:opacity-95 transition-all duration-500 group-hover:scale-105 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:24px_24px]" />
                  )}
                  
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 border border-zinc-700/60 bg-[#07090b]/90 px-3 py-1.5 rounded relative z-10 backdrop-blur-md">
                    {post.category.split("·")[0].trim()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-[#C39967] transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-5 mt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono font-medium text-zinc-300">
                <span className="text-[#C39967] group-hover:underline">Read briefing</span>
                <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-[#C39967] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}