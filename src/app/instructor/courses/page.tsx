"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import { BookOpen, Users, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function InstructorCoursesPage() {
  const { courses } = useApp();
  const instructorCourses = courses.filter((c) => c.instructorName.includes("Vance"));

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="My Assigned Masterclasses"
      subtitle="Overview of your course curricula, syllabus modules, and enrolled student bodies."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructorCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="relative aspect-video w-full bg-slate-100">
                <Image src={c.thumbnail} alt={c.title} fill className="object-cover" />
                <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2457D6] uppercase">
                  {c.category}
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-base text-[#172033]">{c.title}</h3>
                  <p className="text-xs text-[#64748B] line-clamp-2 mt-1">{c.shortDescription}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 pt-3 border-t border-slate-100 mt-3">
                    <span className="flex items-center gap-1 font-semibold">
                      <Users className="w-3.5 h-3.5 text-slate-400" /> {c.enrolledStudentsCount} Students
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#E9A23B]">
                      <Star className="w-3.5 h-3.5 fill-[#E9A23B]" /> {c.rating} ({c.reviewCount})
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-bold text-[#16A36A] bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase">
                    Published
                  </span>
                  <Link
                    href={`/courses/${c.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:underline"
                  >
                    View Public Page <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
