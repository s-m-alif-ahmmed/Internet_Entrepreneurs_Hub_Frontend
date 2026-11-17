import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home, BookOpen, Briefcase, CalendarCheck, HelpCircle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full text-center space-y-8 bg-white p-10 sm:p-14 rounded-3xl border border-slate-200 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-blue-50 text-[#2457D6] font-heading font-extrabold text-3xl flex items-center justify-center mx-auto shadow-xs">
            404
          </div>

          <div className="space-y-3">
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#172033]">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2457D6] text-white font-extrabold text-sm hover:bg-[#193F9B] transition-colors shadow-xs"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-extrabold text-sm hover:bg-slate-50 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Courses</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
            <Link
              href="/services"
              className="p-3 rounded-xl bg-[#F5F7FB] hover:bg-blue-50 transition-colors group"
            >
              <Briefcase className="w-4 h-4 text-slate-500 group-hover:text-[#2457D6] mb-1" />
              <p className="font-bold text-xs text-[#172033]">Consultancy</p>
              <p className="text-[11px] text-slate-500">Advisory tracks</p>
            </Link>
            <Link
              href="/consultation"
              className="p-3 rounded-xl bg-[#F5F7FB] hover:bg-blue-50 transition-colors group"
            >
              <CalendarCheck className="w-4 h-4 text-slate-500 group-hover:text-[#2457D6] mb-1" />
              <p className="font-bold text-xs text-[#172033]">Book Strategy</p>
              <p className="text-[11px] text-slate-500">1-on-1 session</p>
            </Link>
            <Link
              href="/support"
              className="p-3 rounded-xl bg-[#F5F7FB] hover:bg-blue-50 transition-colors group col-span-2 sm:col-span-1"
            >
              <HelpCircle className="w-4 h-4 text-slate-500 group-hover:text-[#2457D6] mb-1" />
              <p className="font-bold text-xs text-[#172033]">Help Center</p>
              <p className="text-[11px] text-slate-500">24/7 Support desk</p>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
