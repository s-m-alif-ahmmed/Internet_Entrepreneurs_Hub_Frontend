"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Mail,
  Send,
  CheckCircle,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
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
              Have questions regarding advisory engagements, academy masterclasses, or corporate partnerships? Reach out to our executive desk or send us an inquiry.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Information Place (Office Address, Contact Number, Opening Hours) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-3">
                  <span className="inline-block text-xs font-bold text-[#2457D6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                    Direct Contact
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Office Information
                  </h2>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    Have a question or planning to visit? Find our executive office details, direct contact numbers, and working hours below.
                  </p>
                </div>

                  {/* Office Address Card with Embedded Google Map */}
                  <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 hover:border-blue-200 transition-colors space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-100/70 text-[#2457D6] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-sm text-[#172033]">Office Address</h4>
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=Link+Road,+Gulshan,+Dhaka+-+1212"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2457D6] hover:underline"
                          >
                            Directions <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-xs font-medium text-[#2457D6] mt-0.5">
                          IEH Executive Headquarters
                        </p>
                          <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed font-medium">
                            Link Road, Gulshan, Dhaka - 1212, Bangladesh
                          </p>
                      </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
                      <iframe
                        title="Google Map - Link Road, Gulshan, Dhaka - 1212"
                        src="https://maps.google.com/maps?q=Link%20Road,%20Gulshan,%20Dhaka%20-%201212&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-48 border-0"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>

                  {/* Contact Numbers Card */}
                  <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 hover:border-emerald-200 transition-colors space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-emerald-100/70 text-[#16A36A] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <h4 className="font-bold text-sm text-[#172033]">Contact Number</h4>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                            <span className="text-[#64748B]">Primary Helpline:</span>
                            <a
                              href="tel:+8801800123456"
                              className="font-semibold text-[#172033] hover:text-[#2457D6] transition-colors"
                            >
                              +880 1800-123456
                            </a>
                          </div>
                          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                            <span className="text-[#64748B]">WhatsApp Line:</span>
                            <a
                              href="https://wa.me/8801700987654"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-semibold text-[#16A36A] hover:underline transition-colors"
                            >
                              +880 1700-987654
                            </a>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-[#64748B]">Email Desk:</span>
                            <a
                              href="mailto:contact@entrepreneurshub.com"
                              className="font-semibold text-[#2457D6] hover:underline transition-colors"
                            >
                              contact@entrepreneurshub.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours Card */}
                  <div className="p-6 rounded-2xl bg-[#F5F7FB] border border-slate-200 hover:border-amber-200 transition-colors space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl bg-amber-100/70 text-[#E9A23B] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0 space-y-2.5">
                        <h4 className="font-bold text-sm text-[#172033]">Opening Hours</h4>

                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                            <span className="text-[#64748B]">Sunday – Thursday:</span>
                            <span className="font-semibold text-[#172033]">9:00 AM – 6:00 PM (GMT+6)</span>
                          </div>
                          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                            <span className="text-[#64748B]">Saturday:</span>
                            <span className="font-semibold text-[#172033]">
                              10:00 AM – 4:00 PM <span className="text-[11px] text-[#64748B] font-normal">(Advisory)</span>
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                            <span className="text-[#64748B]">Friday:</span>
                            <span className="font-semibold text-rose-500">Closed (Weekly Holiday)</span>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-[#64748B]">Digital Platform:</span>
                            <span className="font-semibold text-[#16A36A]">Active 24/7</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                        >
                          Send Another Inquiry
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                            Send an Inquiry
                          </h3>
                          <p className="text-xs text-[#64748B] mt-1">
                            Fill out the form below and our team will get back to you within 24 hours.
                          </p>
                        </div>

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
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${errors.fullName ? "border-red-400" : "border-slate-300"
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
                              className={`w-full px-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${errors.email ? "border-red-400" : "border-slate-300"
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
                              placeholder="+880 1800-000000"
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
                              <option value="Membership Package Question">Membership Package Question</option>
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
                            className={`w-full p-4 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${errors.message ? "border-red-400" : "border-slate-300"
                              }`}
                          />
                          {errors.message && (
                            <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
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
