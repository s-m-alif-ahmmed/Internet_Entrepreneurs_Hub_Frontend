"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import { Search, BookOpen, Play, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";

  export default function StudentMyCoursesPage() {
    const { courses, enrolledCourseIds, completedLessons } = useApp();
    const [search, setSearch] = useState("");

    const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

    const filtered = enrolledCourses.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <DashboardLayout
        allowedRole="student"
        title="My Enrolled Courses"
        subtitle="Access your active curriculum, lesson video players, and download learning assets."
      >
        <div className="space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your courses..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
              />
            </div>

            <Link
              href="/courses"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Explore More Courses
            </Link>
          </div>

          {/* List of enrolled courses */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-[#172033]">
                No courses found
              </h3>
              <p className="text-xs text-[#64748B]">
                You have not enrolled in any courses matching your search.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
              >
                Browse Academy Catalog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => {
                const completedCount = (completedLessons[course.id] || []).length;
                const total = course.totalLessons || 10;
                const percent = Math.min(100, Math.round((completedCount / total) * 100));

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="relative aspect-video w-full bg-slate-100">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                        {course.category}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-sm text-[#172033] line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1">Instructor: {course.instructorName}</p>

                        {/* Progress */}
                        <div className="mt-4 space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-600">Progress</span>
                            <span className="text-[#2457D6]">{percent}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2457D6] rounded-full"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <p className="text-[11px] text-[#64748B]">
                            {completedCount} of {total} lessons completed
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="text-xs font-semibold text-slate-600 hover:text-[#2457D6]"
                        >
                          Course Info
                        </Link>
                        <Link
                          href={`/student/course/${course.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" /> Continue
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }
