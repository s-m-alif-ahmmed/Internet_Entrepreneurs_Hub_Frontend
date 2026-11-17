"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  BookOpen,
  Award,
  Video,
  Play,
  CheckCircle2,
  Sparkles,
  Crown,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function StudentDashboardPage() {
  const {
    courses,
    enrolledCourseIds,
    completedLessons,
    liveClasses,
    announcements,
    membershipPackages,
    activeMembershipId,
  } = useApp();

  const activePackage = membershipPackages.find((p) => p.id === activeMembershipId) || null;

  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const upcomingClasses = liveClasses.filter((c) => c.status === "Scheduled" || c.status === "Live").slice(0, 2);

  // Compute progress for each enrolled course
  const courseProgress = enrolledCourses.map((c) => {
    const completed = (completedLessons[c.id] || []).length;
    const total = c.totalLessons || 10;
    const percent = Math.min(100, Math.round((completed / total) * 100));
    return { course: c, completed, total, percent };
  });

  const completedCount = courseProgress.filter((p) => p.percent === 100).length;

  return (
    <DashboardLayout
      allowedRole="student"
      title="Student Learning Overview"
      subtitle="Track your enrolled courses, lesson milestones, and upcoming live broadcasts."
    >
      <div className="space-y-8">
        {/* Membership Status Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#132238] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-[#E9A23B] flex items-center justify-center shrink-0">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#2457D6] text-white text-[10px] font-bold uppercase tracking-wider">
                  {activePackage ? `${activePackage.name} Package` : "Standard Access"}
                </span>
                <span className="text-xs text-slate-300 font-medium">
                  {enrolledCourses.length} of {courses.length} Courses Unlocked
                </span>
              </div>
              <h2 className="font-heading font-bold text-base sm:text-lg text-white mt-1">
                {activePackage
                  ? `Your ${activePackage.name} Membership is active`
                  : "Unlock more Academy courses with a Membership Package"}
              </h2>
            </div>
          </div>

          <Link
            href="/membership"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#E9A23B] text-[#132238] text-xs font-extrabold hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{activePackage ? "Manage / Upgrade Plan" : "Explore 4 Packages"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Enrolled Courses</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {enrolledCourses.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Completed Courses</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {completedCount}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Upcoming Live Classes</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {upcomingClasses.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Certificates Earned</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                1
              </h3>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-[#172033]">
              Continue Learning
            </h2>
            <Link
              href="/student/my-courses"
              className="text-xs font-bold text-[#2457D6] hover:underline"
            >
              View All Enrolled Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseProgress.map(({ course, percent, completed, total }) => (
              <div
                key={course.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-[#172033] truncate">
                      {course.title}
                    </h4>
                    <p className="text-xs text-[#64748B] mt-0.5">Instructor: {course.instructorName}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#172033]">
                    <span>Course Progress</span>
                    <span className="text-[#2457D6]">{percent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#2457D6] rounded-full transition-all duration-300"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    {completed} of {total} lessons completed
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <Link
                    href={`/student/course/${course.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Continue Classroom
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Broadcast Schedule & Announcements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Live Broadcasts */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-[#172033] flex items-center gap-2">
                <Video className="w-4 h-4 text-[#2457D6]" /> Upcoming Live Classes
              </h3>
              <Link href="/student/live-classes" className="text-xs font-semibold text-[#2457D6]">
                All Classes
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingClasses.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-[#F5F7FB] border border-slate-200/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-[#172033] truncate">{item.title}</h4>
                    <p className="text-[11px] text-[#64748B] mt-0.5">
                      {item.date} • {item.startTime} ({item.platform})
                    </p>
                  </div>
                  <a
                    href={item.streamingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#2457D6] text-white text-[11px] font-bold shrink-0 hover:bg-[#193F9B]"
                  >
                    Join
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Announcements */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-heading font-bold text-base text-[#172033] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E9A23B]" /> Academy Announcements
              </h3>
              <Link href="/student/notifications" className="text-xs font-semibold text-[#2457D6]">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 2).map((a) => (
                <div key={a.id} className="p-4 rounded-xl bg-[#F5F7FB] border border-slate-200/80 space-y-1">
                  <h4 className="font-bold text-xs text-[#172033]">{a.title}</h4>
                  <p className="text-xs text-[#64748B] line-clamp-2">{a.description}</p>
                  <span className="text-[10px] text-slate-400 block pt-1">{a.publishedAt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
