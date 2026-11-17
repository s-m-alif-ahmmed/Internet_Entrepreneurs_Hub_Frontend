"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { ConsultationRequest } from "@/types";
import {
  CalendarCheck,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  X,
  User,
  Briefcase,
  Calendar,
  MessageSquare,
  Building,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminConsultationsPage() {
  const { consultations, updateConsultationStatus } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCon, setSelectedCon] = useState<ConsultationRequest | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const filtered = consultations.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(search.toLowerCase()) ||
      c.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
      c.serviceTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.referenceNumber.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in_progress":
        return "bg-blue-50 text-[#2457D6] border-blue-200";
      case "under_review":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "completed":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "pending":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const handleUpdateStatus = (id: string, newStatus: ConsultationRequest["status"]) => {
    updateConsultationStatus(id, newStatus, adminNotes);
    if (selectedCon) {
      setSelectedCon({ ...selectedCon, status: newStatus, adminNotes });
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Strategic Consultation Desk"
      subtitle="Examine corporate consultation requests, assign partners, update milestones, and document debriefs."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reference, client, or service..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] text-slate-700"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Consultations Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Reference & Service</th>
                  <th className="py-4 px-6">Client Details</th>
                  <th className="py-4 px-6">Requested Schedule</th>
                  <th className="py-4 px-6">Format</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No consultation bookings found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((con) => (
                    <tr key={con.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono text-xs font-bold text-[#2457D6] block">
                          {con.referenceNumber}
                        </span>
                        <p className="font-bold text-sm text-[#172033] mt-0.5 line-clamp-1">{con.serviceTitle}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-sm text-[#172033]">{con.clientName}</p>
                        <p className="text-xs text-slate-500">{con.businessName || con.clientEmail}</p>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{con.preferredDate} ({con.preferredTime})</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-xs text-[#172033]">
                        {con.consultationType}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadge(con.status)}`}>
                          {con.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => {
                            setSelectedCon(con);
                            setAdminNotes(con.adminNotes || "");
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2457D6] font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for consultation review & status change */}
        {selectedCon && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2457D6]">{selectedCon.referenceNumber}</span>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">{selectedCon.serviceTitle}</h3>
                </div>
                <button onClick={() => setSelectedCon(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#F5F7FB] p-3 rounded-xl space-y-1">
                  <p className="text-slate-500 font-medium">Client Name</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedCon.clientName}</p>
                  <p className="text-slate-600">{selectedCon.clientEmail}</p>
                </div>
                <div className="bg-[#F5F7FB] p-3 rounded-xl space-y-1">
                  <p className="text-slate-500 font-medium">Organization & Mode</p>
                  <p className="font-bold text-slate-800 text-sm">{selectedCon.businessName || "Direct Founder"}</p>
                  <p className="text-slate-600">Mode: {selectedCon.consultationType}</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Client Project Goals & Message</label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
                  {selectedCon.message}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Internal Advisory Notes</label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Record partner assignments, meeting links, or prep recommendations..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {(["under_review", "confirmed", "in_progress", "completed", "cancelled"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleUpdateStatus(selectedCon.id, st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                        selectedCon.status === st
                          ? "bg-[#2457D6] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st.replace("_", " ")}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCon(null)}
                  className="px-4 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
