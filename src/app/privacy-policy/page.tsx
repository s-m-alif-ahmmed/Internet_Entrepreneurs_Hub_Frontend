import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Internet Entrepreneurs Hub",
  description: "Privacy policy and data protection framework for Internet Entrepreneurs Hub (IEH).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16 bg-[#F5F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-1">
                Data Protection
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033]">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#64748B] mt-2">
                Last updated: January 2026 • Document Version 1.0 (Draft for Review)
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Draft Notice:</p>
                <p className="mt-0.5">
                  This document serves as our operational data policy framework. It will be supplemented by jurisdictional GDPR / CCPA legal schedules upon full commercial deployment.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">1. Information We Collect</h2>
                <p>
                  We collect information necessary to provide consulting bookings and educational services, including your name, corporate email address, contact telephone, company name, course progress, and consultation notes.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">2. How We Use Your Data</h2>
                <p>
                  Your information is utilized solely to administer course enrollments, schedule verified video consultations, issue completion certificates, and process service inquiries. We do not sell or rent personal information to third-party advertisers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">3. Data Security & Storage</h2>
                <p>
                  Internet Entrepreneurs Hub employs modern encryption, secure session tokens, and strict access controls to safeguard confidential business documents and student account data.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">4. Contact Our Privacy Officer</h2>
                <p>
                  For data access requests or deletion inquiries, submit an official support ticket through our verified Support Desk (/support).
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
