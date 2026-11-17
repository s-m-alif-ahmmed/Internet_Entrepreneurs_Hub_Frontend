"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  BookOpen,
  Video,
  Briefcase,
  Star,
  Users,
  Compass,
  TrendingUp,
  ShieldCheck,
  Award,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const { services, courses, openCheckout } = useApp();

  const featuredServices = services.slice(0, 3);
  const featuredCourses = courses.slice(0, 4);

  // Testimonials state
  const testimonials = [
    {
      name: "Marcus Brody",
      role: "Founder, Brody Logistics",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content:
        "The digital business development consultation from IEH gave our company a concrete 12-month automation roadmap. Working directly with co-founder S M Alif Ahmmed helped us eliminate over $40,000 in redundant SaaS overhead.",
    },
    {
      name: "Sophia Chen",
      role: "Managing Director, Nova Studio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content:
        "IEH's Startup Foundations course and strategic advisory gave us the exact pricing frameworks needed to close our first three enterprise B2B retainers. The curriculum is world-class and practical.",
    },
    {
      name: "David Miller",
      role: "CEO, Zenith Commerce Ltd.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      content:
        "The operational guidance from Md. Roman Alom was pivotal during our European expansion. Having seasoned advisors challenge our assumptions saved us months of costly trial and error.",
    },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#F5F7FB] via-white to-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2457D6] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" /> Internet Entrepreneurs Hub
                </div>

                <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#172033] tracking-tight leading-[1.12]">
                  We Help People <br />
                  <span className="text-[#2457D6]">Turn their knowledge</span> <br />
                  Into CashFlow
                </h1>

                <p className="text-base sm:text-lg text-[#64748B] max-w-xl leading-relaxed">
                  Discover professional business consultancy and practical online education designed to help entrepreneurs, professionals, and businesses move forward with confidence.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/membership"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                  >
                    Join The Community <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#172033] border border-slate-200 font-bold text-sm hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                  >
                    Explore Our Services
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    "Professional Business Guidance",
                    "Practical Learning",
                    "Growth-Focused Solutions",
                  ].map((indicator) => (
                    <div key={indicator} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0" />
                      <span>{indicator}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Visual Container */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[4/3]">
                    <Image
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                      alt="Professional business consulting and entrepreneurship strategy session at IEH"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs uppercase tracking-widest text-[#E9A23B] font-bold">
                        Corporate Advisory & Academy
                      </p>
                      <h3 className="font-heading font-bold text-lg leading-snug">
                        Where strategy meets high-impact online education.
                      </h3>
                    </div>
                  </div>

                  {/* Floating Stat Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden sm:flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#2457D6]">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs text-[#64748B] font-medium">Consultancy Division</p>
                      <p className="text-sm font-extrabold text-[#172033]">Tailored Advisory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE SERVICES SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Our Divisions
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                Everything You Need to Grow
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-3">
                Whether you are starting a business or developing your professional skills, IEH provides the guidance and knowledge you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Business Consultancy */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2457D6] flex items-center justify-center group-hover:bg-[#2457D6] group-hover:text-white transition-colors">
                    <Briefcase className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#172033]">Business Consultancy</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Get professional guidance to develop your business, improve operations, and identify growth opportunities.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
                  >
                    Explore Consultancy <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 2: Professional Courses */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-[#E9A23B] flex items-center justify-center group-hover:bg-[#E9A23B] group-hover:text-white transition-colors">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#172033]">Professional Courses</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Learn practical business and professional skills through structured online courses designed for modern founders.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
                  >
                    Browse Courses <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Live Learning */}
              <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#16A36A] flex items-center justify-center group-hover:bg-[#16A36A] group-hover:text-white transition-colors">
                    <Video className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#172033]">Live Learning</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Join live educational sessions and interactive Q&A workshops through our supported streaming platforms.
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href="/live-classes"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
                  >
                    Explore Live Classes <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE IEH */}
        <section className="py-20 bg-[#F5F7FB] border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Value Proposition
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                Why Choose IEH?
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-2">
                A purpose-built ecosystem bridging strategic business counsel and practical vocational mastery.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Practical Business Guidance",
                  desc: "Clear, battle-tested operational frameworks that eliminate guesswork and prevent costly missteps.",
                  icon: Briefcase,
                },
                {
                  title: "Professional Learning Resources",
                  desc: "Comprehensive course modules, action workbooks, financial templates, and implementation guides.",
                  icon: BookOpen,
                },
                {
                  title: "Flexible Online Education",
                  desc: "Learn on your schedule with lifetime access, self-paced video lessons, and interactive assessments.",
                  icon: Compass,
                },
                {
                  title: "Accessible Consultation",
                  desc: "Connect directly with experienced business strategists through scheduled high-definition video sessions.",
                  icon: Users,
                },
                {
                  title: "Growth-Oriented Approach",
                  desc: "Focus on verifiable ROI, sustainable margins, repeatable acquisition channels, and long-term valuation.",
                  icon: TrendingUp,
                },
                {
                  title: "Dedicated Support",
                  desc: "Responsive support desk to ensure your questions, course progress, and consultation requests are prioritized.",
                  icon: ShieldCheck,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#172033] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED CONSULTING SERVICES */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                  Advisory Services
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                  Featured Consulting Services
                </h2>
              </div>
              <Link
                href="/services"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
              >
                View All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold text-[#2457D6] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {service.category}
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[#172033] pt-1">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                    {service.startingPrice && (
                      <p className="text-xs text-[#64748B] pt-2">
                        Starting from{" "}
                        <span className="font-bold text-sm text-[#172033]">
                          ${service.startingPrice}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-slate-700 hover:text-[#2457D6]"
                    >
                      Learn More
                    </Link>
                    <Link
                      href={`/consultation?service=${service.slug}`}
                      className="px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                    >
                      Book Consultation
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED COURSES */}
        <section className="py-20 bg-[#F5F7FB] border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                  IEH Academy
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                  Featured Courses
                </h2>
              </div>
              <Link
                href="/courses"
                className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-[#2457D6] hover:text-[#193F9B]"
              >
                View All Courses <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                      {course.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-1 text-[#E9A23B] text-xs font-bold mb-1">
                        <Star className="w-3.5 h-3.5 fill-[#E9A23B]" />
                        <span>{course.rating}</span>
                        <span className="text-[#64748B] font-normal">({course.reviewCount})</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#172033] line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1">Instructor: {course.instructorName}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="font-extrabold text-base text-[#172033]">
                          ${course.discountPrice || course.price}
                        </span>
                        {course.discountPrice && (
                          <span className="text-xs text-slate-400 line-through ml-1.5">
                            ${course.price}
                          </span>
                        )}
                      </div>
                      <Link
                        href={`/courses/${course.slug}`}
                        className="text-xs font-bold text-[#2457D6] hover:text-[#193F9B]"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white border border-slate-300 text-[#172033] font-bold text-sm hover:bg-slate-50 transition-colors shadow-xs"
              >
                Browse Full Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IEH WORKS */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Operational Framework
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                How IEH Works
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-2">
                A simple, transparent four-step journey to accelerate your business and career milestones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Explore",
                  desc: "Discover services, live classes, and structured educational masterclasses tailored to your goals.",
                },
                {
                  step: "02",
                  title: "Choose",
                  desc: "Select a high-impact consultation engagement or enroll in an on-demand course.",
                },
                {
                  step: "03",
                  title: "Participate",
                  desc: "Receive actionable corporate guidance or engage in lessons with downloadable resources.",
                },
                {
                  step: "04",
                  title: "Grow",
                  desc: "Apply your knowledge directly to your enterprise and systematically scale operations.",
                },
              ].map((item) => (
                <div key={item.step} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-3xl font-extrabold text-[#2457D6] mb-3">{item.step}</div>
                  <h3 className="font-heading font-bold text-lg text-[#172033] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE LEARNING SECTION */}
        <section className="py-20 bg-[#F5F7FB] border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
                  Broadcast Learning
                </span>
                <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                  Learn Beyond the Classroom
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  IEH offers interactive live learning experiences through Facebook Live and YouTube Live. Connect with senior strategists, participate in real-time teardowns, and ask questions directly.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#172033]">YouTube Live</p>
                      <p className="text-xs text-[#64748B]">HD streaming & chat</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#2457D6] flex items-center justify-center font-bold">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-[#172033]">Facebook Live</p>
                      <p className="text-xs text-[#64748B]">Community broadcasts</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/live-classes"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors"
                  >
                    Explore Upcoming Classes <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold text-rose-600 uppercase flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" /> Live Now
                    </span>
                    <span className="text-xs text-slate-400">Streaming on YouTube</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">
                    Startup Capital & Pitch Deck Tear Down
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Dr. Marcus Vance is currently reviewing student business decks and valuation strategies live.
                  </p>
                  <Link
                    href="/live-classes"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                  >
                    Join Current Session <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEADERSHIP SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Executive Team
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033] tracking-tight">
                Meet the Leadership
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] mt-2">
                Founded by experienced business operators dedicated to entrepreneurship education and corporate advisory.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Leader 1 */}
              <div className="bg-[#F5F7FB] p-8 rounded-3xl border border-slate-200/90 text-center space-y-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                    alt="Md. Roman Alom — Founder & CEO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                    Md. Roman Alom
                  </h3>
                  <p className="text-sm font-bold text-[#2457D6] mt-0.5">Founder & CEO</p>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Steering IEH’s overarching strategic vision, corporate advisory relationships, and global entrepreneurial partnerships.
                </p>
              </div>

              {/* Leader 2 */}
              <div className="bg-[#F5F7FB] p-8 rounded-3xl border border-slate-200/90 text-center space-y-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-white shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                    alt="S M Alif Ahmmed — Co-Founder & CTO"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                    S M Alif Ahmmed
                  </h3>
                  <p className="text-sm font-bold text-[#2457D6] mt-0.5">Co-Founder & CTO</p>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Directing technical architecture, online learning platforms, digital product innovations, and client technology advisory.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section className="py-20 bg-[#F5F7FB] border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
              Client Feedback
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#172033] tracking-tight mb-10">
              Trusted by Founders & Builders
            </h2>

            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md relative">
              <p className="text-base sm:text-lg text-slate-700 italic leading-relaxed mb-8">
                &ldquo;{testimonials[activeTestimonial].content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                  <Image
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="font-heading font-bold text-sm text-[#172033]">
                    {testimonials[activeTestimonial].name}
                  </h3>
                  <p className="text-xs text-[#64748B]">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="flex justify-center gap-2 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 bg-gradient-to-r from-[#193F9B] to-[#2457D6] text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight">
              Your Next Step Starts with IEH
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Whether you need professional business guidance or practical learning, we are here to help you navigate every stage of your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="/consultation"
                className="px-8 py-4 rounded-xl bg-white text-[#193F9B] font-bold text-sm shadow-xl hover:bg-slate-100 transition-colors"
              >
                Get Consultation
              </Link>
              <Link
                href="/courses"
                className="px-8 py-4 rounded-xl bg-blue-700/60 border border-blue-400/40 text-white font-bold text-sm hover:bg-blue-700 transition-colors"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
