import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-[#132238] text-white py-2 px-4 text-xs font-medium border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap text-center">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2457D6] text-[11px] font-semibold tracking-wide">
          <Sparkles className="w-3 h-3 text-[#E9A23B]" /> NEW
        </span>
        <span className="text-slate-200">
          Welcome to Internet Entrepreneurs Hub — Your Partner in Business Growth & Practical Online Learning.
        </span>
        <Link
          href="/live-classes"
          className="text-[#E9A23B] hover:text-white inline-flex items-center gap-1 underline underline-offset-2 transition-colors ml-1"
        >
          View Live Classes <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
