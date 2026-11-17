"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { useApp } from "@/lib/store";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Crown,
  Lock,
  ShieldCheck,
  Sparkles,
  Unlock,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
} from "lucide-react";

const MEMBERSHIP_FAQS = [
  {
    q: "How quickly are courses unlocked after purchasing a membership package?",
    a: "Instantly. As soon as your checkout completes, every course included in your chosen package is automatically unlocked in your Student Dashboard under My Courses.",
  },
  {
    q: "Can I upgrade from a lower package (e.g., Starter) to a higher package later?",
    a: "Yes. You can upgrade to Growth, Pro Business, or Executive All-Access at any time. All newly unlocked courses are immediately added to your dashboard while preserving your lesson progress and certificates.",
  },
  {
    q: "What is the difference between the 4 membership packages?",
    a: "Starter unlocks 2 foundational courses, Growth unlocks 3 courses plus live Q&A classes, Pro Business unlocks 5 courses including E-Commerce and Executive Management, and Executive All-Access unlocks all 6 courses including Business Technology Architecture (Cloud, Security & AI).",
  },
  {
    q: "Can I use promo codes during membership checkout?",
    a: "Yes! During checkout you can apply active promotional codes such as GROWTH20 (20% off) or STARTUP50 ($50 off) before confirming your membership.",
  },
];

