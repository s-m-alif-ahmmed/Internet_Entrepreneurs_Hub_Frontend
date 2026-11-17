"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Video,
  Star,
  Plus,
  ArrowRight,
} from "lucide-react";

export default function InstructorDashboardPage() {
  const { courses, liveClasses, currentUser } = useApp();

  const instructorCourses = courses.filter(
    (c) => c.instructorName.includes("Vance") || c.instructorId === currentUser?.id
  );

  const totalStudents = instructorCourses.reduce((acc, c) => acc + c.enrolledStudentsCount, 0);
  const instructorClasses = liveClasses.filter((l) => l.instructorName.includes("Vance"));

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="Instructor Faculty Dashboard"
      subtitle="Manage your curriculum syllabus, broadcast live workshops, and monitor student enrollments."
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Assigned Courses</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {instructorCourses.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Students</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {totalStudents.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center shrink-0">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Live Broadcasts</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {instructorClasses.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Average Rating</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                4.9 / 5.0
              </h3>
            </div>
          </div>
        </div>

        {/* Assigned Courses Table */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-base text-[#172033]">
              Your Assigned Masterclasses
            </h2>
            <Link
              href="/instructor/courses"
              className="text-xs font-bold text-[#2457D6] hover:underline"
            >
              Manage Curriculum →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {instructorCourses.map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#172033]">{c.title}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    {c.totalLessons} lessons • {c.duration} • {c.category}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs text-[#172033]">
                    {c.enrolledStudentsCount} Students
                  </span>
                  <span className="block text-[11px] text-[#16A36A] font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
