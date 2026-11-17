"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import { Order } from "@/types";
import {
  CreditCard,
  Search,
  Filter,
  Eye,
  CheckCircle,
  X,
  FileText,
  DollarSign,
  Download,
  Calendar,
  User,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.referenceNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.itemTitle.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdatePayment = (id: string, paymentStatus: Order["paymentStatus"]) => {
    updateOrderStatus(id, paymentStatus === "Paid" ? "Completed" : "Processing", paymentStatus);
    if (selectedOrder) {
      setSelectedOrder({
        ...selectedOrder,
        paymentStatus,
        orderStatus: paymentStatus === "Paid" ? "Completed" : "Processing",
      });
    }
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Platform Transaction & Order Ledger"
      subtitle="Examine customer invoices, audit checkout payments, and manage fulfillment receipts."
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
                placeholder="Search reference, customer, or product..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] focus:ring-1 focus:ring-[#2457D6]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6] text-slate-700"
            >
              <option value="all">All Payment Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F5F7FB] border-b border-slate-200 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Order Reference</th>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Product / Program</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No customer orders match your query.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-mono text-xs font-bold text-[#2457D6]">
                        {order.referenceNumber}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-sm text-[#172033]">{order.customerName}</p>
                        <p className="text-xs text-slate-400">{order.customerEmail}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-xs text-[#172033] max-w-xs truncate">{order.itemTitle}</p>
                        <span className="text-[10px] text-slate-500 capitalize">{order.itemType}</span>
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-500">
                        {order.createdAt}
                      </td>
                      <td className="py-4 px-6 font-bold text-sm text-[#172033]">
                        {formatCurrency(order.finalAmount)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            order.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : order.paymentStatus === "Pending"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2457D6] font-bold text-xs hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="font-mono text-xs font-bold text-[#2457D6]">{selectedOrder.referenceNumber}</span>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">Order Receipt & Invoice</h3>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F5F7FB] p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Customer:</span>
                  <span className="font-bold text-slate-800">{selectedOrder.customerName} ({selectedOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Item:</span>
                  <span className="font-semibold text-slate-800">{selectedOrder.itemTitle}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Payment Gateway:</span>
                  <span className="font-semibold text-slate-800">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Gross Subtotal:</span>
                  <span>{formatCurrency(selectedOrder.amount)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount:</span>
                    <span>-{formatCurrency(selectedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#172033] pt-2 border-t border-slate-200">
                  <span>Total Amount Paid:</span>
                  <span className="text-[#2457D6]">{formatCurrency(selectedOrder.finalAmount)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdatePayment(selectedOrder.id, "Paid")}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                  >
                    Mark Paid
                  </button>
                  <button
                    onClick={() => handleUpdatePayment(selectedOrder.id, "Refunded")}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200"
                  >
                    Issue Refund
                  </button>
                </div>
                <button
                  onClick={() => alert(`Simulated downloading PDF Invoice for ${selectedOrder.referenceNumber}`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2457D6] text-white text-xs font-bold hover:bg-[#193F9B] transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
