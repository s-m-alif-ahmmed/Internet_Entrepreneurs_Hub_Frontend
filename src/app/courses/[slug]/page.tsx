"use client";

import React, { useState, use } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Star,
  Clock,
  BookOpen,
  CheckCircle2,
  Users,
  ChevronDown,
  ChevronUp,
  Play,
  ShieldCheck,
  Award,
  ChevronRight,
  HelpCircle,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { courses, openCheckout, enrolledCourseIds } = useApp();

  const course = courses.find((c) => c.slug === slug);
  if (!course) {
    notFound();
  }

  const isEnrolled = enrolledCourseIds.includes(course.id);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [course.modules[0]?.id || ""]: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const relatedCourses = courses
    .filter((c) => c.id !== course.id && c.category === course.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="bg-[#132238] text-white py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/courses" className="hover:text-white">Courses</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white font-medium truncate max-w-xs">{course.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Info */}
              <div className="lg:col-span-8 space-y-5">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-[#60A5FA] border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>

                <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
                  {course.title}
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {course.shortDescription}
                </p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 pt-2">
                  <div className="flex items-center gap-1.5 text-[#E9A23B] font-bold">
                    <Star className="w-4 h-4 fill-[#E9A23B]" />
                    <span className="text-white">{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviewCount} student reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{course.enrolledStudentsCount.toLocaleString()} students enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-700">
                    <Image
                      src={course.instructorAvatar}
                      alt={course.instructorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Course Instructor</span>
                    <p className="text-sm font-bold text-white">{course.instructorName}</p>
                  </div>
                </div>
              </div>

              {/* Right Sticky Card */}
              <div className="lg:col-span-4">
                <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-6">
                  {/* Thumbnail / Preview */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-100 bg-slate-100">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-[#2457D6] flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 ml-0.5 fill-[#2457D6]" />
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-[#172033]">
                        ${course.discountPrice || course.price}
                      </span>
                      {course.discountPrice && (
                        <span className="text-base text-slate-400 line-through">
                          ${course.price}
                        </span>
                      )}
                      {course.discountPrice && (
                        <span className="text-xs font-bold text-[#16A36A] bg-emerald-50 px-2 py-0.5 rounded-full">
                          Save ${course.price - course.discountPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] mt-1">One-time payment • Lifetime access</p>
                  </div>

                  {/* CTA Button */}
                  {isEnrolled ? (
                    <Link
                      href={`/student/course/${course.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      <Check className="w-4 h-4" /> Go to Learning Classroom
                    </Link>
                  ) : (
                    <button
                      onClick={() => openCheckout(course)}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-lg shadow-blue-500/20"
                    >
                      Enroll in Masterclass
                    </button>
                  )}

                  <div className="space-y-2.5 text-xs text-[#64748B] border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                      <span>{course.totalLessons} on-demand HD video lessons</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#16A36A]" />
                      <span>Actionable spreadsheets & workbook templates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#16A36A]" />
                      <span>Verified completion certificate included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#16A36A]" />
                      <span>14-day conditional money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                {/* What You Will Learn */}
                <div className="p-8 rounded-3xl bg-[#F5F7FB] border border-slate-200/80 space-y-4">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    What You Will Learn
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.whatYouWillLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Curriculum */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                      Course Curriculum
                    </h2>
                    <span className="text-xs font-semibold text-[#64748B]">
                      {course.modules.length} Modules • {course.totalLessons} Lessons
                    </span>
                  </div>

                  <div className="space-y-3">
                    {course.modules.map((module) => {
                      const isOpen = !!expandedModules[module.id];
                      return (
                        <div
                          key={module.id}
                          className="border border-slate-200 rounded-2xl overflow-hidden bg-white"
                        >
                          <button
                            onClick={() => toggleModule(module.id)}
                            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 text-left transition-colors"
                          >
                            <span className="font-heading font-bold text-sm text-[#172033]">
                              {module.title}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-[#64748B]">
                                {module.lessons.length} lessons
                              </span>
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="divide-y divide-slate-100 p-2">
                              {module.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between px-3 py-2.5 text-xs text-slate-700 hover:bg-slate-50 rounded-lg"
                                >
                                  <div className="flex items-center gap-2.5">
                                    <Play className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{lesson.title}</span>
                                    {lesson.isPreview && (
                                      <span className="text-[10px] font-bold text-[#2457D6] bg-blue-50 px-2 py-0.5 rounded">
                                        Preview
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-slate-400 font-mono text-[11px]">
                                    {lesson.duration}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Requirements & Target Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-lg text-[#172033]">
                      Prerequisites & Requirements
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                      {course.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-lg text-[#172033]">
                      Who Should Enroll
                    </h3>
                    <ul className="space-y-2 text-xs sm:text-sm text-[#64748B]">
                      {course.targetAudience.map((aud, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2457D6] mt-1.5 shrink-0" />
                          <span>{aud}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Instructor Profile */}
                <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
                  <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
                    Meet Your Instructor
                  </span>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shrink-0">
                      <Image
                        src={course.instructorAvatar}
                        alt={course.instructorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                        {course.instructorName}
                      </h3>
                      <p className="text-xs font-semibold text-[#2457D6]">{course.instructorTitle}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    Seasoned educator and corporate advisor with extensive experience guiding founders from venture creation to scaled commercial execution.
                  </p>
                </div>

                {/* Reviews */}
                {course.reviews.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                      Student Reviews
                    </h2>
                    <div className="space-y-3">
                      {course.reviews.map((rev) => (
                        <div key={rev.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                                <Image
                                  src={rev.studentAvatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"}
                                  alt={rev.studentName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-bold text-xs text-[#172033]">{rev.studentName}</span>
                            </div>
                            <div className="flex text-[#E9A23B]">
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-[#E9A23B]" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-700 italic">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
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
