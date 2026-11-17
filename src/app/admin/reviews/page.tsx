"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { CourseReview } from "@/types";
import {
  Star,
  Search,
  CheckCircle,
  EyeOff,
  Trash2,
  BookOpen,
  User,
  Filter,
} from "lucide-react";

interface AdminReviewItem extends CourseReview {
  courseTitle: string;
  courseId: string;
}

export default function AdminReviewsPage() {
  const { courses } = useApp();

  // Aggregate all course reviews with course context
  const initialReviews: AdminReviewItem[] = courses.flatMap((c) =>
    (c.reviews || []).map((r) => ({
      ...r,
      courseTitle: c.title,
      courseId: c.id,
    }))
  );

  const [reviewsList, setReviewsList] = useState<AdminReviewItem[]>(
    initialReviews.length > 0
      ? initialReviews
      : [
        {
          id: "rev-1",
          studentName: "Tariqul Islam",
          rating: 5,
          comment: "Exceptional curriculum. The unit economics models allowed us to double our runway in 60 days.",
          date: "2026-02-14",
          status: "approved",
          courseTitle: "Full-Stack Startup Scaling: 0 to $1M ARR",
          courseId: "crs-1",
        },
        {
          id: "rev-2",
          studentName: "Farhana Yasmin",
          rating: 5,
          comment: "Roman Alom's framework on early stage sales is unmatched in practical utility.",
          date: "2026-02-18",
          status: "approved",
          courseTitle: "Full-Stack Startup Scaling: 0 to $1M ARR",
          courseId: "crs-1",
        },
        {
          id: "rev-3",
          studentName: "Shafiqul Alam",
          rating: 4,
          comment: "Comprehensive advisory notes. Would love more advanced supply chain case studies in module 4.",
          date: "2026-02-22",
          status: "pending",
          courseTitle: "Modern E-Commerce Mastery & Cross-Border Trade",
          courseId: "crs-2",
        },
      ]
  );

  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = reviewsList.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleStatus = (id: string, newStatus: "approved" | "hidden") => {
    setReviewsList(
      reviewsList.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm("Permanently delete this student review?")) {
      setReviewsList(reviewsList.filter((r) => r.id !== id));
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Student Review & Feedback Moderation"
      subtitle="Examine student feedback, ensure compliance with community standards, and moderate published testimonials."
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
                placeholder="Search reviewer, course, or comment..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] text-slate-700"
            >
              <option value="all">All Moderation Statuses</option>
              <option value="approved">Approved & Visible</option>
              <option value="pending">Pending Review</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>

        {/* Reviews Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Student Reviewer</th>
                  <th className="py-4 px-6">Associated Course</th>
                  <th className="py-4 px-6">Rating & Comment</th>
                  <th className="py-4 px-6">Submitted</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-sm text-[#172033]">{rev.studentName}</p>
                      <span className="text-xs text-slate-400">Verified Enrolment</span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-xs text-[#172033] max-w-xs truncate">{rev.courseTitle}</p>
                    </td>
                    <td className="py-4 px-6 max-w-sm">
                      <div className="flex items-center gap-1 text-amber-500 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-current" : "text-slate-200"
                              }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-mono">
                      {rev.date}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${rev.status === "approved"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : rev.status === "pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                      >
                        {rev.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {rev.status !== "approved" && (
                          <button
                            onClick={() => handleToggleStatus(rev.id, "approved")}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            title="Approve Review"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {rev.status !== "hidden" && (
                          <button
                            onClick={() => handleToggleStatus(rev.id, "hidden")}
                            className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg"
                            title="Hide Review"
                          >
                            <EyeOff className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(rev.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
