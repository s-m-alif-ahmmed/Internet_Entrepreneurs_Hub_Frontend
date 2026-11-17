import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_INSTRUCTORS } from "@/lib/mock-data";
import Link from "next/link";
import { Star, BookOpen, Users, ArrowRight } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Instructors & Faculty | Internet Entrepreneurs Hub",
  description:
    "Meet our vetted instructors, advisors, and corporate faculty members teaching across IEH Academy masterclasses.",
};

export default function InstructorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              IEH Faculty
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Learn from Industry Practitioners
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Our instructors are active founders, corporate consultants, and growth operators who bring real-world experience directly to the classroom.
            </p>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {INITIAL_INSTRUCTORS.map((inst) => (
                <div
                  key={inst.id}
                  className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-5 hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-md">
                      <Image
                        src={inst.avatar}
                        alt={inst.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                        {inst.name}
                      </h3>
                      <p className="text-xs font-bold text-[#2457D6] mt-0.5">{inst.title}</p>
                      <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-[#64748B] text-[11px] font-medium">
                        {inst.specialization}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                      {inst.bio}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <span className="block font-bold text-[#172033]">{inst.coursesCount}</span>
                        <span className="text-[10px] text-slate-400">Courses</span>
                      </div>
                      <div>
                        <span className="block font-bold text-[#172033]">{inst.studentsCount}</span>
                        <span className="text-[10px] text-slate-400">Students</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-[#172033] flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-[#E9A23B] text-[#E9A23B]" /> {inst.rating}
                        </span>
                        <span className="text-[10px] text-slate-400">Rating</span>
                      </div>
                    </div>

                    <Link
                      href="/courses"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:border-[#2457D6] hover:text-[#2457D6] transition-colors"
                    >
                      View Courses <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
