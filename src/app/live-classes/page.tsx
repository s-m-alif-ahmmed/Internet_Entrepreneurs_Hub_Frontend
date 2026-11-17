"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import {
  Video,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  CheckCircle,
  Filter,
} from "lucide-react";

export default function LiveClassesPage() {
  const { liveClasses } = useApp();
  const [filterPlatform, setFilterPlatform] = useState<string>("All");

  const filtered = liveClasses.filter((c) => {
    return filterPlatform === "All" || c.platform === filterPlatform;
  });

  const liveNow = filtered.filter((c) => c.status === "Live");
  const upcoming = filtered.filter((c) => c.status === "Scheduled");
  const completed = filtered.filter((c) => c.status === "Completed");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              Broadcast Schedule
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Live Broadcast Classes & Interactive Workshops
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Join interactive, scheduled live masterclasses streamed through YouTube and Facebook. Participate in live Q&A with senior consultants and instructors.
            </p>

            {/* Filter buttons */}
            <div className="flex justify-center items-center gap-2 pt-4">
              {["All", "YouTube", "Facebook"].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setFilterPlatform(platform)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    filterPlatform === platform
                      ? "bg-[#2457D6] text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* LIVE NOW SECTION */}
            {liveNow.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Live Broadcast Now
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {liveNow.map((c) => (
                    <div
                      key={c.id}
                      className="p-7 rounded-3xl bg-rose-50/50 border-2 border-rose-200 shadow-md space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Now
                          </span>
                          <span className="text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-lg">
                            {c.platform}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xl text-[#172033]">{c.title}</h3>
                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{c.description}</p>

                        <div className="pt-2 text-xs text-[#64748B] space-y-1">
                          <p>
                            <strong>Instructor:</strong> {c.instructorName}
                          </p>
                          {c.courseTitle && (
                            <p>
                              <strong>Course:</strong> {c.courseTitle}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-rose-200/80 flex items-center justify-between">
                        <span className="text-xs text-rose-700 font-medium">
                          {c.attendeesCount} participants currently tuned in
                        </span>
                        <a
                          href={c.streamingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-colors shadow-md shadow-rose-600/20"
                        >
                          Join Live Stream <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* UPCOMING CLASSES */}
            <div className="space-y-6">
              <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                Upcoming Scheduled Sessions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcoming.map((c) => (
                  <div
                    key={c.id}
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2457D6] font-bold text-[11px] uppercase tracking-wider">
                          Scheduled
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            c.platform === "YouTube"
                              ? "bg-red-50 text-red-600"
                              : "bg-blue-50 text-blue-600"
                          }`}
                        >
                          {c.platform}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-base text-[#172033] line-clamp-2">
                        {c.title}
                      </h3>

                      <p className="text-xs text-[#64748B] line-clamp-3">{c.description}</p>

                      <div className="space-y-1 text-xs text-slate-700 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-[#64748B]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{c.date} at {c.startTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[#64748B]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Duration: {c.duration}</span>
                        </div>
                        <p className="pt-1 text-[#172033]">
                          <strong>Host:</strong> {c.instructorName}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-[#64748B]">
                        {c.attendeesCount} pre-registered
                      </span>
                      <a
                        href={c.streamingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                      >
                        Join Broadcast <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPLETED CLASSES */}
            {completed.length > 0 && (
              <div className="space-y-6 pt-6 border-t border-slate-200">
                <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                  Recently Completed Classes
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completed.map((c) => (
                    <div
                      key={c.id}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 opacity-90"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full uppercase">
                          Completed
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">{c.platform}</span>
                      </div>
                      <h3 className="font-heading font-bold text-sm text-[#172033]">{c.title}</h3>
                      <p className="text-xs text-[#64748B]">Conducted on {c.date} by {c.instructorName}</p>
                      <a
                        href={c.streamingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2457D6] hover:underline pt-2"
                      >
                        Watch Recorded Stream <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
