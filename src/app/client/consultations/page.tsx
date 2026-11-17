"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import { CalendarCheck, Plus, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function ClientConsultationsPage() {
  const { consultations, currentUser } = useApp();
  const [filterStatus, setFilterStatus] = useState("all");

  const clientConsultations = consultations.filter(
    (c) => c.clientEmail === currentUser?.email || c.clientName === currentUser?.name
  );

  const filtered = clientConsultations.filter((c) => {
    if (filterStatus === "all") return true;
    return c.status === filterStatus;
  });

  return (
    <DashboardLayout
      allowedRole="client"
      title="My Consultation Bookings"
      subtitle="Track your scheduled advisory meetings, consultant notes, and delivery reports."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Status filters */}
          <div className="flex flex-wrap gap-2 text-xs">
            {["all", "pending", "confirmed", "in_progress", "completed", "cancelled"].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-3 py-1.5 rounded-xl font-semibold capitalize transition-all ${filterStatus === st
                      ? "bg-[#2457D6] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                >
                  {st.replace("_", " ")}
                </button>
              )
            )}
          </div>

          <Link
            href="/consultation"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
          >
            <Plus className="w-4 h-4" /> Book New Session
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Reference</th>
                  <th className="p-4">Consulting Service</th>
                  <th className="p-4">Scheduled Date</th>
                  <th className="p-4">Format</th>
                  <th className="p-4">Consultant</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#2457D6]">
                      {item.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-[#172033]">{item.serviceTitle}</td>
                    <td className="p-4 text-slate-600">
                      {item.preferredDate} ({item.preferredTime})
                    </td>
                    <td className="p-4 text-slate-500">{item.consultationType}</td>
                    <td className="p-4 text-slate-800 font-medium">
                      {item.assignedConsultant || "Pending Assignment"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700"
                            : item.status === "completed"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-amber-50 text-amber-700"
                          }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/client/consultations/${item.id}`}
                        className="inline-flex items-center gap-1 font-bold text-[#2457D6] hover:underline"
                      >
                        Details <ArrowRight className="w-3 h-3" />
                      </Link>
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
