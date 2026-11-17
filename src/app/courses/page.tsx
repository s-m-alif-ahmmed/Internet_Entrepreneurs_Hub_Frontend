"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Search,
  Star,
  Clock,
  BookOpen,
  Filter,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import Image from "next/image";

export default function CoursesCatalogPage() {
  const { courses, openCheckout, enrolledCourseIds } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "latest" | "price-asc" | "price-desc">("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "All",
    "Entrepreneurship",
    "Digital Marketing",
    "E-commerce",
    "Business Management",
    "Freelancing",
    "Business Technology",
  ];

  const filteredCourses = useMemo(() => {
    let result = courses.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "popular") {
      result = [...result].sort((a, b) => b.enrolledStudentsCount - a.enrolledStudentsCount);
    } else if (sortBy === "latest") {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }

    return result;
  }, [courses, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Catalog Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              IEH Academy
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Learn Skills That Move Your Business Forward
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Master practical commercial skills with structured, on-demand masterclasses taught by vetted industry practitioners.
            </p>
          </div>
        </section>

        {/* Filter / Search Bar */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search courses, instructors..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>

              <div className="flex items-center gap-2 self-end md:self-auto text-xs">
                <span className="text-[#64748B] font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="latest">Latest Released</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#2457D6] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedCourses.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl max-w-lg mx-auto p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-[#172033]">No courses found</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Try adjusting your search criteria or resetting filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedCourses.map((course) => {
                  const isEnrolled = enrolledCourseIds.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all group"
                    >
                      {/* Thumbnail */}
                      <Link href={`/courses/${course.slug}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#2457D6] uppercase tracking-wider">
                          {course.category}
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-[#E9A23B] font-bold mb-1">
                            <Star className="w-3.5 h-3.5 fill-[#E9A23B]" />
                            <span>{course.rating}</span>
                            <span className="text-[#64748B] font-normal">
                              ({course.reviewCount} reviews)
                            </span>
                          </div>

                          <Link href={`/courses/${course.slug}`}>
                            <h3 className="font-heading font-bold text-sm text-[#172033] hover:text-[#2457D6] transition-colors line-clamp-2">
                              {course.title}
                            </h3>
                          </Link>

                          <p className="text-xs text-[#64748B] mt-1 line-clamp-2">
                            {course.shortDescription}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] text-[#64748B] pt-3 mt-3 border-t border-slate-100">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" /> {course.totalLessons} lessons
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {course.duration}
                            </span>
                          </div>
                        </div>

                        {/* Footer & CTA */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                          <div>
                            <span className="font-extrabold text-base text-[#172033]">
                              ${course.discountPrice || course.price}
                            </span>
                            {course.discountPrice && (
                              <span className="text-xs text-slate-400 line-through ml-1.5">
                                ${course.price}
                              </span>
                            )}
                          </div>

                          {isEnrolled ? (
                            <Link
                              href={`/student/course/${course.id}`}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-[#16A36A] font-bold text-xs flex items-center gap-1 hover:bg-emerald-100 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5" /> Learning
                            </Link>
                          ) : (
                            <button
                              onClick={() => openCheckout(course)}
                              className="px-3.5 py-1.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
                            >
                              Enroll Now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium disabled:opacity-40"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-xl text-xs font-bold ${
                      currentPage === page
                        ? "bg-[#2457D6] text-white"
                        : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-medium disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
