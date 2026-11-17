"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { INITIAL_BLOGS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  List,
  MessageSquare,
  Send,
  Share2,
  Sparkles,
  Tag,
} from "lucide-react";

interface ReaderComment {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
}

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { currentUser, courses, showNotification } = useApp();

  const post = INITIAL_BLOGS.find((b) => b.slug === slug);
  if (!post) {
    notFound();
  }

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState(currentUser?.name || "");
  const [comments, setComments] = useState<ReaderComment[]>([
    {
      id: "cmt-1",
      author: "David Miller",
      role: "Managing Director, Zenith Commerce",
      content:
        "This framework clarified our Q4 planning immediately. Separating contribution margin by cohort exposed two underperforming acquisition channels we were able to fix within weeks.",
      date: "2 days ago",
    },
    {
      id: "cmt-2",
      author: "Sarah Jenkins",
      role: "IEH Academy Member",
      content:
        "Clear, practical, and zero fluff. Appreciate how actionable the checklist items are for early-stage operators.",
      date: "5 days ago",
    },
  ]);

  const relatedPosts = INITIAL_BLOGS.filter((b) => b.id !== post.id)
    .sort((a, b) => {
      const aSame = a.category === post.category ? 1 : 0;
      const bSame = b.category === post.category ? 1 : 0;
      return bSame - aSame;
    })
    .slice(0, 3);

  const recommendedCourse = courses[0];

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
      showNotification("Article link copied to clipboard!");
    } catch {
      showNotification("Share link ready.");
    }
  };

  const handleToggleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    showNotification(next ? "Article saved to your reading list." : "Removed from saved articles.");
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const author = commentName.trim() || currentUser?.name || "IEH Reader";
    const newComment: ReaderComment = {
      id: `cmt-${Date.now()}`,
      author,
      role: currentUser?.title || "Community Reader",
      content: commentText.trim(),
      date: "Just now",
    };
    setComments([newComment, ...comments]);
    setCommentText("");
    showNotification("Your comment has been published!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172033]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Editorial Header */}
        <section className="bg-[#F5F7FB] border-b border-[#E5EAF1] pt-10 pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-[#64748B]"
            >
              <Link href="/" className="hover:text-[#2457D6] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/blogs" className="hover:text-[#2457D6] transition-colors">
                Blogs
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[#2457D6]">{post.category}</span>
            </nav>

            {/* Category + Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#2457D6] text-xs font-bold">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.publishedAt)}
              </span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748B]">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {post.readTime}
              </span>
            </div>

            {/* Title & Excerpt */}
            <div className="space-y-4">
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#172033] tracking-tight leading-tight">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </div>

            {/* Author & Action Controls */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0">
                  <Image
                    src={post.authorAvatar}
                    alt={post.authorName}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#172033]">{post.authorName}</p>
                  <p className="text-xs text-[#64748B]">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleToggleBookmark}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                    isBookmarked
                      ? "bg-blue-50 border-blue-200 text-[#2457D6]"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-current" : ""}`} />
                  <span>{isBookmarked ? "Saved" : "Save"}</span>
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="relative h-[260px] sm:h-[400px] lg:h-[460px] w-full rounded-3xl overflow-hidden border border-[#E5EAF1] shadow-lg bg-slate-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Article Body + Sticky Sidebar */}
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Main Article Content */}
              <article className="lg:col-span-8 space-y-10">
                {/* Key Takeaways Box */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#F5F7FB] border border-blue-200/70 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2457D6]">
                    <Sparkles className="w-4 h-4 text-[#E9A23B]" />
                    <span>Executive Key Takeaways</span>
                  </div>
                  <ul className="space-y-2.5">
                    {post.keyTakeaways.map((point, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-sm text-[#172033]">
                        <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sections */}
                <div className="space-y-10">
                  {post.sections.map((section) => (
                    <div key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033] tracking-tight">
                        {section.heading}
                      </h2>

                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-base text-slate-700 leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}

                      {section.bulletPoints && section.bulletPoints.length > 0 && (
                        <ul className="space-y-3 pt-2 pl-1">
                          {section.bulletPoints.map((item, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed"
                            >
                              <span className="w-2 h-2 rounded-full bg-[#2457D6] shrink-0 mt-2.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.callout && (
                        <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-blue-50/70 border-l-4 border-[#2457D6] text-sm sm:text-base font-semibold text-[#132238] leading-relaxed">
                          &ldquo;{section.callout}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  ))}
                </div>

                {/* Topic Tags */}
                <div className="pt-6 border-t border-[#E5EAF1] flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider mr-1">
                    Topics:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#F5F7FB] border border-slate-200 text-xs font-semibold text-slate-700"
                    >
                      <Tag className="w-3 h-3 text-[#2457D6]" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author Bio Box */}
                <div className="p-6 sm:p-7 rounded-2xl bg-[#F5F7FB] border border-[#E5EAF1] flex flex-col sm:flex-row items-start gap-5">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={post.authorAvatar}
                      alt={post.authorName}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#2457D6]">
                        Written By
                      </p>
                      <h3 className="font-heading font-extrabold text-lg text-[#172033]">
                        {post.authorName}
                      </h3>
                      <p className="text-xs font-semibold text-[#64748B]">{post.authorRole}</p>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{post.authorBio}</p>
                  </div>
                </div>

                {/* Reader Discussion / Comments */}
                <div className="pt-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-extrabold text-xl text-[#172033] flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-[#2457D6]" />
                      <span>Reader Discussion ({comments.length})</span>
                    </h3>
                  </div>

                  {/* Comment Form */}
                  <form
                    onSubmit={handlePostComment}
                    className="p-5 sm:p-6 rounded-2xl bg-[#F5F7FB] border border-[#E5EAF1] space-y-4"
                  >
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Your Name</label>
                      <input
                        type="text"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#172033] focus:outline-none focus:border-[#2457D6]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Share your thoughts *</label>
                      <textarea
                        rows={3}
                        required
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Ask a follow-up question or share your experience with this framework..."
                        className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-[#172033] focus:outline-none focus:border-[#2457D6]"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Post Comment</span>
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-5 rounded-2xl bg-white border border-[#E5EAF1] space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold text-[#172033]">{comment.author}</p>
                            <p className="text-[11px] text-[#64748B]">{comment.role}</p>
                          </div>
                          <span className="text-xs text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>

              {/* Sticky Right Sidebar */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="lg:sticky lg:top-28 space-y-6">
                  {/* Table of Contents */}
                  <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-[#E5EAF1] space-y-4">
                    <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#172033]">
                      <List className="w-4 h-4 text-[#2457D6]" />
                      <span>In This Article</span>
                    </div>
                    <nav className="space-y-2">
                      {post.sections.map((section, idx) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="flex items-start gap-2.5 text-xs font-semibold text-slate-600 hover:text-[#2457D6] transition-colors py-1"
                        >
                          <span className="text-[#2457D6] font-bold">0{idx + 1}.</span>
                          <span className="leading-snug">{section.heading}</span>
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Consultation CTA Card */}
                  <div className="p-6 rounded-2xl bg-[#132238] text-white space-y-4 shadow-md">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[#E9A23B] text-[10px] font-bold uppercase tracking-wider">
                      IEH Advisory
                    </span>
                    <h3 className="font-heading font-extrabold text-xl leading-snug">
                      Need Tailored Guidance for Your Venture?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Book a 1-on-1 strategy session with our founders and senior business advisors to
                      audit your roadmap and accelerate execution.
                    </p>
                    <Link
                      href="/consultation"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2457D6] hover:bg-[#193F9B] text-white text-xs font-bold transition-colors"
                    >
                      <span>Book a Consultation</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  {/* Featured Academy Course Card */}
                  {recommendedCourse && (
                    <div className="p-5 rounded-2xl bg-white border border-[#E5EAF1] shadow-xs space-y-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2457D6]">
                        Recommended Program
                      </span>
                      <div className="relative h-36 rounded-xl overflow-hidden bg-slate-100">
                        <Image
                          src={recommendedCourse.thumbnail}
                          alt={recommendedCourse.title}
                          fill
                          sizes="320px"
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-[#172033] leading-snug">
                        {recommendedCourse.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2">
                        {recommendedCourse.shortDescription}
                      </p>
                      <Link
                        href={`/courses/${recommendedCourse.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2457D6] hover:text-[#193F9B]"
                      >
                        Explore Curriculum <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        <section className="py-16 bg-[#F5F7FB] border-t border-[#E5EAF1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#2457D6]">
                  Continue Reading
                </p>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033] mt-1">
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Blog Articles</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blogs/${related.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5EAF1] overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-200 transition-all flex flex-col"
                >
                  <div className="relative h-44 bg-slate-100 overflow-hidden">
                    <Image
                      src={related.coverImage}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[#2457D6]">
                      {related.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <p className="text-[11px] font-medium text-[#64748B]">
                        {formatDate(related.publishedAt)} • {related.readTime}
                      </p>
                      <h3 className="font-heading font-bold text-base text-[#172033] group-hover:text-[#2457D6] transition-colors line-clamp-2 leading-snug">
                        {related.title}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] pt-2">
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
