"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Star,
  Users,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

export default function AdminCoursesPage() {
  const { courses, updateCourse, deleteCourse } = useApp();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.instructorName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTogglePublish = (id: string, currentStatus: string) => {
    updateCourse(id, {
      status: currentStatus === "published" ? "draft" : "published",
    });
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Course Catalog Management"
      subtitle="Curate curriculum offerings, review course enrollments, set pricing, and publish new programs."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or instructors..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="Entrepreneurship">Entrepreneurship</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Business Management">Business Management</option>
              <option value="Freelancing">Freelancing</option>
              <option value="Business Technology">Business Technology</option>
            </select>
          </div>

          <Link
            href="/admin/courses/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Course Information</th>
                  <th className="py-4 px-6">Category & Level</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Students</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No courses match your search or filter.
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-slate-100 relative shrink-0">
                            <Image
                              src={c.thumbnail}
                              alt={c.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="max-w-xs">
                            <p className="font-bold text-sm text-[#172033] line-clamp-1">{c.title}</p>
                            <p className="text-xs text-slate-500">Instructor: {c.instructorName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2457D6] mr-1.5">
                          {c.category}
                        </span>
                        <span className="text-xs text-slate-500">{c.level}</span>
                      </td>
                      <td className="py-4 px-6 font-bold text-sm text-[#172033]">
                        {formatCurrency(c.discountPrice || c.price)}
                        {c.discountPrice && (
                          <span className="text-xs text-slate-400 line-through ml-1.5 font-normal">
                            {formatCurrency(c.price)}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{c.enrolledStudentsCount.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleTogglePublish(c.id, c.status)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${c.status === "published"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"
                            }`}
                          title="Click to toggle publish status"
                        >
                          <CheckCircle className="w-3 h-3" />
                          <span className="capitalize">{c.status}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/courses/${c.slug}`}
                            className="p-1.5 text-slate-400 hover:text-[#2457D6] rounded-lg hover:bg-slate-100 transition-colors"
                            title="Preview Public Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${c.title}"?`)) {
                                deleteCourse(c.id);
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Delete Course"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
