"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Award, Download, CheckCircle2, ShieldCheck, X } from "lucide-react";
import { Certificate } from "@/types";

  export default function StudentCertificatesPage() {
    const { certificates, currentUser } = useApp();
    const [previewCert, setPreviewCert] = useState<Certificate | null>(null);

    return (
      <DashboardLayout
        allowedRole="student"
        title="Earned Certificates"
        subtitle="View, preview, and download completion certificates for verified IEH masterclasses."
      >
        <div className="space-y-6">
          <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-xs text-slate-700 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#2457D6] shrink-0 mt-0.5" />
            <p>
              <strong>Certificate Verification Notice:</strong> Certificates are issued automatically upon finishing 100% of video curriculum lessons. Demo certificates are simulated for display purposes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#E9A23B] flex items-center justify-center">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {cert.certificateNumber}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-base text-[#172033]">
                    {cert.courseTitle}
                  </h3>

                  <div className="text-xs text-[#64748B] space-y-1">
                    <p>
                      Issued to: <strong>{currentUser?.name || cert.studentName}</strong>
                    </p>
                    <p>Date of completion: {cert.issueDate}</p>
                    <p>Signed by: {cert.instructorName}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewCert(cert)}
                    className="px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                  >
                    Preview Certificate
                  </button>
                  <button
                    onClick={() => alert(`Certificate ${cert.certificateNumber} downloaded.`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Certificate Preview Modal */}
          {previewCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-slate-200 relative space-y-6">
                <button
                  onClick={() => setPreviewCert(null)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="p-8 border-4 border-double border-amber-600/30 rounded-2xl text-center space-y-4 bg-gradient-to-b from-amber-50/20 to-white">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-[#E9A23B] flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#193F9B] block">
                    Internet Entrepreneurs Hub Academy
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Certificate of Completion
                  </h2>
                  <p className="text-xs text-slate-500">This certifies that</p>
                  <p className="font-heading font-bold text-xl text-[#2457D6] border-b border-slate-200 pb-2 inline-block px-8">
                    {currentUser?.name || previewCert.studentName}
                  </p>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    has successfully mastered all curriculum modules, assignments, and requirements for
                  </p>
                  <p className="font-bold text-sm text-[#172033]">{previewCert.courseTitle}</p>
                  <div className="pt-4 flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-100 max-w-sm mx-auto">
                    <span>Issued: {previewCert.issueDate}</span>
                    <span>ID: {previewCert.certificateNumber}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setPreviewCert(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }
