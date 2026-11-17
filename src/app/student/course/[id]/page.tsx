"use client";

import React, { useState, use } from "react";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Play,
  CheckCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
  Download,
  ChevronDown,
  ChevronUp,
  Lock,
  Crown,
} from "lucide-react";

export default function StudentCourseLearningPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    courses,
    enrolledCourseIds,
    membershipPackages,
    openMembershipCheckout,
    completedLessons,
    toggleLessonCompleted,
  } = useApp();

      const course = courses.find((c) => c.id === id);
      if(!course) {
        notFound();
      }

  // All lessons flat
  const allLessons = course.modules.flatMap((m) => m.lessons);
      const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
      const currentLesson = allLessons[currentLessonIndex] || allLessons[0];

      const courseCompletedLessons = completedLessons[course.id] || [];
      const isCurrentCompleted = currentLesson ? courseCompletedLessons.includes(currentLesson.id) : false;

      const progressPercent = Math.min(
        100,
        Math.round((courseCompletedLessons.length / (course.totalLessons || 1)) * 100)
      );

      const [expandedModuleId, setExpandedModuleId] = useState<string>(course.modules[0]?.id || "");

      const isUnlocked = enrolledCourseIds.includes(course.id);
      const requiredPkg =
        membershipPackages
          .filter((pkg) => pkg.unlockedCourseIds.includes(course.id))
          .sort((a, b) => a.tierOrder - b.tierOrder)[0] || null;

      if (!isUnlocked) {
        return (
          <DashboardLayout
            allowedRole="student"
            title={course.title}
            subtitle="This course requires a membership package upgrade to unlock."
          >
            <div className="max-w-xl mx-auto py-12">
              <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2457D6] flex items-center justify-center mx-auto">
                  <Lock className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                    <Crown className="w-3.5 h-3.5" />
                    {requiredPkg ? `Included in ${requiredPkg.name} Membership` : "Membership Required"}
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Course Locked
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Activate the{" "}
                    <strong className="text-[#172033]">
                      {requiredPkg ? `${requiredPkg.name} ($${requiredPkg.price})` : "eligible"}
                    </strong>{" "}
                    membership package to unlock <strong className="text-[#172033]">{course.title}</strong>{" "}
                    and all its video lessons immediately in your dashboard.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  {requiredPkg && (
                    <button
                      onClick={() => openMembershipCheckout(requiredPkg)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors cursor-pointer"
                    >
                      <Crown className="w-4 h-4 text-[#E9A23B]" />
                      <span>Unlock with {requiredPkg.name} (${requiredPkg.price})</span>
                    </button>
                  )}
                  <Link
                    href="/membership"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
                  >
                    Compare All 4 Packages
                  </Link>
                </div>
              </div>
            </div>
          </DashboardLayout>
        );
      }

      const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
          setCurrentLessonIndex((prev) => prev + 1);
        }
      };

      const handlePrev = () => {
        if (currentLessonIndex > 0) {
          setCurrentLessonIndex((prev) => prev - 1);
        }
      };

      return (
        <DashboardLayout
          allowedRole="student"
          title={course.title}
          subtitle={`Instructor: ${course.instructorName} • ${progressPercent}% Completed`}
        >
          <div className="space-y-6">
            {/* Navigation bar back to courses */}
            <div className="flex items-center justify-between">
              <Link
                href="/student/my-courses"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#2457D6]"
              >
                <ChevronLeft className="w-4 h-4" /> Back to My Courses
              </Link>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#64748B]">
                  Progress: <strong className="text-[#2457D6]">{courseCompletedLessons.length}</strong> / {course.totalLessons}
                </span>
                <div className="w-28 h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-[#2457D6] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Video Player & Curriculum Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Video Player & Lesson Details: Left 8 cols */}
              <div className="lg:col-span-8 space-y-6">
                {/* Video Player Placeholder */}
                <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 shadow-2xl flex flex-col items-center justify-center text-white border border-slate-800">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all hover:scale-105">
                    <Play className="w-8 h-8 ml-1 fill-white" />
                  </div>
                  <p className="text-xs font-semibold text-slate-300 mt-4 tracking-wide">
                    Streaming: {currentLesson?.title || "Lesson Video"}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">
                    Duration: {currentLesson?.duration || "15 min"} • HD 1080p
                  </span>
                </div>

                {/* Lesson Control Header */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                      Active Lesson
                    </span>
                    <h2 className="font-heading font-extrabold text-xl text-[#172033] mt-0.5">
                      {currentLesson?.title}
                    </h2>
                    <p className="text-xs text-[#64748B] mt-0.5">Duration: {currentLesson?.duration}</p>
                  </div>

                  {/* Mark Completed Button */}
                  {currentLesson && (
                    <button
                      onClick={() => toggleLessonCompleted(course.id, currentLesson.id)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-xs ${isCurrentCompleted
                          ? "bg-emerald-50 text-[#16A36A] border border-emerald-200"
                          : "bg-[#2457D6] text-white hover:bg-[#193F9B]"
                        }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      {isCurrentCompleted ? "Completed (Click to Undo)" : "Mark as Completed"}
                    </button>
                  )}
                </div>

                {/* Previous / Next Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={handlePrev}
                    disabled={currentLessonIndex === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous Lesson
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentLessonIndex === allLessons.length - 1}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] disabled:opacity-40"
                  >
                    Next Lesson <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Lesson Description & Resources */}
                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="font-heading font-bold text-base text-[#172033]">
                    Lesson Notes & Actionable Resources
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {currentLesson?.description ||
                      "Review the strategic frameworks presented in this lesson. Implement the action items outlined in the attached downloadable worksheets before progressing to subsequent modules."}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-bold text-[#172033] block">
                      Downloadable Attachments:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="#download"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                      >
                        <Download className="w-3.5 h-3.5" /> Lesson-Framework-Workbook.pdf
                      </a>
                      <a
                        href="#download"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                      >
                        <Download className="w-3.5 h-3.5" /> Financial-Model-Template.xlsx
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Curriculum Sidebar: Right 4 cols */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="p-4 bg-[#F5F7FB] border-b border-slate-200">
                  <h3 className="font-heading font-bold text-sm text-[#172033]">
                    Curriculum Syllabus
                  </h3>
                  <p className="text-[11px] text-[#64748B]">Click any lesson to stream</p>
                </div>

                <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                  {course.modules.map((module) => {
                    const isOpen = expandedModuleId === module.id;
                    return (
                      <div key={module.id} className="bg-white">
                        <button
                          onClick={() => setExpandedModuleId(isOpen ? "" : module.id)}
                          className="w-full p-3.5 bg-slate-50/70 hover:bg-slate-100 text-left flex items-center justify-between transition-colors"
                        >
                          <span className="font-heading font-bold text-xs text-[#172033] truncate pr-2">
                            {module.title}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="divide-y divide-slate-50 p-1">
                            {module.lessons.map((les) => {
                              const isCompleted = courseCompletedLessons.includes(les.id);
                              const isCurrent = currentLesson?.id === les.id;
                              const flatIdx = allLessons.findIndex((l) => l.id === les.id);

                              return (
                                <button
                                  key={les.id}
                                  onClick={() => setCurrentLessonIndex(flatIdx)}
                                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left transition-all ${isCurrent
                                      ? "bg-blue-50 text-[#193F9B] font-bold"
                                      : "text-slate-700 hover:bg-slate-50"
                                    }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0 pr-2">
                                    {isCompleted ? (
                                      <CheckCircle className="w-4 h-4 text-[#16A36A] shrink-0" />
                                    ) : (
                                      <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                                    )}
                                    <span className="text-xs truncate">{les.title}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                    {les.duration}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </DashboardLayout>
      );
    }
