"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { INITIAL_FAQS } from "@/lib/mock-data";
import {
  Search,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Filter,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const categories = [
    "All",
    "General Information",
    "Consultancy Services",
    "Courses and Enrollment",
    "Payments",
    "Live Classes",
    "Student Accounts",
    "Refunds",
    "Technical Support",
  ];

  const filteredFaqs = useMemo(() => {
    return INITIAL_FAQS.filter((faq) => {
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "All" || faq.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              Knowledge Base
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Find transparent, detailed answers regarding our consultancy engagements, online learning academy, live broadcasts, and customer policies.
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto pt-4 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-7 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search answers..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-[#2457D6] bg-white"
              />
            </div>
          </div>
        </section>

        {/* Categories & Accordions */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            {/* Category tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
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

            {/* Accordion list */}
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl p-6">
                <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="font-heading font-bold text-base text-[#172033]">
                  No matching questions found
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Try another keyword or reach out directly to customer support.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = expandedId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-heading font-bold text-sm sm:text-base text-[#172033] pr-4">
                          {faq.question}
                        </span>
                        <div className="shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-[#2457D6]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F5F7FB]/50">
                          <p className="pt-3">{faq.answer}</p>
                          <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Category: {faq.category}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Still have questions */}
            <div className="p-8 rounded-3xl bg-[#F5F7FB] border border-slate-200 text-center space-y-3">
              <h3 className="font-heading font-bold text-lg text-[#172033]">
                Still Have Questions?
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto">
                Can’t find what you’re looking for? Contact our customer support team or submit a dedicated ticket.
              </p>
              <div className="pt-2">
                <Link
                  href="/support"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                >
                  Visit Support Center <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
