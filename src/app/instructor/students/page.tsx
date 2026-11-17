"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Users, Mail, BookOpen } from "lucide-react";

export default function InstructorStudentsPage() {
  const { users } = useApp();
  const students = users.filter((u) => u.role === "student");

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="Enrolled Students"
      subtitle="Directory of students actively enrolled across your masterclasses."
    >
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Email</th>
                <th className="p-4">Active Course</th>
                <th className="p-4">Enrolled Since</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {students.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-[#172033]">{st.name}</td>
                  <td className="p-4 text-slate-500">{st.email}</td>
                  <td className="p-4 font-semibold text-[#2457D6]">
                    Complete Startup Foundations: From Idea to Scale
                  </td>
                  <td className="p-4 text-slate-500">{st.createdAt}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A36A] font-bold text-[10px] uppercase">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
