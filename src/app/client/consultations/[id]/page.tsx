"use client";

import React, { use } from "react";
import { notFound } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  CalendarCheck,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Building,
  CheckCircle2,
  FileText,
  HelpCircle,
} from "lucide-react";

export default function ClientConsultationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { consultations } = useApp();

    const consultation = consultations.find((c) => c.id === id);
    if (!consultation) {
      notFound();
    }

    return (
      <DashboardLayout
        allowedRole="client"
        title={`Consultation #${consultation.referenceNumber}`}
        subtitle="Detailed record of your advisory session request and consultant notes."
      >
        <div className="space-y-6 max-w-4xl">
          <Link
            href="/client/consultations"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#2457D6]"
          >
            <ChevronLeft className="w-4 h-4" /> Back to My Consultations
          </Link>

          {/* Status Header */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#2457D6]">
                {consultation.referenceNumber}
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {consultation.serviceTitle}
              </h2>
              <p className="text-xs text-[#64748B]">Category: {consultation.category}</p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${consultation.status === "confirmed"
                    ? "bg-emerald-100 text-emerald-800"
                    : consultation.status === "completed"
                      ? "bg-slate-100 text-slate-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
              >
                {consultation.status.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-heading font-bold text-sm text-[#172033] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2457D6]" /> Session Logistics
              </h3>
              <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <p>
                  <strong>Scheduled Date:</strong> {consultation.preferredDate}
                </p>
                <p>
                  <strong>Time Window:</strong> {consultation.preferredTime}
                </p>
                <p>
                  <strong>Session Format:</strong> {consultation.consultationType}
                </p>
                <p>
                  <strong>Assigned Consultant:</strong>{" "}
                  <span className="text-[#2457D6] font-semibold">
                    {consultation.assignedConsultant || "Pending Staff Assignment"}
                  </span>
                </p>
                <p>
                  <strong>Payment Status:</strong> {consultation.paymentStatus}
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <h3 className="font-heading font-bold text-sm text-[#172033] flex items-center gap-2">
                <Building className="w-4 h-4 text-[#2457D6]" /> Client & Company
              </h3>
              <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
                <p>
                  <strong>Client Name:</strong> {consultation.clientName}
                </p>
                <p>
                  <strong>Email:</strong> {consultation.clientEmail}
                </p>
                <p>
                  <strong>Phone:</strong> {consultation.clientPhone}
                </p>
                <p>
                  <strong>Organization:</strong> {consultation.businessName || "Not specified"}
                </p>
                <p>
                  <strong>Requested On:</strong> {consultation.createdAt}
                </p>
              </div>
            </div>
          </div>

          {/* Message / Scope */}
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-heading font-bold text-sm text-[#172033] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2457D6]" /> Your Submitted Objectives & Requirements
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#F5F7FB] p-4 rounded-xl border border-slate-200/80">
              {consultation.message}
            </p>
          </div>

          {/* Admin Notes */}
          {consultation.adminNotes && (
            <div className="p-6 bg-blue-50/50 border border-blue-200 rounded-2xl space-y-2">
              <h3 className="font-heading font-bold text-sm text-[#193F9B]">
                IEH Advisory Staff Notes
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">{consultation.adminNotes}</p>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }
