"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Clock, Share2, FileText, ChevronRight, CheckCircle2, Plus, ArrowRight } from "lucide-react";
import { blogPosts, ContentBlock } from "@/lib/blog-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const containerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const isClickScrolling = useRef<boolean>(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const post = blogPosts.find((p) => p.slug === slug);
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const sections = post
    ? post.content
        .filter((block): block is Extract<ContentBlock, { type: "h2" }> => block.type === "h2")
        .map((b) => ({ title: b.text, id: slugify(b.text) }))
    : [];

  useGSAP(() => {
    if (!post) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
      },
    });

    gsap.fromTo(
      ".post-reveal",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    sections.forEach(({ id }) => {
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 110px",
        end: "bottom 110px",
        fastScrollEnd: true,
        onEnter: () => {
          if (!isClickScrolling.current) setActiveSection(id);
        },
        onEnterBack: () => {
          if (!isClickScrolling.current) setActiveSection(id);
        },
      });
    });
  }, { scope: containerRef, dependencies: [post] });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    isClickScrolling.current = true;
    setActiveSection(id);

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const topOffset = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: topOffset, behavior: "smooth" });

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0b] font-mono text-zinc-300">
        <FileText size={32} className="mb-4 text-zinc-600" />
        <p className="tracking-widest">Article not found.</p>
        <Link href="/blogs" className="mt-6 text-[#C39967] hover:underline">
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="w-full bg-[#07090b] text-[#f4f4f5] min-h-screen relative pb-32 selection:bg-[#C39967]/20 selection:text-white">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-zinc-800">
        <div ref={progressRef} className="h-full bg-[#C39967] origin-left scale-x-0" />
      </div>

      {/* Main Content Area with safe top padding to clear navbar */}
      <div className="container mx-auto px-6 md:px-12 max-w-6xl pt-32 md:pt-40 post-reveal">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Sidebar: Dark Stepper Navigation */}
          <aside className="lg:w-80 shrink-0 w-full lg:sticky lg:top-28 self-start">
            <div className="bg-[#0f1317] text-[#f4f4f5] border border-zinc-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden flex flex-col gap-5">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C39967]/10 blur-3xl pointer-events-none rounded-full" />

              {/* Meta Summary Strip */}
              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-zinc-800/80 relative z-10">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">
                    Published
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 block truncate">{post.date}</span>
                  <div className="flex items-center gap-1 text-[11px] text-[#C39967] font-mono mt-0.5">
                    <Clock size={11} /> {post.readTime}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mb-0.5">
                    Author Desk
                  </span>
                  <span className="text-xs font-semibold text-zinc-200 block truncate">{post.author}</span>
                  <button 
                    onClick={handleShare}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-[#C39967] transition-colors mt-0.5"
                  >
                    <Share2 size={10} /> Share
                  </button>
                </div>
              </div>

              {/* Section Index Stepper */}
              {sections.length > 0 && (
              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-3">
                  Sections Index
                </span>
                
                <nav aria-label="Table of contents" className="relative flex flex-col gap-1.5 pl-3">
                  {/* Vertical Connecting Guide Rail adjusted to sit cleanly behind the dots */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-zinc-800 pointer-events-none" />

                  {sections.map(({ title, id }, idx) => {
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={`group text-left text-xs py-1.5 pl-4 pr-2 rounded-md transition-all duration-150 flex items-center justify-between relative cursor-pointer ${
                          isActive
                            ? "text-white font-medium bg-zinc-900/80"
                            : "text-zinc-400 hover:text-zinc-200"
                        }`}
                      >
                        {/* Stepper Dot positioned precisely over the vertical line */}
                        <span
                          className={`absolute -left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                            isActive
                              ? "bg-[#C39967] scale-125 shadow-[0_0_8px_#C39967]"
                              : "bg-zinc-700 group-hover:bg-zinc-500"
                          }`}
                        />
                        <span className="truncate leading-tight text-[12px]">
                          {idx + 1}. {title}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
              )}

            </div>
          </aside>

          {/* Right Column: Article Body (Title -> Feature Image -> Content) */}
          <article className="flex-1 max-w-[720px] w-full pt-2">
            
            {/* 1. Header Section: Title & Excerpt */}
            <div className="mb-10">
              <nav className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-6">
                <Link href="/blogs" className="hover:text-white transition-colors flex items-center gap-1">
                  <ArrowLeft size={14} /> Directory
                </Link>
                <ChevronRight size={12} className="opacity-40" />
                <span className="text-[#C39967]">{post.category}</span>
              </nav>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed border-l-2 border-[#C39967] pl-5">
                {post.excerpt}
              </p>
            </div>

            {/* 2. Feature Image with Aspect Video Fit */}
            {post.featureImage && (
              <figure className="mb-14 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0f1317] shadow-xl relative">
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.featureImage}
                    alt={post.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover object-center"
                  />
                </div>
              </figure>
            )}

            {/* 3. Main Article Content Blocks */}
            <div className="text-[17px] text-zinc-300 leading-[1.85] font-normal space-y-6">
              {post.content.map((block, idx) => {
                switch (block.type) {
                  case "paragraph":
                    return (
                      <p key={idx} className="mb-6 text-zinc-300">
                        {block.text}
                      </p>
                    );

                  case "h2":
                    return (
                      <h2
                        key={idx}
                        id={slugify(block.text)}
                        className="text-3xl font-extrabold text-white tracking-tight mt-16 mb-6 scroll-mt-28"
                      >
                        {block.text}
                      </h2>
                    );

                  case "h3":
                    return (
                      <div key={idx} className="flex items-start gap-3 mt-10 mb-4">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#C39967] shrink-0" />
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {block.text}
                        </h3>
                      </div>
                    );

                  case "quote":
                    return (
                      <blockquote key={idx} className="pl-6 border-l-2 border-[#C39967] bg-[#0f1317] py-6 pr-6 rounded-r-2xl my-10 border border-zinc-800">
                        <p className="italic text-white font-medium text-xl leading-relaxed mb-2">"{block.text}"</p>
                        {block.author && <footer className="text-xs font-mono font-bold uppercase tracking-widest text-[#C39967]">— {block.author}</footer>}
                      </blockquote>
                    );

                  case "list":
                    return (
                      <div key={idx} className="my-8 rounded-2xl bg-[#0f1317] text-[#f4f4f5] border border-zinc-800 p-6 md:p-8 shadow-xl">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C39967] block mb-4 border-b border-zinc-800 pb-2">
                          Key Takeaways
                        </span>
                        <ul className="space-y-4">
                          {block.items.map((item, i) => {
                            const [boldPart, ...restParts] = item.split(":");
                            const restPart = restParts.join(":");
                            return (
                              <li key={i} className="flex items-start gap-3 text-[15px]">
                                <span className="text-[#C39967] mt-0.5 shrink-0"><CheckCircle2 size={16} /></span>
                                <span className="leading-relaxed text-zinc-300">
                                  {restPart ? (
                                    <>
                                      <strong className="text-white font-semibold">{boldPart}:</strong>
                                      {restPart}
                                    </>
                                  ) : (
                                    item
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );

                  case "image":
                    return (
                      <figure key={idx} className="my-12">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-[#0f1317] shadow-sm">
                          <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 720px"
                            className="object-contain p-4"
                          />
                        </div>
                        {block.caption && (
                          <figcaption className="text-xs font-mono font-medium text-zinc-500 uppercase tracking-wider text-center mt-3 px-4">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );

                  case "panel":
                    return (
                      <div key={idx} className="my-12 p-8 rounded-2xl bg-[#0f1317] text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between font-mono text-xs uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
                          <span className="text-zinc-300">{block.label}</span>
                          <span className="text-[#C39967] font-bold mt-2 sm:mt-0">{block.subLabel}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {block.columns.map((col, i) => (
                            <div key={i} className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                              <h4 className="text-xs font-bold text-[#C39967] font-mono uppercase tracking-widest mb-2">{col.title}</h4>
                              <p className="text-sm text-zinc-300 leading-relaxed font-light m-0">{col.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );

                  case "faq":
                    return (
                      <div key={idx} className="my-10 space-y-4">
                        {block.items.map((faq, i) => (
                          <details key={i} className="group border border-zinc-800 bg-[#0f1317] rounded-xl overflow-hidden shadow-sm">
                            <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-white text-lg list-none transition-colors group-open:bg-zinc-900/60">
                              <span className="pr-4">{faq.question}</span>
                              <span className="shrink-0 text-[#C39967] bg-[#C39967]/10 p-1.5 rounded-md border border-[#C39967]/20 group-open:rotate-45 transition-transform duration-300">
                                <Plus size={16} />
                              </span>
                            </summary>
                            <div className="px-6 pb-6 pt-2 text-zinc-400 leading-relaxed border-t border-zinc-800 bg-zinc-950/40">
                              {faq.answer}
                            </div>
                          </details>
                        ))}
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                End of Briefing
              </span>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-xs font-mono font-bold text-[#C39967] hover:underline uppercase tracking-wider cursor-pointer"
              >
                Back to Top ↑
              </button>
            </div>

            {/* Post-Article CTA Block */}
            <div className="mt-16 bg-[#0f1317] rounded-2xl p-8 md:p-12 text-white border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C39967]/10 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C39967] block mb-3">
                  Systems Integration
                </span>
                <h3 className="text-2xl font-bold mb-4">Build secure, scalable infrastructure.</h3>
                <p className="text-zinc-400 mb-8 max-w-lg text-sm leading-relaxed">
                  The strategies and systems detailed in this briefing are built by our operations and technology desks. Reach out to explore how we deploy these solutions.
                </p>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-white text-black hover:bg-[#C39967] rounded-lg text-xs font-mono font-bold uppercase tracking-widest transition-all"
                >
                  Contact Our Desk
                </Link>
              </div>
            </div>

            {/* Related Articles Section */}
            {relatedPosts.length > 0 && (
              <div className="mt-24 pt-12 border-t border-zinc-800">
                <h3 className="text-2xl font-extrabold text-white mb-8 tracking-tight">More Blogs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/blogs/${related.slug}`}
                      className="group p-6 rounded-2xl bg-[#0f1317] border border-zinc-800 shadow-sm hover:shadow-md hover:border-[#C39967]/50 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-300 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
                            {related.category.split("·")[0].trim()}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#C39967] transition-colors">
                          {related.title}
                        </h4>
                        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-6">
                          {related.excerpt}
                        </p>
                      </div>
                      <div className="flex items-center text-xs font-mono font-semibold text-zinc-300 group-hover:text-[#C39967] transition-colors uppercase tracking-wider">
                        Read <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </article>
        </div>
      </div>
    </main>
  );
}