"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Video, Plus, Calendar, Clock, ExternalLink } from "lucide-react";
import { StreamingPlatform } from "@/types";

export default function InstructorLiveClassesPage() {
  const { liveClasses, scheduleLiveClass, courses, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    courseId: courses[0]?.id || "",
    date: "",
    startTime: "18:00 UTC",
    duration: "60 min",
    platform: "YouTube" as StreamingPlatform,
    streamingUrl: "https://www.youtube.com",
    description: "",
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) return;

    const selectedCourse = courses.find((c) => c.id === form.courseId);

    scheduleLiveClass({
      title: form.title,
      courseId: form.courseId,
      courseTitle: selectedCourse?.title,
      instructorId: currentUser?.id || "inst-1",
      instructorName: currentUser?.name || "Dr. Marcus Vance",
      date: form.date,
      startTime: form.startTime,
      duration: form.duration,
      platform: form.platform,
      streamingUrl: form.streamingUrl,
      status: "Scheduled",
      description: form.description || "Live interactive masterclass session.",
    });

    setModalOpen(false);
    setForm({
      title: "",
      courseId: courses[0]?.id || "",
      date: "",
      startTime: "18:00 UTC",
      duration: "60 min",
      platform: "YouTube",
      streamingUrl: "https://www.youtube.com",
      description: "",
    });
  };

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="Instructor Live Broadcasts"
      subtitle="Schedule YouTube and Facebook live streams for interactive classroom cohorts."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#64748B]">Scheduled Broadcast Sessions</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
          >
            <Plus className="w-4 h-4" /> Schedule Live Class
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveClasses.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2457D6]">
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{item.platform}</span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#172033]">{item.title}</h3>
                <p className="text-xs text-[#64748B] line-clamp-2">{item.description}</p>
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <p>
                    {item.date} at {item.startTime} ({item.duration})
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
                  {item.streamingUrl}
                </span>
                <a
                  href={item.streamingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:underline"
                >
                  Open Stream <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5">
              <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                Schedule Live Broadcast
              </h3>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#172033] mb-1">Class Title</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Live Q&A: Enterprise B2B Sales"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Associated Course</label>
                  <select
                    value={form.courseId}
                    onChange={(e) => setForm({ ...form, courseId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#172033] mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#172033] mb-1">Start Time</label>
                    <input
                      type="text"
                      value={form.startTime}
                      onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                      placeholder="e.g. 19:00 UTC"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#172033] mb-1">Platform</label>
                    <select
                      value={form.platform}
                      onChange={(e) =>
                        setForm({ ...form, platform: e.target.value as StreamingPlatform })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    >
                      <option value="YouTube">YouTube</option>
                      <option value="Facebook">Facebook</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#172033] mb-1">Duration</label>
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="e.g. 60 min"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">
                    Streaming URL (YouTube/Facebook Live link)
                  </label>
                  <input
                    type="url"
                    required
                    value={form.streamingUrl}
                    onChange={(e) => setForm({ ...form, streamingUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Topics covered during live broadcast..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2457D6] text-white font-bold hover:bg-[#193F9B]"
                  >
                    Save & Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
