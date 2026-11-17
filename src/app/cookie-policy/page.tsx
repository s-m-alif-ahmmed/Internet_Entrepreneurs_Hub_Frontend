import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Internet Entrepreneurs Hub",
  description: "Explanation of cookies and session tokens used on the IEH platform.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 py-16 bg-[#F5F7FB]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8">
            <div className="border-b border-slate-100 pb-6">
              <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block mb-1">
                Transparency
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033]">
                Cookie Policy
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
                  Describes technical cookies and session storage mechanisms used to maintain login status and local dashboard preferences.
                </p>
              </div>
            </div>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">1. What Are Cookies?</h2>
                <p>
                  Cookies and browser storage mechanisms are small text tokens stored on your device when you interact with modern web applications. They allow platforms to remember your authenticated session and preserve your learning progress.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">2. How IEH Uses Cookies</h2>
                <p>
                  We utilize strictly necessary session cookies to maintain your login credentials, preserve course player completion states, and securely manage consultation booking workflows. We do not use third-party invasive tracking pixels.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-heading font-bold text-lg text-[#172033]">3. Managing Preferences</h2>
                <p>
                  You can configure your browser to reject cookies; however, disabling essential session tokens will prevent you from accessing student or client dashboard portals.
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
