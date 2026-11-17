"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Briefcase,
  Calendar,
  Building,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { consultations, currentUser } = useApp();

  const clientConsultations = consultations.filter(
    (c) => c.clientEmail === currentUser?.email || c.clientName === currentUser?.name
  );

  const pendingCount = clientConsultations.filter(
    (c) => c.status === "pending" || c.status === "under_review"
  ).length;
  const confirmedCount = clientConsultations.filter(
    (c) => c.status === "confirmed" || c.status === "in_progress"
  ).length;
  const completedCount = clientConsultations.filter((c) => c.status === "completed").length;

  return (
    <DashboardLayout
      allowedRole="client"
      title="Client Advisory Portal"
      subtitle="Manage your business consulting sessions, advisor reports, and active engagements."
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Total Consultations</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {clientConsultations.length}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Pending Requests</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {pendingCount}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Confirmed / In Progress</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {confirmedCount}
              </h3>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#16A36A] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Completed Engagements</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {completedCount}
              </h3>
            </div>
          </div>
        </div>

        {/* Recent Consultation Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-[#172033]">
              Active Advisory Engagements
            </h2>
            <Link
              href="/client/consultations"
              className="text-xs font-bold text-[#2457D6] hover:underline"
            >
              View Full History →
            </Link>
          </div>

          {clientConsultations.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-heading font-bold text-base text-[#172033]">
                No Consultations Booked
              </h3>
              <p className="text-xs text-[#64748B]">
                Request an advisory session with our business consultants to get started.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
              >
                Book a Consultation
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientConsultations.map((item) => (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#2457D6]">
                        {item.referenceNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : item.status === "completed"
                              ? "bg-slate-100 text-slate-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                      >
                        {item.status.replace("_", " ")}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base text-[#172033]">
                      {item.serviceTitle}
                    </h3>
                    <p className="text-xs text-[#64748B] line-clamp-2">{item.message}</p>

                    <div className="text-xs text-slate-600 pt-2 border-t border-slate-100 space-y-1">
                      <p>
                        <strong>Scheduled:</strong> {item.preferredDate} at {item.preferredTime} ({item.consultationType})
                      </p>
                      {item.assignedConsultant && (
                        <p>
                          <strong>Advisor:</strong> {item.assignedConsultant}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-[#64748B]">Payment: {item.paymentStatus}</span>
                    <Link
                      href={`/client/consultations/${item.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:underline"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
