"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Mail,
  Send,
  CheckCircle,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Building,
  Users,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    inquiryType: "Consultancy Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Valid email is required.";
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              Get in Touch
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              Connect with Internet Entrepreneurs Hub
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Have questions regarding advisory engagements, academy masterclasses, or corporate partnerships? Our executive desk is here to assist.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Left Column: Contact Cards */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-4">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Official Communications
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    We welcome inquiries from founders, prospective students, and international business leaders. Submit your message through the verified portal.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#172033]">Organization</h4>
                      <p className="text-xs text-[#64748B]">Internet Entrepreneurs Hub (IEH)</p>
                      <p className="text-xs text-slate-500 mt-1">
                        Business Consultancy & Online Learning Division
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 pt-3 border-t border-slate-200">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#172033]">Founders & Leadership</h4>
                      <p className="text-xs text-[#64748B]">
                        Md. Roman Alom — Founder & CEO
                      </p>
                      <p className="text-xs text-[#64748B]">
                        S M Alif Ahmmed — Co-Founder & CTO
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2 text-xs text-slate-700">
                  <p className="font-bold text-[#193F9B] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#2457D6]" /> Enterprise Privacy Assurance
                  </p>
                  <p>
                    All messages, pitch proposals, and operational inquiries sent to Internet Entrepreneurs Hub are handled under strict non-disclosure ethics.
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
                  {submitted ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10" />
                      </div>
                      <h3 className="font-heading font-extrabold text-2xl text-[#172033]">
                        Message Dispatched Successfully
                      </h3>
                      <p className="text-sm text-[#64748B] max-w-md mx-auto">
                        Thank you for reaching out to Internet Entrepreneurs Hub. An executive representative will review your message and respond shortly.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: "",
                            email: "",
                            phone: "",
                            subject: "",
                            inquiryType: "Consultancy Inquiry",
                            message: "",
                          });
                        }}
                        className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <h3 className="font-heading font-extrabold text-xl text-[#172033] mb-4">
                        Send an Inquiry
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#172033] mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Your name"
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                              errors.fullName ? "border-red-400" : "border-slate-300"
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#172033] mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@company.com"
                            className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                              errors.email ? "border-red-400" : "border-slate-300"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold text-[#172033] mb-1.5">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#172033] mb-1.5">
                            Inquiry Type
                          </label>
                          <select
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                          >
                            <option value="Consultancy Inquiry">Consultancy Inquiry</option>
                            <option value="Course / Academy Question">Course / Academy Question</option>
                            <option value="Speaking & Live Sessions">Speaking & Live Sessions</option>
                            <option value="General Partnership">General Partnership</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#172033] mb-1.5">
                          Subject (Optional)
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Brief topic of inquiry"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#172033] mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="How can IEH assist you?"
                          className={`w-full p-4 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                            errors.message ? "border-red-400" : "border-slate-300"
                          }`}
                        />
                        {errors.message && (
                          <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          "Sending Message..."
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Inquiry
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
