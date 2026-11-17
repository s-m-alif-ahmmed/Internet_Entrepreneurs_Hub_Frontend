import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Internet Entrepreneurs Hub",
  description: "Terms and conditions of use for Internet Entrepreneurs Hub (IEH) consultancy services and academy.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16 bg-[#F5F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-1">
                Legal Documentation
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033]">
                Terms & Conditions
              </h1>
              <p className="text-xs text-[#64748B] mt-2">
                Last updated: January 2026 • Document Version 1.0 (Draft for Review)
              </p>
            </div>

            {/* Legal Notice */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Draft Notice:</p>
                <p className="mt-0.5">
                  The following terms represent standard operational guidelines for Internet Entrepreneurs Hub (IEH). Final commercial provisions are subject to executed client engagement agreements.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">1. Acceptance of Terms</h2>
                <p>
                  By accessing the website, services, and online learning modules of Internet Entrepreneurs Hub (&quot;IEH&quot;), you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, you should discontinue use of the platform.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">2. Business Consulting Services</h2>
                <p>
                  All business consultancy engagements, strategic advice, and diagnostic reports provided by IEH and its advisors (including founders Md. Roman Alom and S M Alif Ahmmed) are intended for educational and strategic guidance purposes only. The implementation of recommendations and ultimate commercial decisions remain the sole responsibility of the client company.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">3. IEH Academy & Course Enrollment</h2>
                <p>
                  Course purchases grant a revocable, non-exclusive, personal license to access digital video lessons, worksheets, and resources. Account credentials may not be shared, sublicensed, or distributed.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">4. Intellectual Property</h2>
                <p>
                  All content, curriculum outlines, frameworks, trademarks, and media assets published on this website are the proprietary property of Internet Entrepreneurs Hub and are protected under international copyright conventions.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">5. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, IEH shall not be liable for any indirect, incidental, or consequential damages resulting from business decisions made pursuant to advisory sessions or course materials.
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
