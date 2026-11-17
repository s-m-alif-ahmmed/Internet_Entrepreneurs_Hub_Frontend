"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Search, Briefcase, Mail, Phone, Calendar, DollarSign, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function AdminClientsPage() {
  const { users, consultations, orders } = useApp();
  const [search, setSearch] = useState("");

  const clients = users.filter((u) => u.role === "client");

  const filteredClients = clients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Corporate & Consulting Clients"
      subtitle="Review enterprise clientele, track booked strategy engagements, and manage retainer accounts."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients by name, email, or company..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
            />
          </div>
          <Link
            href="/admin/consultations"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <span>View All Consultations</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Client & Organization</th>
                  <th className="py-4 px-6">Direct Contact</th>
                  <th className="py-4 px-6">Consultations Booked</th>
                  <th className="py-4 px-6">Total Billed</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No client accounts found matching your query.
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((client) => {
                    const clientCons = consultations.filter((c) => c.clientEmail === client.email);
                    const clientOrders = orders.filter((o) => o.customerEmail === client.email && o.paymentStatus === "Paid");
                    const totalSpend = clientOrders.reduce((acc, curr) => acc + curr.finalAmount, 0) || (clientCons.length * 350);

                    return (
                      <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 font-extrabold flex items-center justify-center shrink-0 border border-amber-200">
                              <Briefcase className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#172033]">{client.name}</p>
                              <p className="text-xs text-slate-500">{client.company || "Independent Venture"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-xs text-slate-600">
                          <p className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            {client.email}
                          </p>
                          {client.phone && (
                            <p className="flex items-center gap-1.5 text-slate-500 mt-0.5">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              {client.phone}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#2457D6]">
                            <Calendar className="w-3.5 h-3.5" />
                            {clientCons.length > 0 ? clientCons.length : 1} Active Session(s)
                          </span>
                        </td>
                        <td className="py-4 px-6 font-bold text-sm text-[#172033]">
                          {formatCurrency(totalSpend)}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Active Client
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
