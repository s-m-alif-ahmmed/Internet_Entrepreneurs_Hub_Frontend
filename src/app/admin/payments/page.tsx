"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { CreditCard, Search, DollarSign, ArrowUpRight, CheckCircle, RefreshCcw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminPaymentsPage() {
  const { orders } = useApp();
  const [search, setSearch] = useState("");
  const [methodFilter, setMethodFilter] = useState("all");

  const totalCollected = orders
    .filter((o) => o.paymentStatus === "Paid")
    .reduce((acc, curr) => acc + curr.finalAmount, 0);

  const pendingSettlement = orders
    .filter((o) => o.paymentStatus === "Pending")
    .reduce((acc, curr) => acc + curr.finalAmount, 0);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(search.toLowerCase());
    const matchesMethod = methodFilter === "all" || o.paymentMethod.toLowerCase() === methodFilter.toLowerCase();
    return matchesSearch && matchesMethod;
  });

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Settlement & Payment Gateway Ledger"
      subtitle="Monitor merchant gateway settlements, credit card transactions, and automated receipts."
    >
      <div className="space-y-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Settled Gross Volume</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {formatCurrency(totalCollected)}
              </h3>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <RefreshCcw className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Pending Settlements</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">
                {formatCurrency(pendingSettlement)}
              </h3>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2457D6] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-[#64748B] font-medium">Recorded Transactions</p>
              <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-0.5">{orders.length}</h3>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference, customer, or email..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["all", "card", "bkash", "nagad"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMethodFilter(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-colors ${
                  methodFilter === m
                    ? "bg-[#2457D6] text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Transaction Ref</th>
                  <th className="py-4 px-6">Payer Account</th>
                  <th className="py-4 px-6">Method / Gateway</th>
                  <th className="py-4 px-6">Settlement Date</th>
                  <th className="py-4 px-6">Net Amount</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-[#2457D6]">
                      {o.referenceNumber}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-sm text-[#172033]">{o.customerName}</p>
                      <p className="text-xs text-slate-400">{o.customerEmail}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        {o.paymentMethod}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-500 font-mono">
                      {o.createdAt}
                    </td>
                    <td className="py-4 px-6 font-bold text-sm text-[#172033]">
                      {formatCurrency(o.finalAmount)}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          o.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        {o.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
