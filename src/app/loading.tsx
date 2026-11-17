import React from "react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#2457D6] flex items-center justify-center text-white font-extrabold text-base animate-pulse shadow-md">
          IEH
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-[#2457D6] animate-bounce" />
        </div>
        <p className="text-xs font-semibold text-[#64748B]">Loading workspace...</p>
      </div>
    </div>
  );
}
