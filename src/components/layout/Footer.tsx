"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, ShieldCheck, Mail, Globe, Users } from "lucide-react";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newsletterEmail) return;
      setSubscribed(true);
      setNewsletterEmail("");
    };

    return (
                <footer className="bg-[#132238] text-white pt-16 pb-12 border-t border-slate-800">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Top Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
                      {/* Brand info */}
                      <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#2457D6] flex items-center justify-center text-white font-black text-xl shadow-lg">
                            IEH
                          </div>
                          <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                            Internet Entrepreneurs Hub
                          </span>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                          Your partner in business growth. Combining premier corporate business consulting and structured online education to empower founders, builders, and modern enterprises.
                        </p>

                          {/* Leadership mention as requested */}
                          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1.5 text-xs text-slate-300">
                            <p className="font-bold text-[#E9A23B] flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                              <Users className="w-3.5 h-3.5" /> Platform Leadership
                            </p>
                            <p>
                              <strong className="text-white">Md. Roman Alom</strong> — Founder & CEO
                            </p>
                            <p>
                              <strong className="text-white">S M Alif Ahmmed</strong> — Co-Founder & CTO
                            </p>
                          </div>
                        </div>

                        {/* Links Column 1: Company */}
                        <div>
                          <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
                            Company
                          </h4>
                          <ul className="space-y-2.5 text-sm text-slate-400">
                            <li>
                              <Link href="/about" className="hover:text-white transition-colors">
                                About Us
                              </Link>
                            </li>
                            <li>
                              <Link href="/services" className="hover:text-white transition-colors">
                                Our Services
                              </Link>
                            </li>
                            <li>
                              <Link href="/courses" className="hover:text-white transition-colors">
                                Courses
                              </Link>
                            </li>
                            <li>
                              <Link href="/contact" className="hover:text-white transition-colors">
                                Contact Us
                              </Link>
                            </li>
                            <li>
                              <Link href="/consultation" className="hover:text-white transition-colors">
                                Book Consultation
                              </Link>
                            </li>
                          </ul>
                        </div>

                          {/* Links Column 2: Learning & Support */}
                          <div>
                            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
                              IEH Academy
                            </h4>
                            <ul className="space-y-2.5 text-sm text-slate-400">
                              <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                  Course Catalog
                                </Link>
                              </li>
                              <li>
                                <Link href="/live-classes" className="hover:text-white transition-colors">
                                  Live Classes
                                </Link>
                              </li>
                              <li>
                                <Link href="/instructors" className="hover:text-white transition-colors">
                                  Instructors
                                </Link>
                              </li>
                              <li>
                                <Link href="/login" className="hover:text-white transition-colors">
                                  Student Portal
                                </Link>
                              </li>
                              <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                  FAQ Center
                                </Link>
                              </li>
                              <li>
                                <Link href="/support" className="hover:text-white transition-colors">
                                  Support Desk
                                </Link>
                              </li>
                            </ul>
                          </div>

                          {/* Links Column 3: Legal & Newsletter */}
                          <div>
                              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-4">
                                Stay Informed
                              </h4>
                              <p className="text-xs text-slate-400 mb-3">
                                Subscribe for business growth playbooks and academy course announcements.
                              </p>

                              {subscribed ? (
                                <div className="flex items-center gap-2 p-3 bg-emerald-950/60 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs">
                                  <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0" />
                                  <span>Thank you for subscribing to IEH!</span>
                                </div>
                              ) : (
                                <form onSubmit={handleSubscribe} className="space-y-2">
                                  <div className="relative">
                                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                                    <input
                                      type="email"
                                      value={newsletterEmail}
                                      onChange={(e) => setNewsletterEmail(e.target.value)}
                                      placeholder="Enter business email"
                                      required
                                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                                    />
                                  </div>
                                  <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-[#2457D6] text-white text-xs font-semibold hover:bg-[#193F9B] transition-colors"
                                  >
                                    <Send className="w-3.5 h-3.5" /> Subscribe
                                  </button>
                                </form>
                              )}

                              <div className="mt-4 pt-3 border-t border-slate-800/80">
                                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                  Legal
                                </span>
                                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400">
                                  <Link href="/terms-and-conditions" className="hover:text-white">
                                    Terms
                                  </Link>
                                  <Link href="/privacy-policy" className="hover:text-white">
                                    Privacy
                                  </Link>
                                  <Link href="/refund-policy" className="hover:text-white">
                                    Refunds
                                  </Link>
                                  <Link href="/cookie-policy" className="hover:text-white">
                                    Cookies
                                  </Link>
                                </div>
                              </div>
                          </div>
                        </div>

                          {/* Bottom bar */}
                          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                            <p>© {new Date().getFullYear()} Internet Entrepreneurs Hub (IEH). All rights reserved.</p>
                            <div className="flex items-center gap-4">
                              <span className="inline-flex items-center gap-1.5 text-slate-400">
                                <ShieldCheck className="w-4 h-4 text-[#16A36A]" /> Certified Light Corporate Design
                              </span>
                            </div>
                          </div>
                      </div>
                    </footer>
                    );
}
