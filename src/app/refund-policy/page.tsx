import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy | Internet Entrepreneurs Hub",
  description: "Refund terms and conditions for IEH Academy courses and business advisory sessions.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16 bg-[#F5F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-1">
                Customer Satisfaction
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033]">
                Refund & Cancellation Policy
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
                  The following terms outline general refund principles for demonstration purposes. Formal refund eligibility is governed by individual service contracts and payment gateways.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">1. IEH Academy Online Courses</h2>
                <p>
                  We strive to ensure complete satisfaction with our masterclasses. We provide a 14-day conditional refund window from the date of enrollment, provided that less than 20% of the course video content has been streamed and no certificates have been claimed.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">2. Business Consulting Services</h2>
                <p>
                  Consultation fees compensate professional advisors for dedicated preparation time, industry research, and strategic analysis. Appointments cancelled with at least 48 hours notice may be rescheduled at no additional charge. Completed sessions and delivered custom reports are non-refundable.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">3. How to Request a Refund</h2>
                <p>
                  To request a refund under the eligible criteria, submit an inquiry via our Support Desk (/support) citing your order reference number and the reason for your request.
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
