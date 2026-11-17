"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { SupportTicket } from "@/types";
import {
  HelpCircle,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  X,
  Send,
  MessageSquare,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export default function AdminSupportPage() {
  const { tickets, replyTicket, updateTicketStatus } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = tickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()) ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyText.trim()) return;

    replyTicket(selectedTicket.id, replyText, true);
    setSelectedTicket({
      ...selectedTicket,
      status: "Waiting for Customer",
      responses: [
        ...selectedTicket.responses,
        {
          sender: "IEH Executive Support",
          message: replyText,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
          isStaff: true,
        },
      ],
    });
    setReplyText("");
  };

  const handleStatusChange = (status: SupportTicket["status"]) => {
    if (!selectedTicket) return;
    updateTicketStatus(selectedTicket.id, status);
    setSelectedTicket({ ...selectedTicket, status });
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Customer Care & Support Operations"
      subtitle="Resolve technical inquiries, advise client accounts, and document resolution tickets."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ticket ref, user, or topic..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] text-slate-700"
            >
              <option value="all">All Ticket Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting for Customer">Waiting for Customer</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Ticket Reference</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Subject & Category</th>
                  <th className="py-4 px-6">Priority</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No support tickets match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-[#2457D6]">
                        {ticket.ticketNumber}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-sm text-[#172033]">{ticket.name}</p>
                        <p className="text-xs text-slate-400">{ticket.email}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-xs text-[#172033] max-w-xs truncate">{ticket.subject}</p>
                        <span className="text-[10px] text-slate-500">{ticket.category}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${ticket.priority === "Urgent"
                              ? "bg-rose-50 text-rose-700"
                              : ticket.priority === "High"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-[#2457D6]"
                            }`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${ticket.status === "Resolved"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : ticket.status === "Open"
                                ? "bg-blue-50 text-[#2457D6] border border-blue-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedTicket(ticket)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2457D6] font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Respond</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ticket Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2457D6]">{selectedTicket.ticketNumber}</span>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">{selectedTicket.subject}</h3>
                </div>
                <button onClick={() => setSelectedTicket(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Switcher */}
              <div className="flex items-center justify-between bg-[#F5F7FB] p-3 rounded-xl shrink-0 text-xs">
                <span className="text-slate-500 font-medium">Requester: {selectedTicket.name} ({selectedTicket.email})</span>
                <div className="flex items-center gap-1.5">
                  {(["Open", "In Progress", "Waiting for Customer", "Resolved"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(st)}
                      className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors ${selectedTicket.status === st
                          ? "bg-[#2457D6] text-white"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread history */}
              <div className="space-y-3 overflow-y-auto flex-1 p-2">
                {selectedTicket.responses.map((resp, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1 ${resp.isStaff
                        ? "bg-blue-50/60 border-blue-200 ml-6"
                        : "bg-slate-50 border-slate-200 mr-6"
                      }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className={resp.isStaff ? "text-[#2457D6]" : "text-[#172033]"}>
                        {resp.sender}
                      </span>
                      <span className="text-[10px] text-slate-400 font-normal">{resp.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{resp.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply box */}
              <form onSubmit={handleSendReply} className="space-y-3 shrink-0 pt-2 border-t border-slate-100">
                <textarea
                  rows={3}
                  required
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type an official executive response to the customer..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Staff Reply</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
