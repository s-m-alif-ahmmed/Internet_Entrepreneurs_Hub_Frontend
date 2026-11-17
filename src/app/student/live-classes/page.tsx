"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Video, Calendar, Clock, ExternalLink } from "lucide-react";

export default function StudentLiveClassesPage() {
  const { liveClasses } = useApp();

  return (
    <DashboardLayout
      allowedRole="student"
      title="Student Live Classes"
      subtitle="Attend live lectures, workshops, and interactive Q&A sessions on YouTube & Facebook."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveClasses.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.status === "Live"
                        ? "bg-rose-100 text-rose-700 animate-pulse"
                        : item.status === "Scheduled"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                    {item.platform}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#172033]">
                  {item.title}
                </h3>

                <p className="text-xs text-[#64748B] line-clamp-2">{item.description}</p>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.date} • {item.startTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: {item.duration}</span>
                  </div>
                  <p className="text-slate-800 font-medium">Host: {item.instructorName}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-[#64748B]">
                  {item.attendeesCount} participants
                </span>
                <a
                  href={item.streamingUrl}
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
    </DashboardLayout>
  );
}
