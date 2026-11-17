"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setResent(true);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F5F7FB]">
      <div className="max-w-md w-full space-y-6 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-xl bg-[#2457D6] flex items-center justify-center text-white font-extrabold text-lg">
            IEH
          </div>
          <span className="font-heading font-extrabold text-xl text-[#172033]">
            Internet Entrepreneurs Hub
          </span>
        </Link>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-5">
          <div className="w-14 h-14 bg-blue-50 text-[#2457D6] rounded-full flex items-center justify-center mx-auto">
            <Mail className="w-7 h-7" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
            Verify Your Email
          </h2>

          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
            We sent a verification link to your registered email address. Please click the link inside to activate your student/client account.
          </p>

          {resent && (
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex items-center justify-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A]" /> A fresh verification link was dispatched!
            </div>
          )}

          <div className="pt-2 space-y-3">
            <button
              onClick={handleResend}
              disabled={resending}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`} />
              {resending ? "Resending..." : "Resend Verification Email"}
            </button>

            <Link
              href="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
            >
              Proceed to Sign In <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
