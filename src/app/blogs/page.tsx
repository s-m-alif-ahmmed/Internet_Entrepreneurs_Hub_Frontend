"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { INITIAL_BLOGS } from "@/lib/mock-data";
import { useApp } from "@/lib/store";
import {
  Search,
  Clock,
  Calendar,
  ArrowRight,
  BookOpen,
  Sparkles,
  Tag,
  CheckCircle2,
  Send,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Business Strategy",
  "Technology & AI",
  "Digital Marketing",
  "E-commerce",
  "Entrepreneurship",
  "Growth & Scaling",
] as const;

export default function BlogsPage() {
  const { showNotification } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "shortest">("latest");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredPost = useMemo(
    () => INITIAL_BLOGS.find((b) => b.featured) || INITIAL_BLOGS[0],
    []
  );

  const filteredPosts = useMemo(() => {
    let result = INITIAL_BLOGS.filter((post) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.authorName.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "shortest") {
      result = [...result].sort((a, b) => a.readMinutes - b.readMinutes);
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  const showFeaturedBanner =
    selectedCategory === "All" && !searchQuery.trim() && featuredPost;

  const gridPosts = showFeaturedBanner
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail("");
    showNotification("Subscribed to the IEH Executive Brief!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#172033]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1">
        {/* Hero Header */}
        <section className="bg-[#F5F7FB] border-b border-[#E5EAF1] py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#2457D6] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>IEH Editorial &amp; Insights</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight leading-tight">
                Practical Playbooks for{" "}
                <span className="text-[#2457D6]">Modern Entrepreneurs</span>
              </h1>

              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                Deep-dive frameworks on startup strategy, unit economics, digital operations,
                e-commerce scaling, and growth marketing written by IEH founders and senior advisors.
              </p>

              {/* Search Bar */}
              <div className="pt-2 max-w-xl mx-auto">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search articles, topics, tags, or authors..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm text-[#172033] placeholder:text-slate-400 shadow-xs focus:outline-none focus:border-[#2457D6] focus:ring-2 focus:ring-[#2457D6]/15 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article Spotlight */}
        {showFeaturedBanner && (
          <section className="py-12 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2457D6] mb-5">
                <Sparkles className="w-4 h-4 text-[#E9A23B]" />
                <span>Featured Executive Read</span>
              </div>

              <Link
                href={`/blogs/${featuredPost.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-white border border-[#E5EAF1] overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] bg-slate-100 overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#2457D6] shadow-xs">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#64748B]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2457D6]" />
                        {formatDate(featuredPost.publishedAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E9A23B]" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033] group-hover:text-[#2457D6] transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>

                    <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F5F7FB] text-slate-600 text-[11px] font-semibold border border-slate-200/70"
                        >
                          <Tag className="w-3 h-3 text-slate-400" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 shrink-0">
                        <Image
                          src={featuredPost.authorAvatar}
                          alt={featuredPost.authorName}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#172033]">{featuredPost.authorName}</p>
                        <p className="text-[11px] text-[#64748B]">{featuredPost.authorRole}</p>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2457D6] group-hover:gap-2.5 transition-all whitespace-nowrap">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Filter Bar + Articles Grid */}
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Category Filter Pills & Sort */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#E5EAF1]">
              <div className="flex flex-wrap items-center gap-2">
                {CATEGORIES.map((category) => {
                  const active = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? "bg-[#2457D6] text-white shadow-sm shadow-blue-500/20"
                          : "bg-[#F5F7FB] text-slate-600 hover:bg-slate-200/70 hover:text-[#172033]"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-semibold text-[#64748B]">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "latest" | "shortest")}
                  aria-label="Sort articles"
                  className="px-3.5 py-2 rounded-xl bg-[#F5F7FB] border border-slate-200 text-xs font-semibold text-[#172033] focus:outline-none focus:border-[#2457D6]"
                >
                  <option value="latest">Sort: Latest First</option>
                  <option value="shortest">Sort: Quickest Read</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {gridPosts.length === 0 ? (
              <div className="py-16 text-center bg-[#F5F7FB] rounded-3xl border border-[#E5EAF1] space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-[#172033]">
                    No matching articles found
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    Try adjusting your search keywords or selecting another topic category.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {gridPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl border border-[#E5EAF1] overflow-hidden shadow-xs hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col"
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="relative h-52 bg-slate-100 overflow-hidden block"
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#2457D6] shadow-xs">
                        {post.category}
                      </span>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {post.readTime}
                          </span>
                        </div>

                        <Link href={`/blogs/${post.slug}`} className="block">
                          <h3 className="font-heading font-bold text-lg text-[#172033] group-hover:text-[#2457D6] transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-sm text-[#64748B] line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 shrink-0">
                            <Image
                              src={post.authorAvatar}
                              alt={post.authorName}
                              fill
                              sizes="32px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#172033] truncate">
                              {post.authorName}
                            </p>
                            <p className="text-[10px] text-[#64748B] truncate">{post.authorRole}</p>
                          </div>
                        </div>

                        <Link
                          href={`/blogs/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:text-[#193F9B] whitespace-nowrap shrink-0"
                        >
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Executive Newsletter & Consultation CTA */}
        <section className="py-16 bg-[#F5F7FB] border-t border-[#E5EAF1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#132238] text-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E9A23B] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Weekly Founder Briefing
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl leading-tight">
                  Get Field-Tested Strategy Insights Delivered Weekly
                </h2>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Join founders and operators receiving curated playbooks on scaling operations,
                  improving margins, and modern technology systems from IEH leadership.
                </p>
              </div>

              <div className="lg:col-span-5">
                {subscribed ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center gap-3 text-emerald-200 text-sm font-semibold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>You&apos;re subscribed! Watch your inbox for our next executive briefing.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your business email..."
                        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E9A23B]"
                      />
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2457D6] hover:bg-[#193F9B] text-white text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        Subscribe
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Zero spam. Unsubscribe anytime. Need 1-on-1 help?{" "}
                      <Link href="/consultation" className="text-[#E9A23B] underline hover:text-white">
                        Book a Consultation
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
