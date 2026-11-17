"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useApp } from "@/lib/store";
import {
  HelpCircle,
  Search,
  BookOpen,
  Send,
  CheckCircle,
  FileText,
  AlertCircle,
  LifeBuoy,
  Paperclip,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { TicketPriority } from "@/types";

export default function SupportPage() {
  const { submitTicket, currentUser } = useApp();

  const [ticketForm, setTicketForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    category: "Courses and Enrollment",
    priority: "Medium" as TicketPriority,
    subject: "",
    description: "",
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketForm.name.trim() || !ticketForm.email.trim() || !ticketForm.description.trim()) {
      setErrorMsg("Please complete all required fields.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);

    setTimeout(() => {
      const ref = submitTicket({
        name: ticketForm.name,
        email: ticketForm.email,
        category: ticketForm.category,
        priority: ticketForm.priority,
        subject: ticketForm.subject || "General Support Request",
        description: ticketForm.description,
      });
      setIsSubmitting(false);
      setSubmittedRef(ref);
    }, 700);
  };

  const supportCategories = [
    { title: "Courses & Enrollment", count: "12 articles", icon: BookOpen },
    { title: "Consultation Bookings", count: "8 articles", icon: FileText },
    { title: "Live Classes & Streaming", count: "6 articles", icon: LifeBuoy },
    { title: "Student Accounts & Billing", count: "9 articles", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-[#F5F7FB] border-b border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-bold text-[#2457D6] uppercase tracking-wider block">
              Support Center
            </span>
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#172033] tracking-tight">
              How Can We Help You Today?
            </h1>
            <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto">
              Search helpful guides, review common troubleshooting steps, or create an official support ticket.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-lg text-[#172033] mb-6">
              Browse Help Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.title}
                    href="/faq"
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-[#2457D6] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center mb-3 group-hover:bg-[#2457D6] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-sm text-[#172033]">{cat.title}</h3>
                    <p className="text-xs text-[#64748B] mt-0.5">{cat.count}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support Form Section */}
        <section className="py-16 bg-[#F5F7FB]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
                <h3 className="font-heading font-extrabold text-xl text-[#172033]">
                  Submit a Support Ticket
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Our dedicated customer success representatives respond during standard operating hours.
                </p>
              </div>

              {submittedRef ? (
                <div className="p-8 sm:p-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-100 text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Ticket Registered Successfully
                  </h4>
                  <p className="text-sm text-[#64748B] max-w-md mx-auto">
                    Your inquiry has been assigned to our customer support desk.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block font-mono text-sm font-bold text-[#2457D6]">
                    Ticket Number: {submittedRef}
                  </div>
                  <div className="pt-4 flex justify-center gap-3">
                    <Link
                      href="/student/support"
                      className="px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B]"
                    >
                      View in Support Portal
                    </Link>
                    <button
                      onClick={() => {
                        setSubmittedRef(null);
                        setTicketForm({
                          name: "",
                          email: "",
                          category: "Courses and Enrollment",
                          priority: "Medium",
                          subject: "",
                          description: "",
                        });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                    >
                      Open Another Ticket
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
                  {errorMsg && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1.5">
                        Issue Category
                      </label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({ ...ticketForm, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                      >
                        <option value="Courses and Enrollment">Courses and Enrollment</option>
                        <option value="Consultancy Bookings">Consultancy Bookings</option>
                        <option value="Live Classes">Live Classes</option>
                        <option value="Certificate Verification">Certificate Verification</option>
                        <option value="Billing & Orders">Billing & Orders</option>
                        <option value="Other">Other Technical Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#172033] mb-1.5">
                        Priority Level
                      </label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) =>
                          setTicketForm({
                            ...ticketForm,
                            priority: e.target.value as TicketPriority,
                          })
                        }
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium (Standard)</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                      placeholder="Brief description of the problem"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#172033] mb-1.5">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                      placeholder="Please include any error messages, relevant course or consultation reference numbers..."
                      className="w-full p-4 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                  </div>

                  <div className="p-3 border border-dashed border-slate-300 rounded-xl flex items-center justify-between text-xs text-[#64748B]">
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-slate-400" />
                      <span>Optional Attachments (Screenshots or Logs)</span>
                    </div>
                    <span className="font-semibold text-slate-500">Max 5MB (Demo UI)</span>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting Ticket..." : "Submit Ticket"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
