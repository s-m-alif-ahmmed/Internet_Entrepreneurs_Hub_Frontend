"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { UserRole } from "@/types";
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginAs, users } = useApp();

  const [email, setEmail] = useState("student@ieh.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDashboardUrl = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "student":
      default:
        return "/student/dashboard";
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      const foundUser = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          (u.role === "student" || u.role === "admin")
      );
      if (foundUser) {
        loginAs(foundUser.role);
        setIsLoading(false);
        router.push(getDashboardUrl(foundUser.role));
      } else {
        // Fallback demo login
        loginAs("student");
        setIsLoading(false);
        router.push("/student/dashboard");
      }
    }, 600);
  };

  const handleQuickLogin = (role: UserRole) => {
    loginAs(role);
    router.push(getDashboardUrl(role));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F7FB]">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
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
            Welcome Back
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Sign in to access your Student or Admin dashboard.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#172033] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#172033]">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#2457D6] hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#2457D6] focus:ring-[#2457D6]"
                />
                <span className="text-xs text-slate-600">Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In to Account"}
            </button>
          </form>

          {/* Quick Demo Logins Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E9A23B]" /> Fast Demo Sign-In
            </span>
            <p className="text-[11px] text-[#64748B]">
              Click any role to log in with simulated credentials:
            </p>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {[
                { role: "student", label: "Student Demo" },
                { role: "admin", label: "Admin Demo" },
              ].map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleQuickLogin(item.role as UserRole)}
                  className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:border-[#2457D6] hover:text-[#2457D6] transition-all text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-bold text-[#2457D6] hover:underline">
              Register here
            </Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          <Link href="/" className="hover:text-slate-600">← Back to Homepage</Link>
        </p>
      </div>
    </div>
  );
}