export default function MembershipPage() {
  const {
    membershipPackages,
    activeMembershipId,
    courses,
    enrolledCourseIds,
    openMembershipCheckout,
  } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activePackage = membershipPackages.find((p) => p.id === activeMembershipId) || null;

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
                <Crown className="w-3.5 h-3.5 text-[#E9A23B]" />
                <span>4 Structured Membership Packages</span>
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight leading-tight">
                Choose Your Membership &amp;{" "}
                <span className="text-[#2457D6]">Unlock Your Courses</span>
              </h1>

              <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                Select one of our four tailored IEH Membership tiers. The moment you activate a
                package, its included courses unlock automatically inside your dashboard so you can
                start learning immediately.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-[#E9A23B]" /> Instant Dashboard Unlock
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#16A36A]" /> 14-Day Satisfaction Guarantee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#2457D6]" /> Verified Certificates Included
                </span>
              </div>
            </div>

            {/* Active Membership Status Banner */}
            {activePackage && (
              <div className="mt-10 max-w-4xl mx-auto p-5 sm:p-6 rounded-2xl bg-white border-2 border-[#2457D6] shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
                    <Crown className="w-6 h-6 text-[#E9A23B]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                        Active Membership
                      </span>
                      <span className="text-xs font-semibold text-[#64748B]">
                        {enrolledCourseIds.length} of {courses.length} Courses Unlocked
                      </span>
                    </div>
                    <h2 className="font-heading font-extrabold text-lg text-[#172033] mt-0.5">
                      {activePackage.name} Package
                    </h2>
                  </div>
                </div>

                <Link
                  href="/student/my-courses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Go to Unlocked Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* 4 Membership Package Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
              {membershipPackages.map((pkg) => {
                const isCurrent = activeMembershipId === pkg.id;
                const isLowerThanActive =
                  activePackage !== null && pkg.tierOrder < activePackage.tierOrder;
                const isUpgrade =
                  activePackage !== null && pkg.tierOrder > activePackage.tierOrder;
                const includedCourses = courses.filter((c) =>
                  pkg.unlockedCourseIds.includes(c.id)
                );
                const savings = pkg.originalPrice ? pkg.originalPrice - pkg.price : 0;

                return (
                  <div
                    key={pkg.id}
                    className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 ${
                      pkg.popular
                        ? "bg-white border-2 border-[#2457D6] shadow-xl shadow-blue-500/10"
                        : pkg.bestValue
                          ? "bg-[#132238] text-white border-2 border-[#E9A23B] shadow-xl"
                          : "bg-white border border-[#E5EAF1] shadow-xs hover:shadow-lg hover:border-blue-200"
                    }`}
                  >
                    {/* Top Badge */}
                    {pkg.badge && (
                      <div className="mb-4 flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            pkg.popular
                              ? "bg-[#2457D6] text-white"
                              : pkg.bestValue
                                ? "bg-[#E9A23B] text-[#132238]"
                                : "bg-[#F5F7FB] text-[#2457D6] border border-slate-200"
                          }`}
                        >
                          {pkg.popular || pkg.bestValue ? (
                            <Sparkles className="w-3 h-3" />
                          ) : null}
                          {pkg.badge}
                        </span>
                        {savings > 0 && (
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              pkg.bestValue
                                ? "bg-emerald-500/20 text-emerald-300"
                                : "bg-emerald-50 text-[#16A36A]"
                            }`}
                          >
                            Save ${savings}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="space-y-5 flex-1">
                      {/* Title & Tagline */}
                      <div>
                        <h2
                          className={`font-heading font-extrabold text-2xl ${
                            pkg.bestValue ? "text-white" : "text-[#172033]"
                          }`}
                        >
                          {pkg.name}
                        </h2>
                        <p
                          className={`text-xs mt-1.5 leading-relaxed ${
                            pkg.bestValue ? "text-slate-300" : "text-[#64748B]"
                          }`}
                        >
                          {pkg.tagline}
                        </p>
                      </div>

                      {/* Price */}
                      <div
                        className={`pb-5 border-b ${
                          pkg.bestValue ? "border-slate-700" : "border-slate-100"
                        }`}
                      >
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`font-heading font-extrabold text-4xl ${
                              pkg.bestValue ? "text-white" : "text-[#172033]"
                            }`}
                          >
                            ${pkg.price}
                          </span>
                          {pkg.originalPrice && (
                            <span
                              className={`text-sm line-through ${
                                pkg.bestValue ? "text-slate-400" : "text-slate-400"
                              }`}
                            >
                              ${pkg.originalPrice}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-[11px] font-medium mt-1 ${
                            pkg.bestValue ? "text-slate-400" : "text-[#64748B]"
                          }`}
                        >
                          {pkg.billingCycle}
                        </p>
                      </div>

                      {/* Unlocked Courses Box */}
                      <div
                        className={`p-3.5 rounded-2xl space-y-2.5 ${
                          pkg.bestValue
                            ? "bg-white/10 border border-white/15"
                            : "bg-[#F5F7FB] border border-[#E5EAF1]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-extrabold">
                          <span
                            className={`inline-flex items-center gap-1.5 ${
                              pkg.bestValue ? "text-[#E9A23B]" : "text-[#2457D6]"
                            }`}
                          >
                            <Unlock className="w-3.5 h-3.5" />
                            Unlocks {includedCourses.length} of {courses.length} Courses
                          </span>
                        </div>
                        <ul className="space-y-1.5">
                          {includedCourses.map((course) => (
                            <li
                              key={course.id}
                              className="flex items-start gap-2 text-[11px] leading-snug"
                            >
                              <BookOpen
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  pkg.bestValue ? "text-[#E9A23B]" : "text-[#2457D6]"
                                }`}
                              />
                              <Link
                                href={`/courses/${course.slug}`}
                                className={`hover:underline line-clamp-1 ${
                                  pkg.bestValue ? "text-slate-200" : "text-slate-700 font-medium"
                                }`}
                              >
                                {course.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Membership Perks */}
                      <ul className="space-y-2.5">
                        {pkg.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className={`flex items-start gap-2.5 text-xs leading-relaxed ${
                              pkg.bestValue ? "text-slate-200" : "text-slate-600"
                            }`}
                          >
                            <Check
                              className={`w-4 h-4 shrink-0 mt-0.5 ${
                                pkg.bestValue ? "text-[#E9A23B]" : "text-[#16A36A]"
                              }`}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <div className="pt-6 mt-6 border-t border-slate-200/20">
                      {isCurrent ? (
                        <Link
                          href="/student/my-courses"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#16A36A] text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Active Plan — Open Courses</span>
                        </Link>
                      ) : isLowerThanActive ? (
                        <div
                          className={`w-full text-center py-3 px-4 rounded-xl text-xs font-bold border ${
                            pkg.bestValue
                              ? "border-slate-600 text-slate-400"
                              : "bg-slate-50 border-slate-200 text-slate-500"
                          }`}
                        >
                          Included in Your {activePackage?.name} Plan
                        </div>
                      ) : (
                        <button
                          onClick={() => openMembershipCheckout(pkg)}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            pkg.bestValue
                              ? "bg-[#E9A23B] text-[#132238] hover:bg-amber-400 shadow-lg"
                              : pkg.popular
                                ? "bg-[#2457D6] text-white hover:bg-[#193F9B] shadow-md shadow-blue-500/20"
                                : "bg-[#132238] text-white hover:bg-[#2457D6]"
                          }`}
                        >
                          <span>
                            {isUpgrade ? `Upgrade to ${pkg.name}` : `Get ${pkg.name} Package`}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Course Unlock Comparison Matrix */}
        <section className="py-16 bg-[#F5F7FB] border-y border-[#E5EAF1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2457D6]">
                Transparent Curriculum Access
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033]">
                Which Courses Unlock in Each Package?
              </h2>
              <p className="text-sm text-[#64748B]">
                Compare exact course access across all four IEH Membership tiers before enrolling.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5EAF1] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F5F7FB] border-b border-[#E5EAF1] text-xs font-extrabold text-[#172033]">
                      <th className="py-5 px-6 min-w-[260px]">Academy Course</th>
                      {membershipPackages.map((pkg) => (
                        <th key={pkg.id} className="py-5 px-4 text-center min-w-[130px]">
                          <div className="font-heading font-extrabold text-sm text-[#172033]">
                            {pkg.name}
                          </div>
                          <div className="text-xs font-bold text-[#2457D6] mt-0.5">
                            ${pkg.price}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {courses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6">
                          <Link
                            href={`/courses/${course.slug}`}
                            className="font-bold text-sm text-[#172033] hover:text-[#2457D6] transition-colors block"
                          >
                            {course.title}
                          </Link>
                          <span className="text-xs text-[#64748B]">
                            {course.category} • {course.totalLessons} lessons • {course.duration}
                          </span>
                        </td>
                        {membershipPackages.map((pkg) => {
                          const unlocked = pkg.unlockedCourseIds.includes(course.id);
                          return (
                            <td key={pkg.id} className="py-4 px-4 text-center">
                              {unlocked ? (
                                <span
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-50 text-[#16A36A] border border-emerald-200"
                                  title={`Unlocked in ${pkg.name}`}
                                >
                                  <Check className="w-4 h-4 stroke-[2.5]" />
                                </span>
                              ) : (
                                <span
                                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-400"
                                  title={`Locked in ${pkg.name}`}
                                >
                                  <Lock className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Membership FAQ */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2457D6]">
                Common Questions
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033]">
                Membership Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {MEMBERSHIP_FAQS.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E5EAF1] bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="font-heading font-bold text-sm sm:text-base text-[#172033]">
                        {item.q}
                      </span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#2457D6] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm text-[#64748B] leading-relaxed border-t border-slate-100 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
