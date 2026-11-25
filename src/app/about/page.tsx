import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  Compass,
  CheckCircle,
  Briefcase,
  BookOpen,
  Video,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Internet Entrepreneurs Hub",
  description:
    "Learn about Internet Entrepreneurs Hub (IEH), our vision, core values, leadership team, and dual divisions: Business Consultancy and IEH Academy.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO */}
        <section className="py-16 sm:py-24 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              About Internet Entrepreneurs Hub
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight leading-tight">
              Empowering People and Businesses Through Knowledge and Guidance.
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed pt-2">
              At IEH, we combine high-level corporate business advisory with structured, practical online education, giving founders and organizations the tools to succeed.
            </p>
          </div>
        </section>

        {/* COMPANY INTRODUCTION & DIVISIONS */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="prose max-w-none text-slate-700 space-y-4 text-base leading-relaxed">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033] tracking-tight">
                Who We Are
              </h2>
              <p>
                <strong>Internet Entrepreneurs Hub (IEH)</strong> is a corporate business consulting and digital education firm created to serve ambitious entrepreneurs, growing startups, and established enterprises. We recognize that the speed of the digital economy requires both strategic foresight and tactical execution.
              </p>
              <p>
                To provide holistic support to our community, IEH operates under two specialized divisions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-8 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#2457D6] flex items-center justify-center font-bold">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#172033]">Division 1: Business Consultancy</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Direct advisory services for founders and executive teams. We assist with startup validation, legal structure roadmapping, digital business development, technology audits, operational efficiency, and commercial expansion.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-[#E9A23B] flex items-center justify-center font-bold">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-xl text-[#172033]">Division 2: IEH Academy</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Our professional online learning marketplace offering structured, on-demand masterclasses, interactive video lessons, verified completion certificates, and live broadcast sessions streamed on YouTube and Facebook.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-20 bg-[#F5F7FB] border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#172033]">Our Vision</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                To become the definitive international benchmark where business knowledge, ethical consulting, and practical entrepreneurial skills converge, enabling anyone with ambition to build sustainable, high-impact enterprises.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#172033]">Our Mission</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">
                To equip founders and professionals with unvarnished, battle-tested business frameworks, accessible expert mentorship, and premium educational resources that accelerate growth and minimize organizational risk.
              </p>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Guiding Principles
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-[#172033] tracking-tight">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Knowledge", desc: "Rigorous research, empirical frameworks, and continuous learning above dogma." },
                { title: "Integrity", desc: "Uncompromising ethics, transparent contracts, and total client confidentiality." },
                { title: "Innovation", desc: "Modern cloud workflows, digital tool adoption, and agile execution." },
                { title: "Growth", desc: "Unwavering commitment to measurable customer ROI and scalable business value." },
                { title: "Professionalism", desc: "Punctuality, clear deliverables, and executive communication at all times." },
                { title: "Customer Success", desc: "We win only when our students graduate and our advisory clients thrive." },
              ].map((v) => (
                <div key={v.title} className="p-6 rounded-2xl border border-slate-200 bg-[#F5F7FB]/50">
                  <h4 className="font-heading font-bold text-base text-[#172033] mb-2">{v.title}</h4>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-20 bg-[#F5F7FB] border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-2">
                Company Founders
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-[#172033] tracking-tight">
                Meet the Leadership
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-md">
                  <Image
                    src="/photo-2.jpeg"
                    alt="Md. Roman Alom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#172033]">Md. Roman Alom</h3>
                  <p className="text-sm font-bold text-[#2457D6]">Founder & CEO</p>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Leads overall company vision, consulting practices, investor relations, and strategic corporate governance.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center space-y-4 shadow-xs">
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-md">
                  <Image
                    src="/s_m_alif_ahmmed.png"
                    alt="S M Alif Ahmmed"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-[#172033]">S M Alif Ahmmed</h3>
                  <p className="text-sm font-bold text-[#2457D6]">Co-Founder & CTO</p>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                  Oversees engineering architecture, digital academy infrastructure, technology consulting, and learning systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-[#132238] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight">
              Let&apos;s Build Something Better Together
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Ready to explore strategic business consulting or enroll in our next academy cohort?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link
                href="/consultation"
                className="px-6 py-3.5 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold text-sm hover:bg-slate-700 transition-colors"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
