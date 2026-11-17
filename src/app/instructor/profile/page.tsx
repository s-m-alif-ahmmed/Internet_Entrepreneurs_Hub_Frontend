"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Save, User, Mail, Camera } from "lucide-react";
import Image from "next/image";

export default function InstructorProfilePage() {
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "Dr. Marcus Vance",
    email: currentUser?.email || "instructor@ieh.com",
    title: currentUser?.title || "Senior Business Strategist",
    bio: currentUser?.bio || "Author and corporate consultant with 15+ years advising international enterprises.",
  });

  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout
      allowedRole="instructor"
      title="Instructor Faculty Profile"
      subtitle="Update your academic credentials, professional bio, and public course instructor card."
    >
      <div className="max-w-2xl bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-50 text-[#16A36A] rounded-xl text-xs font-semibold">
            Faculty profile saved successfully!
          </div>
        )}

        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-slate-200">
            <Image
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"}
              alt="Instructor"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-[#172033]">{formData.name}</h3>
            <p className="text-xs text-[#64748B]">{formData.title}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5">Instructor Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5">Professional Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#172033] mb-1.5">Biography</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
            />
          </div>

          <div className="pt-3 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B]"
            >
              <Save className="w-3.5 h-3.5" /> Save Profile
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
