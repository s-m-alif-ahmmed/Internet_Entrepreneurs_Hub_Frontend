"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Plus, Trash2, X, BookOpen, Briefcase } from "lucide-react";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  type: "course" | "service";
  description: string;
}

export default function AdminCategoriesPage() {
  const { courses, services } = useApp();

  const [categories, setCategories] = useState<CategoryItem[]>([
    { id: "cat-1", name: "Entrepreneurship", slug: "entrepreneurship", type: "course", description: "Foundational mindset and business formation models." },
    { id: "cat-2", name: "Digital Marketing", slug: "digital-marketing", type: "course", description: "High-ROI digital advertising and growth marketing." },
    { id: "cat-3", name: "E-commerce", slug: "e-commerce", type: "course", description: "Global supply chain, multichannel retail, and storefronts." },
    { id: "cat-4", name: "Business Management", slug: "business-management", type: "course", description: "Financial reporting, organizational structure, and legal readiness." },
    { id: "cat-5", name: "Freelancing", slug: "freelancing", type: "course", description: "Agency scaling, high-ticket proposals, and client retention." },
    { id: "cat-6", name: "Startup & Planning", slug: "startup-planning", type: "service", description: "Venture incubation and pitch deck validation." },
    { id: "cat-7", name: "Technology Advisory", slug: "technology-advisory", type: "service", description: "Enterprise architecture and software engineering strategy." },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<"course" | "service">("course");
  const [description, setDescription] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setCategories([
      ...categories,
      {
        id: `cat-${Date.now()}`,
        name,
        slug,
        type,
        description,
      },
    ]);

    setName("");
    setDescription("");
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Category Hierarchy Management"
      subtitle="Categorize advisory consulting tracks and online academy course curricula."
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing {categories.length} registered classification tags.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => {
            const itemCount =
              cat.type === "course"
                ? courses.filter((c) => c.category.toLowerCase() === cat.name.toLowerCase()).length
                : services.filter((s) => s.category.toLowerCase().includes(cat.name.toLowerCase())).length;

            return (
              <div key={cat.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cat.type === "course"
                          ? "bg-blue-50 text-[#2457D6]"
                          : "bg-purple-50 text-purple-700"
                        }`}
                    >
                      {cat.type === "course" ? <BookOpen className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
                      <span className="capitalize">{cat.type} Track</span>
                    </span>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-[#172033]">{cat.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">slug: /{cat.slug}</p>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{cat.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Linked items</span>
                  <span className="font-bold text-[#172033]">{itemCount} active {cat.type}s</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-lg text-[#172033]">Add Classification Category</h3>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Artificial Intelligence"
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Scope Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as "course" | "service")}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  >
                    <option value="course">Academy Course</option>
                    <option value="service">Business Consulting Service</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Brief Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Category context and targeted competencies..."
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
                    Save Category
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
