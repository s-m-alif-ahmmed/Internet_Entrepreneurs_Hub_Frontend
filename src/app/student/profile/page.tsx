"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { User, Mail, Phone, Lock, Save, Camera } from "lucide-react";
import Image from "next/image";

export default function StudentProfilePage() {
  const { currentUser, updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    title: currentUser?.title || "",
    bio: currentUser?.bio || "",
    password: "",
    newPassword: "",
  });

  const [savedMsg, setSavedMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      phone: formData.phone,
      title: formData.title,
      bio: formData.bio,
    });
    setSavedMsg("Profile changes saved successfully!");
    setTimeout(() => setSavedMsg(""), 3500);
  };

  return (
    <DashboardLayout
      allowedRole="student"
      title="Student Profile"
      subtitle="Manage your personal details, learning credentials, and account settings."
    >
      <div className="max-w-3xl space-y-6">
        {savedMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-[#16A36A] rounded-2xl text-xs font-semibold">
            {savedMsg}
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200">
              <Image
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                alt={currentUser?.name || "Student Avatar"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-[#172033]">
                {currentUser?.name}
              </h3>
              <p className="text-xs text-[#64748B] capitalize">Role: {currentUser?.role}</p>
              <button
                type="button"
                onClick={() => alert("Avatar upload simulated.")}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Camera className="w-3.5 h-3.5" /> Change Photo
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={formData.email}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Aspiring Founder"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">Short Bio</label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief summary of your background and learning goals..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
