"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Search,
  BookOpen,
  Play,
  Crown,
  Lock,
  Unlock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function StudentMyCoursesPage() {
  const {
    courses,
    enrolledCourseIds,
    completedLessons,
    membershipPackages,
    activeMembershipId,
    openMembershipCheckout,
  } = useApp();
  const [search, setSearch] = useState("");

  const activePackage = membershipPackages.find((p) => p.id === activeMembershipId) || null;

  const unlockedCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const lockedCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id));

  const filteredUnlocked = unlockedCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredLocked = lockedCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase())
  );

  const getLowestUnlockingPackage = (courseId: string) => {
    return (
      membershipPackages
        .filter((pkg) => pkg.unlockedCourseIds.includes(courseId))
        .sort((a, b) => a.tierOrder - b.tierOrder)[0] || null
    );
  };

  return (
    <DashboardLayout
      allowedRole="student"
      title="My Courses & Membership Access"
      subtitle="Access courses unlocked by your active membership package, track progress, or upgrade to unlock additional programs."
    >
      <div className="space-y-8">
        {/* Active Membership Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6 text-[#E9A23B]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2457D6]">
                  {activePackage ? `${activePackage.name} Membership Active` : "No Membership Package Active"}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                  {unlockedCourses.length} of {courses.length} Courses Unlocked
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                {activePackage
                  ? activePackage.tierOrder === 4
                    ? "You have full Executive All-Access to every course in IEH Academy."
                    : "Upgrade your membership package anytime to immediately unlock the remaining locked courses below."
                  : "Purchase one of our 4 membership packages to automatically unlock curated Academy courses in your dashboard."}
              </p>
            </div>
          </div>

          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9A23B]" />
            <span>{activePackage ? "Upgrade Membership" : "View 4 Membership Plans"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search unlocked or locked courses..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
            />
          </div>

          <Link
            href="/membership"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            Compare All 4 Packages
          </Link>
        </div>

        {/* Unlocked Courses Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Unlock className="w-4 h-4 text-[#16A36A]" />
            <h2 className="font-heading font-bold text-base text-[#172033]">
              Unlocked Courses ({filteredUnlocked.length})
            </h2>
          </div>

          {filteredUnlocked.length === 0 ? (
            <div className="text-center py-14 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-[#172033]">
                No unlocked courses match your search
              </h3>
              <p className="text-xs text-[#64748B]">
                Choose a membership package to unlock courses automatically in your dashboard.
              </p>
              <Link
                href="/membership"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
              >
                Explore Membership Packages
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnlocked.map((course) => {
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
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                        {course.category}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Unlocked
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-sm text-[#172033] line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1">
                          Instructor: {course.instructorName}
                        </p>

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

        {/* Locked Courses Section (Upgrade to Unlock) */}
        {filteredLocked.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-500" />
                <h2 className="font-heading font-bold text-base text-[#172033]">
                  Locked Courses — Upgrade Membership to Unlock ({filteredLocked.length})
                </h2>
              </div>
              <Link
                href="/membership"
                className="text-xs font-bold text-[#2457D6] hover:underline"
              >
                View Membership Packages →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocked.map((course) => {
                const requiredPkg = getLowestUnlockingPackage(course.id);

                return (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between opacity-95"
                  >
                    <div className="relative aspect-video w-full bg-slate-100">
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover grayscale-[40%]"
                      />
                      <div className="absolute inset-0 bg-slate-900/35 flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 text-[#172033] text-xs font-bold shadow-sm">
                          <Lock className="w-3.5 h-3.5 text-[#2457D6]" />
                          {requiredPkg ? `Unlocks in ${requiredPkg.name}` : "Membership Required"}
                        </span>
                      </div>
                      <div className="absolute top-2.5 left-2.5 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        {course.category}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-heading font-bold text-sm text-[#172033] line-clamp-2">
                          {course.title}
                        </h3>
                        <p className="text-xs text-[#64748B] mt-1">
                          Instructor: {course.instructorName}
                        </p>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                          {course.shortDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={`/courses/${course.slug}`}
                          className="text-xs font-semibold text-slate-500 hover:text-[#2457D6]"
                        >
                          Preview
                        </Link>
                        {requiredPkg ? (
                          <button
                            onClick={() => openMembershipCheckout(requiredPkg)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#132238] text-white text-xs font-bold hover:bg-[#2457D6] transition-colors cursor-pointer"
                          >
                            <Crown className="w-3.5 h-3.5 text-[#E9A23B]" />
                            <span>Unlock ({requiredPkg.name} — ${requiredPkg.price})</span>
                          </button>
                        ) : (
                          <Link
                            href="/membership"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#132238] text-white text-xs font-bold hover:bg-[#2457D6] transition-colors"
                          >
                            Unlock Plan
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
