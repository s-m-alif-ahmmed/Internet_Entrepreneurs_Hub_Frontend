"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Bell, Sparkles, Video, BookOpen, Check } from "lucide-react";

export default function StudentNotificationsPage() {
  const { announcements } = useApp();
  const [readIds, setReadIds] = useState<string[]>([]);

  const toggleRead = (id: string) => {
    setReadIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout
      allowedRole="student"
      title="Notifications & Announcements"
      subtitle="Stay informed on live broadcasts, course curriculum releases, and system updates."
    >
      <div className="space-y-4 max-w-4xl">
        {announcements.map((a) => {
          const isRead = readIds.includes(a.id);
          return (
            <div
              key={a.id}
              className={`p-6 rounded-2xl border transition-all ${isRead
                  ? "bg-white border-slate-200 opacity-80"
                  : "bg-blue-50/40 border-blue-200 shadow-xs"
                }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2457D6] flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading font-bold text-sm text-[#172033]">{a.title}</h3>
                      {!isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#2457D6]" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{a.description}</p>
                    <span className="text-[10px] text-slate-400 block mt-2">
                      Published on {a.publishedAt} • Audience: {a.targetAudience}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleRead(a.id)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-600 hover:bg-white shrink-0"
                >
                  {isRead ? "Mark Unread" : "Mark as Read"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
