"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useApp } from "@/lib/store";
import {
  Settings,
  Building,
  CreditCard,
  Mail,
  Share2,
  Search,
  Check,
  ShieldCheck,
  Lock,
  Sparkles,
} from "lucide-react";

export default function AdminSettingsPage() {
  const { showNotification } = useApp();
  const [activeTab, setActiveTab] = useState<"general" | "company" | "payment" | "seo">("general");

  // General state
  const [siteName, setSiteName] = useState("Internet Entrepreneurs Hub");
  const [tagline, setTagline] = useState("Learn. Grow. Consult. Succeed.");
  const [supportEmail, setSupportEmail] = useState("support@hub.example.com");

  // Company state
  const [founderName, setFounderName] = useState("Md. Roman Alom");
  const [founderTitle, setFounderTitle] = useState("Founder & CEO");
  const [ctoName, setCtoName] = useState("S M Alif Ahmmed");
  const [ctoTitle, setCtoTitle] = useState("Co-Founder & CTO");
  const [headquarters, setHeadquarters] = useState("Dhaka, Bangladesh");

  // Payment state
  const [stripeKey, setStripeKey] = useState("pk_test_demo_51Mz00IEH_simulation");
  const [bkashMerchant, setBkashMerchant] = useState("01700000000 (Demo Simulation)");
  const [nagadMerchant, setNagadMerchant] = useState("01800000000 (Demo Simulation)");
  const [sandboxMode, setSandboxMode] = useState(true);

  // SEO state
  const [metaTitle, setMetaTitle] = useState("Internet Entrepreneurs Hub (IEH) | Business Consulting & Online Learning");
  const [metaDescription, setMetaDescription] = useState(
    "Internet Entrepreneurs Hub (IEH) is a premier business consultancy and online learning platform. Discover strategic business consulting and structured online education to scale your venture."
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Platform settings saved successfully!");
  };

  return (
    <DashboardLayout
      allowedRole="admin"
      title="Global Platform Configuration"
      subtitle="Supervise organizational metadata, leadership representation, sandbox payment gateways, and SEO directives."
    >
      <div className="space-y-6 max-w-4xl">
        {/* Tab Header */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("general")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "general"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            General & Contact
          </button>
          <button
            onClick={() => setActiveTab("company")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "company"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Corporate & Leadership
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "payment"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Payment Gateways
          </button>
          <button
            onClick={() => setActiveTab("seo")}
            className={`pb-3 px-5 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "seo"
                ? "border-[#2457D6] text-[#2457D6]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            SEO & Discovery
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* TAB 1: General */}
          {activeTab === "general" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-[#172033]">General Brand Details</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Platform Brand Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Corporate Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Support Desk Email</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Company Leadership */}
          {activeTab === "company" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-[#172033]">Corporate Leadership Representation</h3>
              <p className="text-xs text-slate-500">
                Official executive leadership attributes displayed throughout corporate footers, about pages, and certificates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Founder & CEO</label>
                  <input
                    type="text"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Title</label>
                  <input
                    type="text"
                    value={founderTitle}
                    onChange={(e) => setFounderTitle(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Co-Founder & CTO</label>
                  <input
                    type="text"
                    value={ctoName}
                    onChange={(e) => setCtoName(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Title</label>
                  <input
                    type="text"
                    value={ctoTitle}
                    onChange={(e) => setCtoTitle(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Registered Corporate Headquarters</label>
                <input
                  type="text"
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Payment Gateways */}
          {activeTab === "payment" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#172033]">Sandbox Payment Infrastructure</h3>
                  <p className="text-xs text-slate-500">Live checkout simulations for Credit Card, bKash, and Nagad gateways.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sandbox Active</span>
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Stripe Public Sandbox Key</label>
                <input
                  type="text"
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  className="w-full px-4 py-2 font-mono text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">bKash Merchant Demo Account</label>
                  <input
                    type="text"
                    value={bkashMerchant}
                    onChange={(e) => setBkashMerchant(e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Nagad Merchant Demo Account</label>
                  <input
                    type="text"
                    value={nagadMerchant}
                    onChange={(e) => setNagadMerchant(e.target.value)}
                    className="w-full px-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SEO */}
          {activeTab === "seo" && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs">
              <h3 className="font-heading font-bold text-lg text-[#172033]">Search Engine Optimization (SEO)</h3>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Default Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Default Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2457D6]"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#2457D6] text-white font-bold text-xs hover:bg-[#193F9B] transition-colors shadow-xs"
            >
              <Check className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
