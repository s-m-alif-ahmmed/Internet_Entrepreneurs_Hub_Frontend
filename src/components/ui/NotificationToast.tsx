"use client";

import React from "react";
import { useApp } from "@/lib/store";
import { CheckCircle2, X } from "lucide-react";

export function NotificationToast() {
  const { notification, showNotification } = useApp();

  if (!notification) return null;

  return (
    <aside
      aria-label="Notification alert"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#132238] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md"
    >
      <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0" />
      <p className="text-sm font-medium flex-1 text-slate-100">{notification}</p>
      <button
        onClick={() => showNotification("")}
        className="text-slate-400 hover:text-white transition-colors p-1"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </aside>
  );
}
