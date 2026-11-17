"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { CreditCard, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function StudentOrdersPage() {
  const { orders, currentUser } = useApp();

  const studentOrders = orders.filter(
    (o) => o.customerEmail === currentUser?.email || o.customerName === currentUser?.name
  );

  return (
    <DashboardLayout
      allowedRole="student"
      title="Orders & Receipts"
      subtitle="Review course enrollments, invoices, and payment receipts."
    >
      <div className="space-y-6">
        {studentOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <CreditCard className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-heading font-bold text-base text-[#172033]">
              No Orders on Record
            </h3>
            <p className="text-xs text-[#64748B]">
              You haven&apos;t enrolled in any paid courses or consultation packages yet.
            </p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F5F7FB] text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-4">Reference</th>
                    <th className="p-4">Item Enrolled</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {studentOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#2457D6]">
                        {ord.referenceNumber}
                      </td>
                      <td className="p-4 font-semibold text-[#172033] max-w-xs truncate">
                        {ord.itemTitle}
                      </td>
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
        )}
      </div>
    </DashboardLayout>
  );
}
