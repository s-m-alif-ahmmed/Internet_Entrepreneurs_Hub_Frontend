"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  Briefcase,
  Target,
  Cpu,
  Megaphone,
  ShoppingBag,
  ShieldCheck,
  Compass,
  TrendingUp,
  Clock,
  Filter,
} from "lucide-react";

export default function ServicesPage() {
  const { services } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "All",
    "Startup & Planning",
    "Strategy & Operations",
    "Marketing & Growth",
    "Technology & E-commerce",
    "General Advisory",
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Rocket":
      case "Compass":
        return <Compass className="w-6 h-6 text-[#2457D6]" />;
      case "Target":
        return <Target className="w-6 h-6 text-[#2457D6]" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-[#2457D6]" />;
      case "Megaphone":
        return <Megaphone className="w-6 h-6 text-[#2457D6]" />;
      case "ShoppingBag":
        return <ShoppingBag className="w-6 h-6 text-[#2457D6]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#2457D6]" />;
      case "TrendingUp":
        return <TrendingUp className="w-6 h-6 text-[#2457D6]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#2457D6]" />;
    }
  };

  const filteredServices = useMemo(() => {
    let result = services.filter((s) => {
      const matchSearch =
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === "All" || s.category === selectedCategory;
      return matchSearch && matchCategory;
    });

    if (sortBy === "price-asc") {
      result = [...result].sort((a, b) => (a.startingPrice || 0) - (b.startingPrice || 0));
    } else if (sortBy === "price-desc") {
      result = [...result].sort((a, b) => (b.startingPrice || 0) - (a.startingPrice || 0));
    }

    return result;
  }, [services, searchQuery, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              IEH Advisory Wing
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Business Consultancy Services
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Engage seasoned consultants to structure your startup, optimize operational bottlenecks, and architect sustainable growth strategies.
            </p>
          </div>
        </section>

        {/* Filters and Search Bar */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search consulting services..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 self-end md:self-auto text-xs">
                <span className="text-[#64748B] font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Starting Price: Low to High</option>
                  <option value="price-desc">Starting Price: High to Low</option>
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

        {/* Services Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {paginatedServices.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl max-w-lg mx-auto p-8">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="font-heading font-bold text-lg text-[#172033]">No services found</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Try adjusting your search criteria or resetting category filters.
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between hover:shadow-xl transition-all group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-[#2457D6] group-hover:text-white transition-colors">
                          {getIcon(service.iconName)}
                        </div>
                        <span className="text-[10px] font-bold text-[#2457D6] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {service.category}
                        </span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-[#172033]">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Timeline: {service.deliveryTime}</span>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        {service.startingPrice && (
                          <p className="text-xs text-[#64748B]">
                            From <span className="font-extrabold text-sm text-[#172033]">${service.startingPrice}</span>
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-xs font-bold text-slate-700 hover:text-[#2457D6] px-2 py-1.5"
                        >
                          Details
                        </Link>
                        <Link
                          href={`/consultation?service=${service.slug}`}
                          className="px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
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
