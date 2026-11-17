"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import {
  Plus,
  CheckCircle,
  X,
} from "lucide-react";

export default function AdminAnnouncementsPage() {
  const { announcements, addAnnouncement } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState<"All Users" | "Students" | "Clients" | "Instructors">("All Users");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    addAnnouncement({
      title,
      description,
      targetAudience,
      status: "Published",
    });

    setTitle("");
    setDescription("");
    setModalOpen(false);
  };

  const getAudienceBadge = (aud: string) => {
    switch (aud) {
      case "Students":
        return "bg-blue-50 text-[#2457D6] border-blue-200";
      case "Clients":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Instructors":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "All Users":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Platform Announcement Broadcaster"
      subtitle="Dispatch broadcast bulletins, maintenance notifications, and academic alerts across audiences."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Active alerts dispatched to student, client, and faculty workspaces.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </div>

        {/* Announcements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${getAudienceBadge(a.targetAudience)}`}>
                    Audience: {a.targetAudience}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {a.publishedAt}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#172033] line-clamp-2">{a.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{a.description}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Live in feeds
                </span>
                <span className="capitalize font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  {a.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#172033]">Dispatch Announcement</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Headline Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Scheduled Network Upgrade & Live Class Maintenance"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as "All Users" | "Students" | "Clients" | "Instructors")}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  >
                    <option value="All Users">Everyone (Platform-Wide)</option>
                    <option value="Students">Academy Students Only</option>
                    <option value="Clients">Consulting Clients Only</option>
                    <option value="Instructors">Faculty Instructors Only</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Announcement Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Clear description of instructions, timings, or updates..."
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
                    Broadcast Now
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
