"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { CreditCard, CheckCircle2 } from "lucide-react";

export default function ClientOrdersPage() {
  const { orders, currentUser } = useApp();

  const clientOrders = orders.filter(
    (o) => o.customerEmail === currentUser?.email || o.customerName === currentUser?.name
  );

  return (
    <DashboardLayout
      allowedRole="client"
      title="Client Invoices & Orders"
      subtitle="View consulting service retainers, receipts, and payment transactions."
    >
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Method</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {clientOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#2457D6]">
                      {ord.referenceNumber}
                    </td>
                    <td className="p-4 font-semibold text-[#172033]">{ord.itemTitle}</td>
                    <td className="p-4 text-slate-500">{ord.createdAt}</td>
                    <td className="p-4 font-bold text-[#172033]">${ord.finalAmount}</td>
                    <td className="p-4 text-slate-500">{ord.paymentMethod}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#16A36A] font-bold text-[10px] uppercase">
                        <CheckCircle2 className="w-3 h-3" /> {ord.paymentStatus}
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
