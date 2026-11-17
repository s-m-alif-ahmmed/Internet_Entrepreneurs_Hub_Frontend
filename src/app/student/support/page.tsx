"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { HelpCircle, Plus, Send, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";

export default function StudentSupportPage() {
  const { tickets, currentUser, submitTicket, replyTicket } = useApp();

  const studentTickets = tickets.filter(
    (t) => t.email === currentUser?.email || t.name === currentUser?.name
  );

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    studentTickets[0]?.id || null
  );
  const [replyMessage, setReplyMessage] = useState("");

  const activeTicket = studentTickets.find((t) => t.id === selectedTicketId) || studentTickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;
    replyTicket(activeTicket.id, replyMessage, false);
    setReplyMessage("");
  };

  return (
    <DashboardLayout
      allowedRole="student"
      title="Student Help & Support Desk"
      subtitle="Track active inquiries, submit help tickets, and converse directly with support agents."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#64748B]">
            Showing tickets linked to <strong className="text-slate-800">{currentUser?.email}</strong>
          </p>
          <Link
            href="/support"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B]"
          >
            <Plus className="w-3.5 h-3.5" /> Open New Ticket
          </Link>
        </div>

        {studentTickets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-[#172033]">
              No Support Tickets Active
            </h3>
            <p className="text-xs text-[#64748B]">
              Need help with a video lesson or certificate? Submit a ticket anytime.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
            >
              Open Support Ticket
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Ticket List: Left 5 cols */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <span className="text-xs font-bold text-[#172033]">Your Tickets</span>
              </div>
              {studentTickets.map((t) => {
                const isSelected = activeTicket?.id === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`w-full p-4 text-left transition-colors flex flex-col space-y-1.5 ${isSelected ? "bg-blue-50/60 border-l-4 border-[#2457D6]" : "hover:bg-slate-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-[#2457D6]">
                        {t.ticketNumber}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {t.status}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-xs text-[#172033] line-clamp-1">
                      {t.subject}
                    </h4>
                    <p className="text-[11px] text-[#64748B] line-clamp-1">{t.description}</p>
                    <span className="text-[10px] text-slate-400 pt-1">{t.createdAt}</span>
                  </button>
                );
              })}
            </div>

            {/* Conversation View: Right 7 cols */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              {activeTicket ? (
                <>
                  <div className="p-5 border-b border-slate-200 bg-slate-50 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs text-[#2457D6]">
                        {activeTicket.ticketNumber}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-[#193F9B]">
                        Status: {activeTicket.status}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm text-[#172033]">
                      {activeTicket.subject}
                    </h3>
                    <p className="text-[11px] text-[#64748B]">Category: {activeTicket.category}</p>
                  </div>

                  {/* Messages */}
                  <div className="p-5 space-y-4 max-h-[380px] overflow-y-auto">
                    {activeTicket.responses.map((resp, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl text-xs space-y-1 ${resp.isStaff
                            ? "bg-blue-50 border border-blue-200/60 ml-4"
                            : "bg-slate-100 text-slate-800 mr-4"
                          }`}
                      >
                        <div className="flex justify-between font-bold text-[#172033]">
                          <span>{resp.sender}</span>
                          <span className="text-[10px] text-slate-400 font-normal">
                            {resp.timestamp}
                          </span>
                        </div>
                        <p className="leading-relaxed text-slate-700">{resp.message}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply form */}
                  <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 flex gap-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type a message to customer support..."
                      className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2457D6] text-white rounded-xl text-xs font-bold hover:bg-[#193F9B] transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
