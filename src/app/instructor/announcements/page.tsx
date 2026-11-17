"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Megaphone, Plus } from "lucide-react";

export default function InstructorAnnouncementsPage() {
  const { announcements, addAnnouncement } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    addAnnouncement({
      title,
      description,
      targetAudience: "Students",
      status: "Published",
    });
    setModalOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="Course Announcements"
      subtitle="Publish broadcasts, assignment guidelines, and study updates to your students."
    >
      <div className="space-y-6 max-w-4xl">
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#64748B]">Active Student Announcements</p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B]"
          >
            <Plus className="w-4 h-4" /> New Announcement
          </button>
        </div>

        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#2457D6] bg-blue-50 px-2.5 py-0.5 rounded-full uppercase">
                  {a.targetAudience}
                </span>
                <span className="text-xs text-slate-400">{a.publishedAt}</span>
              </div>
              <h3 className="font-heading font-bold text-base text-[#172033]">{a.title}</h3>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>

        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#172033]">
                Post New Announcement
              </h3>
              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#172033] mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Week 3 Assignment Released"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#172033] mb-1">Description</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Message to students..."
                    className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
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
                    Publish
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
