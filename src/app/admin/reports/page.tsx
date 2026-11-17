"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  DollarSign,
  Users,
  GraduationCap,
  Briefcase,
  CheckCircle,
  FileSpreadsheet,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminReportsPage() {
  const { users, courses, consultations, orders } = useApp();
  const [timeRange, setTimeRange] = useState<"30d" | "90d" | "1y">("30d");

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.finalAmount, 0);

  const completedConsultations = consultations.filter((c) => c.status === "completed").length;

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Metric,Value", `Total Revenue,${totalRevenue}`, `Total Users,${users.length}`, `Total Courses,${courses.length}`, `Completed Consultations,${completedConsultations}`].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ieh_executive_report_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Platform Executive Analytics & Reports"
      subtitle="Analyze gross earnings velocity, enrollment cohorts, consultation volume, and operational metrics."
    >
      <div className="space-y-8">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(["30d", "90d", "1y"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  timeRange === range
                    ? "bg-[#2457D6] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {range === "30d" ? "Past 30 Days" : range === "90d" ? "Past Quarter" : "Past Year"}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-4 h-4 text-[#2457D6]" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        {/* Executive Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Total Billed Gross</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#172033]">
              {formatCurrency(totalRevenue)}
            </h3>
            <p className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs previous window</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">User Growth Cohort</span>
              <Users className="w-4 h-4 text-[#2457D6]" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#172033]">
              {users.length} Registered
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              88% student / 12% enterprise clients
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Course Enrollments</span>
              <GraduationCap className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#172033]">
              {courses.reduce((acc, c) => acc + c.enrolledStudentsCount, 0).toLocaleString()}
            </h3>
            <p className="text-xs text-purple-600 font-medium">94.2% average lesson completion</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-[#64748B]">
              <span className="font-medium">Consultation Intake</span>
              <Briefcase className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-heading font-extrabold text-2xl text-[#172033]">
              {consultations.length} Requests
            </h3>
            <p className="text-xs text-amber-600 font-medium">
              {completedConsultations} sessions completed
            </p>
          </div>
        </div>

        {/* Visual Revenue and Growth Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-heading font-bold text-base text-[#172033]">
              Quarterly Revenue Velocity by Division
            </h4>
            <div className="space-y-4 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Division 1: Corporate Business Consultancy</span>
                  <span>{formatCurrency(totalRevenue * 0.62)} (62%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#2457D6] rounded-full" style={{ width: "62%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Division 2: IEH Academy Online Courses</span>
                  <span>{formatCurrency(totalRevenue * 0.38)} (38%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "38%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="font-heading font-bold text-base text-[#172033]">
              Consultation Status Distribution
            </h4>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                <p className="font-heading font-extrabold text-2xl text-emerald-700">
                  {consultations.filter((c) => c.status === "completed").length}
                </p>
                <p className="text-xs font-semibold text-emerald-800 mt-1">Completed Sessions</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-center">
                <p className="font-heading font-extrabold text-2xl text-[#2457D6]">
                  {consultations.filter((c) => c.status === "in_progress" || c.status === "confirmed").length}
                </p>
                <p className="text-xs font-semibold text-[#193F9B] mt-1">In-Flight Retainers</p>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
                <p className="font-heading font-extrabold text-2xl text-amber-700">
                  {consultations.filter((c) => c.status === "pending" || c.status === "under_review").length}
                </p>
                <p className="text-xs font-semibold text-amber-800 mt-1">Pending Intake Review</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center">
                <p className="font-heading font-extrabold text-2xl text-slate-700">
                  {consultations.length}
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-1">All Recorded Bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
