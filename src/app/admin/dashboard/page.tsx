"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  CalendarCheck,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { users, courses, services, consultations, orders, tickets } = useApp();

  const students = users.filter((u) => u.role === "student");
  const clients = users.filter((u) => u.role === "client");
  const totalRevenue = orders.reduce((acc, o) => acc + (o.paymentStatus === "Paid" ? o.finalAmount : 0), 0);
  const pendingConsultations = consultations.filter(
    (c) => c.status === "pending" || c.status === "under_review"
  ).length;

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Executive Administration Dashboard"
      subtitle="Comprehensive metrics, platform operations, and enterprise consulting oversight."
    >
      <div className="space-y-8">
        {/* 8 Analytics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Registered Users</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {users.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Students</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {students.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Clients</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {clients.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Academy Courses</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {courses.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Consulting Services</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {services.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Orders</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {orders.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Demo Platform Revenue</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                ${totalRevenue}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Pending Consultations</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {pendingConsultations}
              </h3>
            </div>
          </div>
        </div>

        {/* Visual Charts & Overview Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Breakdown */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-[#172033]">
                  Revenue & Enrollment Velocity
                </h3>
                <p className="text-xs text-[#64748B]">Monthly platform volume (Demo Data)</p>
              </div>
              <span className="text-xs font-bold text-[#16A36A] bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +24% YoY
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-4 space-y-3">
              {[
                { month: "January", revenue: "$2,450", percent: 65, enrollments: 48 },
                { month: "February", revenue: "$3,120", percent: 80, enrollments: 62 },
                { month: "March (Current)", revenue: "$4,290", percent: 95, enrollments: 89 },
              ].map((m) => (
                <div key={m.month} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span>{m.month}</span>
                    <span className="font-bold text-[#172033]">
                      {m.revenue} • {m.enrollments} Enrollments
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#2457D6] transition-all duration-500"
                      style={{ width: `${m.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading font-bold text-base text-[#172033]">
              Quick Admin Actions
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <Link
                href="/admin/courses/create"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2457D6] hover:bg-blue-50/50 transition-all font-bold text-[#172033] text-center"
              >
                + Create Course
              </Link>
              <Link
                href="/admin/consultations"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2457D6] hover:bg-blue-50/50 transition-all font-bold text-[#172033] text-center"
              >
                Review Consultations
              </Link>
              <Link
                href="/admin/live-classes"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2457D6] hover:bg-blue-50/50 transition-all font-bold text-[#172033] text-center"
              >
                Schedule Live Class
              </Link>
              <Link
                href="/admin/coupons"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-[#2457D6] hover:bg-blue-50/50 transition-all font-bold text-[#172033] text-center"
              >
                Manage Coupons
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Consultations Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-heading font-bold text-base text-[#172033]">
              Recent Consultation Requests
            </h3>
            <Link
              href="/admin/consultations"
              className="text-xs font-bold text-[#2457D6] hover:underline"
            >
              View All ({consultations.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Assigned Consultant</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {consultations.slice(0, 4).map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-4 font-mono font-bold text-[#2457D6]">
                      {c.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-[#172033]">{c.clientName}</td>
                    <td className="p-4">{c.serviceTitle}</td>
                    <td className="p-4 text-slate-500">{c.preferredDate}</td>
                    <td className="p-4 font-medium text-slate-800">
                      {c.assignedConsultant || "Unassigned"}
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-[#2457D6]">
                        {c.status.replace("_", " ")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
