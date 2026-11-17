"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { LiveClass, StreamingPlatform, LiveClassStatus } from "@/types";
import {
  Video,
  Plus,
  Calendar,
  Clock,
  ExternalLink,
  Users,
  Search,
  CheckCircle,
  X,
  Play,
} from "lucide-react";

export default function AdminLiveClassesPage() {
  const { liveClasses, scheduleLiveClass, updateLiveClass, courses } = useApp();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // New live class fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructorName, setInstructorName] = useState("Md. Roman Alom");
  const [platform, setPlatform] = useState<StreamingPlatform>("YouTube");
  const [date, setDate] = useState("2026-11-25");
  const [startTime, setStartTime] = useState("7:00 PM EST");
  const [duration, setDuration] = useState("60 minutes");
  const [streamingUrl, setStreamingUrl] = useState("https://www.youtube.com/watch?v=live-demo");

  const filtered = liveClasses.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.instructorName.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    scheduleLiveClass({
      title,
      description,
      instructorId: "inst-1",
      instructorName,
      date,
      startTime,
      duration,
      platform,
      streamingUrl,
      status: "Scheduled",
      attendeesCount: 0,
    });

    setTitle("");
    setDescription("");
    setModalOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: LiveClassStatus) => {
    updateLiveClass(id, { status: newStatus });
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Live Class Broadcast Management"
      subtitle="Schedule faculty live streams, assign YouTube or Facebook channels, and track attendee engagement."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search live class sessions..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
            />
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Live Broadcast</span>
          </button>
        </div>

        {/* Live classes list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cls) => (
            <div key={cls.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      cls.platform === "YouTube"
                        ? "bg-rose-50 text-rose-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    <Video className="w-3 h-3" />
                    <span>{cls.platform} Live</span>
                  </span>

                  <select
                    value={cls.status}
                    onChange={(e) => handleStatusChange(cls.id, e.target.value as LiveClassStatus)}
                    className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:border-[#2457D6]"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Live">Live Now</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <h3 className="font-heading font-bold text-base text-[#172033] line-clamp-2">{cls.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{cls.description}</p>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <p className="flex items-center gap-2 font-medium text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {cls.date} at {cls.startTime} ({cls.duration})
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    Host: {cls.instructorName}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">
                  {cls.attendeesCount || 45} Registered Attendees
                </span>
                <a
                  href={cls.streamingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:underline"
                >
                  <span>Stream Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#172033]">Schedule Live Broadcast</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Broadcast Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Q4 Startup Go-To-Market Masterclass"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Streaming Platform</label>
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value as StreamingPlatform)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    >
                      <option value="YouTube">YouTube Live</option>
                      <option value="Facebook">Facebook Live</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Session Host</label>
                    <select
                      value={instructorName}
                      onChange={(e) => setInstructorName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    >
                      <option value="Md. Roman Alom">Md. Roman Alom (Founder & CEO)</option>
                      <option value="S M Alif Ahmmed">S M Alif Ahmmed (Co-Founder & CTO)</option>
                      <option value="Dr. Marcus Vance">Dr. Marcus Vance (Faculty)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Date (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Start Time</label>
                    <input
                      type="text"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      placeholder="e.g. 7:00 PM EST"
                      className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Stream URL (YouTube / Facebook Live Link) *</label>
                  <input
                    type="url"
                    required
                    value={streamingUrl}
                    onChange={(e) => setStreamingUrl(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Session Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Topics covered, audience prerequisites, and live Q&A format..."
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
                  >
                    Schedule Broadcast
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
