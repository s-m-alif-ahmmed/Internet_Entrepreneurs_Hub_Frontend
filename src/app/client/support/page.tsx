"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { HelpCircle, Plus, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function ClientSupportPage() {
  const { tickets, currentUser, replyTicket } = useApp();

  const clientTickets = tickets.filter(
    (t) => t.email === currentUser?.email || t.name === currentUser?.name
  );

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    clientTickets[0]?.id || null
  );
  const [replyMessage, setReplyMessage] = useState("");

  const activeTicket = clientTickets.find((t) => t.id === selectedTicketId) || clientTickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !activeTicket) return;
    replyTicket(activeTicket.id, replyMessage, false);
    setReplyMessage("");
  };

  return (
    <DashboardLayout
      allowedRole="client"
      title="Client Concierge & Support"
      subtitle="Direct communication line with IEH consulting coordinators."
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-xs text-[#64748B]">Active Client Tickets</p>
          <Link
            href="/support"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B]"
          >
            <Plus className="w-3.5 h-3.5" /> Submit Concierge Request
          </Link>
        </div>

        {clientTickets.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-[#172033]">
              No Tickets Currently Open
            </h3>
            <p className="text-xs text-[#64748B]">
              Need priority assistance regarding your advisory deliverables? Reach out anytime.
            </p>
            <Link
              href="/support"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
            >
              Open Client Ticket
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
              {clientTickets.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`w-full p-4 text-left transition-colors flex flex-col space-y-1.5 ${activeTicket?.id === t.id
                      ? "bg-blue-50/60 border-l-4 border-[#2457D6]"
                      : "hover:bg-slate-50"
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
                  <span className="text-[10px] text-slate-400">{t.createdAt}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              {activeTicket ? (
                <>
                  <div className="p-5 border-b border-slate-200 bg-slate-50">
                    <span className="font-mono text-xs font-bold text-[#2457D6]">
                      {activeTicket.ticketNumber}
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#172033] mt-0.5">
                      {activeTicket.subject}
                    </h3>
                  </div>

                  <div className="p-5 space-y-4 max-h-[350px] overflow-y-auto">
                    {activeTicket.responses.map((resp, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl text-xs space-y-1 ${resp.isStaff
                            ? "bg-blue-50 border border-blue-200 ml-4"
                            : "bg-slate-100 mr-4"
                          }`}
                      >
                        <p className="font-bold text-[#172033]">{resp.sender}</p>
                        <p className="text-slate-700">{resp.message}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 flex gap-2">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Reply to consultant..."
                      className="flex-1 px-4 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2457D6] text-white rounded-xl text-xs font-bold"
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
