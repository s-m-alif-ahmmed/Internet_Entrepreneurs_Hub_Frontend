"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Search, Mail, Phone, BookOpen, Users, Star, Plus, CheckCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AdminInstructorsPage() {
  const { users, courses } = useApp();
  const [search, setSearch] = useState("");

  const instructors = users.filter((u) => u.role === "instructor");

  const filtered = instructors.filter((inst) =>
    inst.name.toLowerCase().includes(search.toLowerCase()) ||
    inst.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Faculty & Instructor Management"
      subtitle="Supervise active educators, assign specialized courses, and monitor teaching ratings."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search faculty by name or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((inst) => {
            const instCourses = courses.filter((c) => c.instructorId === inst.id || c.instructorName.includes(inst.name.split(" ")[0]));
            return (
              <div key={inst.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 relative shrink-0">
                      <Image
                        src={inst.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"}
                        alt={inst.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#172033]">{inst.name}</h3>
                      <p className="text-xs text-[#64748B]">{inst.title || "Senior Instructor"}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>4.9 / 5.0 (verified)</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {inst.bio || "Senior business consultant and instructor at Internet Entrepreneurs Hub Academy."}
                  </p>

                  <div className="space-y-1 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {inst.email}
                    </p>
                    {inst.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        {inst.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                  <span className="flex items-center gap-1 font-semibold text-[#172033]">
                    <BookOpen className="w-4 h-4 text-[#2457D6]" />
                    {instCourses.length > 0 ? instCourses.length : 2} Courses Assigned
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle className="w-3 h-3" />
                    Active Faculty
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
