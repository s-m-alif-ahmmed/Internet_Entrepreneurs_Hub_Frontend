"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import {
  Calendar,
  CheckCircle,
  ShieldCheck,
  Building,
  User,
  Mail,
  Phone,
  Info,
} from "lucide-react";
import Link from "next/link";

function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const prefillServiceSlug = searchParams.get("service") || "";

  const { services, bookConsultation, currentUser } = useApp();

  const [formData, setFormData] = useState({
    clientName: currentUser?.name || "",
    clientEmail: currentUser?.email || "",
    clientPhone: currentUser?.phone || "",
    businessName: currentUser?.company || "",
    serviceSlug: prefillServiceSlug,
    preferredDate: "",
    preferredTime: "14:00 UTC",
    consultationType: "Online" as "Online" | "In Person" | "To Be Discussed",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.clientName.trim()) errs.clientName = "Full name is required.";
    if (!formData.clientEmail.trim()) {
      errs.clientEmail = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      errs.clientEmail = "Please enter a valid email address.";
    }
    if (!formData.clientPhone.trim()) errs.clientPhone = "Phone number is required.";
    if (!formData.preferredDate) errs.preferredDate = "Please select a preferred date.";
    if (!formData.message.trim() || formData.message.length < 15) {
      errs.message = "Please provide at least 15 characters describing your requirements.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedService = services.find((s) => s.slug === formData.serviceSlug) || services[0];

      const ref = bookConsultation({
        clientName: formData.clientName,
        clientEmail: formData.clientEmail,
        clientPhone: formData.clientPhone,
        businessName: formData.businessName,
        serviceId: selectedService.id,
        serviceTitle: selectedService.title,
        category: selectedService.category,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        consultationType: formData.consultationType,
        message: formData.message,
      });

      setIsSubmitting(false);
      setSuccessRef(ref);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {successRef ? (
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#16A36A] uppercase tracking-wider">
              Booking Request Received
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033]">
              Consultation Scheduled for Review
            </h2>
            <p className="text-sm text-[#64748B] max-w-lg mx-auto">
              Thank you, <strong className="text-slate-800">{formData.clientName}</strong>. Your advisory consultation request has been submitted to the IEH leadership team.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-block text-left">
            <p className="text-xs text-[#64748B] font-medium">Consultation Reference Number:</p>
            <p className="text-xl font-mono font-extrabold text-[#2457D6] mt-0.5">{successRef}</p>
          </div>

          <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl text-left max-w-lg mx-auto text-xs text-slate-700 space-y-1">
            <p className="font-bold text-[#193F9B] flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#2457D6]" /> Important Confirmation Notice
            </p>
            <p>
              All consultation bookings are subject to formal confirmation by IEH advisors based on scheduling availability. Our team will verify your request and send calendar coordinates via email within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
            <Link
              href="/client/consultations"
              className="px-6 py-3 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
            >
              View in Client Portal
            </Link>
            <button
              onClick={() => {
                setSuccessRef(null);
                setFormData({
                  clientName: "",
                  clientEmail: "",
                  clientPhone: "",
                  businessName: "",
                  serviceSlug: "",
                  preferredDate: "",
                  preferredTime: "14:00 UTC",
                  consultationType: "Online",
                  message: "",
                });
              }}
              className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              Book Another Consultation
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="p-6 sm:p-10 bg-[#F5F7FB] border-b border-slate-200 space-y-2">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              Direct Advisory
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#172033]">
              Request a Business Consultation
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B]">
              Share your company objectives and schedule a confidential advisory working session with IEH business strategists.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.clientName ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.clientName && (
                  <p className="text-xs text-red-500 mt-1">{errors.clientName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    placeholder="sarah@company.com"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.clientEmail ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.clientEmail && (
                  <p className="text-xs text-red-500 mt-1">{errors.clientEmail}</p>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Business Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.clientPhone ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.clientPhone && (
                  <p className="text-xs text-red-500 mt-1">{errors.clientPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Business Name (Optional)
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Zenith Commerce Ltd."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                  />
                </div>
              </div>
            </div>

            {/* Row 3: Service Selection */}
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Target Consulting Service
              </label>
              <select
                value={formData.serviceSlug}
                onChange={(e) => setFormData({ ...formData, serviceSlug: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
              >
                <option value="">General Executive Consultation</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.title} ({s.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4: Preferred Date, Time, Type */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.preferredDate ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                >
                  <option value="10:00 UTC">10:00 UTC (Morning)</option>
                  <option value="14:00 UTC">14:00 UTC (Afternoon)</option>
                  <option value="17:00 UTC">17:00 UTC (Evening)</option>
                  <option value="Flexible">Flexible / Open</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Consultation Format
                </label>
                <select
                  value={formData.consultationType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consultationType: e.target.value as typeof formData.consultationType,
                    })
                  }
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                >
                  <option value="Online">Online Video Call</option>
                  <option value="In Person">In Person (By Arrangement)</option>
                  <option value="To Be Discussed">To Be Discussed</option>
                </select>
              </div>
            </div>

            {/* Row 5: Message / Requirements */}
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Business Context & Specific Requirements <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe your business model, current challenges, and goals for this advisory engagement..."
                className={`w-full p-4 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                  errors.message ? "border-red-400" : "border-slate-300"
                }`}
              />
              {errors.message && (
                <p className="text-xs text-red-500 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#64748B] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#16A36A]" /> All consultations subject to NDA.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors disabled:opacity-50 shadow-md shadow-blue-500/20"
              >
                {isSubmitting ? "Submitting Request..." : "Request Consultation"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Loading consultation form...</div>}>
          <ConsultationFormContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
