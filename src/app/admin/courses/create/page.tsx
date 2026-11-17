"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { CourseCategory } from "@/types";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Check,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface NewModule {
  id: string;
  title: string;
  lessons: { id: string; title: string; duration: string; isPreview: boolean }[];
}

export default function CreateCoursePage() {
  const router = useRouter();
  const { addCourse } = useApp();

  const [activeTab, setActiveTab] = useState<"info" | "curriculum" | "pricing">("info");

  // Form fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<CourseCategory>("Entrepreneurship");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced" | "All Levels">("All Levels");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80");
  const [price, setPrice] = useState("149");
  const [discountPrice, setDiscountPrice] = useState("99");
  const [duration, setDuration] = useState("8.5 hours");
  const [whatYouWillLearn, setWhatYouWillLearn] = useState("Build scalable digital ventures\nMaster business unit economics\nAutomate client acquisition");
  const [requirements, setRequirements] = useState("Basic entrepreneurial interest\nAccess to a computer with high-speed internet");

  // Curriculum builder state
  const [modules, setModules] = useState<NewModule[]>([
    {
      id: "mod-1",
      title: "Module 1: Strategic Foundations",
      lessons: [
        { id: "les-1", title: "Introduction & Market Fit", duration: "18m", isPreview: true },
        { id: "les-2", title: "Unit Economics & Margins", duration: "25m", isPreview: false },
      ],
    },
  ]);

  const addModule = () => {
    const nextNum = modules.length + 1;
    setModules([
      ...modules,
      {
        id: `mod-${Date.now()}`,
        title: `Module ${nextNum}: Strategic Deep Dive`,
        lessons: [
          { id: `les-${Date.now()}-1`, title: "Core Concepts Overview", duration: "20m", isPreview: false },
        ],
      },
    ]);
  };

  const removeModule = (modId: string) => {
    setModules(modules.filter((m) => m.id !== modId));
  };

  const addLesson = (modId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === modId) {
          return {
            ...m,
            lessons: [
              ...m.lessons,
              {
                id: `les-${Date.now()}`,
                title: "New Lesson Session",
                duration: "15m",
                isPreview: false,
              },
            ],
          };
        }
        return m;
      })
    );
  };

  const updateLessonTitle = (modId: string, lessonId: string, val: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === modId) {
          return {
            ...m,
            lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, title: val } : l)),
          };
        }
        return m;
      })
    );
  };

  const toggleLessonPreview = (modId: string, lessonId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === modId) {
          return {
            ...m,
            lessons: m.lessons.map((l) =>
              l.id === lessonId ? { ...l, isPreview: !l.isPreview } : l
            ),
          };
        }
        return m;
      })
    );
  };

  const removeLesson = (modId: string, lessonId: string) => {
    setModules(
      modules.map((m) => {
        if (m.id === modId) {
          return {
            ...m,
            lessons: m.lessons.filter((l) => l.id !== lessonId),
          };
        }
        return m;
      })
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a course title.");
      return;
    }

    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    addCourse({
      title,
      slug,
      category,
      level,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      thumbnail,
      price: Number(price) || 99,
      discountPrice: discountPrice ? Number(discountPrice) : undefined,
      duration,
      totalLessons: totalLessons || 1,
      whatYouWillLearn: whatYouWillLearn.split("\n").filter(Boolean),
      requirements: requirements.split("\n").filter(Boolean),
      targetAudience: ["Entrepreneurs", "Startup Founders", "Modern Operators"],
      modules: modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          duration: l.duration,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          isPreview: l.isPreview,
        })),
      })),
      status: "published",
    });

    router.push("/admin/courses");
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Create New Academy Course"
      subtitle="Assemble syllabus modules, establish tuition rates, and publish live to the IEH Academy."
    >
      <div className="space-y-6 max-w-5xl">
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#2457D6] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Roster</span>
        </Link>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "info"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            1. General Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("curriculum")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "curriculum"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            2. Curriculum & Modules
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pricing")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "pricing"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            3. Pricing & Enrollment
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TAB 1: General Info */}
          {activeTab === "info" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-[#172033]">Course Overview</h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Course Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern E-Commerce Scalability & Supply Chain"
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CourseCategory)}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  >
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Business Management">Business Management</option>
                    <option value="Freelancing">Freelancing</option>
                    <option value="Business Technology">Business Technology</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Difficulty Level</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced" | "All Levels")}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Short Summary</label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Concise value proposition for course cards and banners..."
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Detailed Syllabus Description</label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Comprehensive walkthrough of methodologies, deliverables, and projects..."
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">What You Will Learn (one per line)</label>
                  <textarea
                    rows={3}
                    value={whatYouWillLearn}
                    onChange={(e) => setWhatYouWillLearn(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Prerequisites / Requirements (one per line)</label>
                  <textarea
                    rows={3}
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("curriculum")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
                >
                  <span>Proceed to Curriculum</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Curriculum */}
          {activeTab === "curriculum" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">Curriculum Structure</h3>
                  <p className="text-xs text-slate-500">Organize lessons into sequential learning modules.</p>
                </div>
                <button
                  type="button"
                  onClick={addModule}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#2457D6] font-bold text-xs hover:bg-blue-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Module</span>
                </button>
              </div>

              <div className="space-y-4">
                {modules.map((mod) => (
                  <div key={mod.id} className="border border-slate-200 rounded-xl p-4 bg-[#F5F7FB] space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <input
                        type="text"
                        value={mod.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setModules(modules.map((m) => (m.id === mod.id ? { ...m, title: val } : m)));
                        }}
                        className="font-bold text-sm text-[#172033] bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex-1 focus:outline-none focus:border-[#2457D6]"
                      />
                      {modules.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeModule(mod.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Lessons list */}
                    <div className="space-y-2 pl-4 border-l-2 border-blue-200">
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200">
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => updateLessonTitle(mod.id, lesson.id, e.target.value)}
                            className="text-xs font-semibold text-slate-700 flex-1 bg-transparent border-none focus:outline-none"
                            placeholder="Lesson Title..."
                          />
                          <span className="text-xs text-slate-400 font-mono">{lesson.duration}</span>
                          <button
                            type="button"
                            onClick={() => toggleLessonPreview(mod.id, lesson.id)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                              lesson.isPreview
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            }`}
                          >
                            {lesson.isPreview ? "Free Preview" : "Locked"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeLesson(mod.id, lesson.id)}
                            className="text-slate-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => addLesson(mod.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#2457D6] hover:underline pt-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Lesson to {mod.title.split(":")[0]}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("info")}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("pricing")}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
                >
                  <span>Proceed to Pricing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Pricing & Publish */}
          {activeTab === "pricing" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-[#172033]">Pricing & Publication</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">List Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Promotional Discount Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      placeholder="Optional"
                      className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Estimated Total Hours</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 10.5 hours"
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Course Thumbnail URL</label>
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#2457D6] shrink-0 mt-0.5" />
                <p className="text-xs text-[#193F9B]">
                  Submitting will automatically index this program across the IEH Academy directory and enable instant
                  student checkout and simulation enrolment.
                </p>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("curriculum")}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2457D6] text-white font-extrabold text-sm hover:bg-[#193F9B] transition-colors shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Academy Course</span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
