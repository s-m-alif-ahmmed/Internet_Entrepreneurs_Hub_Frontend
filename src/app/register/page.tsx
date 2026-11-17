"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  Lock,
  Mail,
  User,
  Phone,
  Building,
  AlertCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    company: "",
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Valid email is required.";
    }
    if (formData.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = "Passwords do not match.";
    }
    if (!formData.acceptedTerms) {
      errs.terms = "You must agree to the Terms & Conditions.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: "student",
        company: formData.company,
      });
      setIsSubmitting(false);
      router.push("/student/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F7FB]">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-xl bg-[#2457D6] flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-600/20">
              IEH
            </div>
            <span className="font-heading font-extrabold text-xl text-[#172033]">
              Internet Entrepreneurs Hub
            </span>
          </Link>
          <h2 className="font-heading font-bold text-2xl text-[#172033] pt-2">
            Create an Account
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Join IEH Academy or register for enterprise consultancy.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                    errors.name ? "border-red-400" : "border-slate-300"
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                    errors.email ? "border-red-400" : "border-slate-300"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.password ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#172033] mb-1.5">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-[#2457D6] ${
                      errors.confirmPassword ? "border-red-400" : "border-slate-300"
                    }`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.acceptedTerms}
                  onChange={(e) => setFormData({ ...formData, acceptedTerms: e.target.checked })}
                  className="mt-0.5 rounded text-[#2457D6] focus:ring-[#2457D6]"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I accept the{" "}
                  <Link href="/terms-and-conditions" target="_blank" className="text-[#2457D6] underline">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" target="_blank" className="text-[#2457D6] underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50 mt-2"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="text-center pt-3 border-t border-slate-100 text-xs text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#2457D6] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
