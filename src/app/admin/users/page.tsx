"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { User, UserRole } from "@/types";
import {
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  CheckCircle,
  X,
  Filter,
} from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
  const { users, registerUser } = useApp();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "student" as "student" | "client",
    company: "",
  });

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    registerUser(newUser);
    setModalOpen(false);
    setNewUser({ name: "", email: "", phone: "", role: "student", company: "" });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "instructor":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "client":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "student":
      default:
        return "bg-blue-50 text-[#2457D6] border-blue-200";
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="User Management"
      subtitle="Manage student enrollments, consulting clients, faculty instructors, and administrative roles."
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold bg-white text-[#172033]"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="client">Clients</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Administrators</option>
            </select>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Company</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                      <Image
                        src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                        alt={u.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-[#172033]">{u.name}</p>
                      <p className="text-[11px] text-slate-400">{u.title || "Member"}</p>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase ${getRoleBadge(
                        u.role
                      )}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{u.company || "—"}</td>
                  <td className="p-4 text-slate-500">{u.createdAt}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A36A] font-bold text-[10px] uppercase">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => alert(`Editing user ${u.name}`)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#2457D6] hover:bg-slate-100"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                  Add New User
                </h3>
                <button onClick={() => setModalOpen(false)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#172033] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({ ...newUser, role: e.target.value as "student" | "client" })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-semibold"
                  >
                    <option value="student">Student</option>
                    <option value="client">Client</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#172033] mb-1">Company (Optional)</label>
                  <input
                    type="text"
                    value={newUser.company}
                    onChange={(e) => setNewUser({ ...newUser, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#2457D6] text-white font-bold hover:bg-[#193F9B]"
                  >
                    Create User
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
