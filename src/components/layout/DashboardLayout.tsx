"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { UserRole } from "@/types";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileCheck,
  CreditCard,
  Bell,
  HelpCircle,
  User,
  LogOut,
  Users,
  GraduationCap,
  Briefcase,
  Layers,
  CalendarCheck,
  Tag,
  Megaphone,
  Star,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronRight,
  Shield,
  Home,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRole?: UserRole;
  title: string;
  subtitle?: string;
}

export function DashboardLayout({
  children,
  allowedRole,
  title,
  subtitle,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout, loginAs } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Role verification check (mock access control)
  // If allowedRole is specified and currentUser doesn't match, we still render a graceful role switcher
  const isAuthorized = !allowedRole || currentUser?.role === allowedRole || currentUser?.role === "admin";

  const getNavItems = () => {
    if (pathname.startsWith("/admin")) {
      return [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "All Users", href: "/admin/users", icon: Users },
        { label: "Students", href: "/admin/students", icon: GraduationCap },
        { label: "Instructors", href: "/admin/instructors", icon: User },
        { label: "Clients", href: "/admin/clients", icon: Briefcase },
        { label: "Courses", href: "/admin/courses", icon: BookOpen },
        { label: "Categories", href: "/admin/categories", icon: Layers },
        { label: "Services", href: "/admin/services", icon: Briefcase },
        { label: "Consultations", href: "/admin/consultations", icon: CalendarCheck },
        { label: "Live Classes", href: "/admin/live-classes", icon: Video },
        { label: "Orders", href: "/admin/orders", icon: CreditCard },
        { label: "Payments", href: "/admin/payments", icon: CreditCard },
        { label: "Coupons", href: "/admin/coupons", icon: Tag },
        { label: "Support Tickets", href: "/admin/support", icon: HelpCircle },
        { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
        { label: "Reviews", href: "/admin/reviews", icon: Star },
        { label: "Reports", href: "/admin/reports", icon: BarChart3 },
        { label: "Settings", href: "/admin/settings", icon: Settings },
      ];
    } else if (pathname.startsWith("/instructor")) {
      return [
        { label: "Overview", href: "/instructor/dashboard", icon: LayoutDashboard },
        { label: "My Courses", href: "/instructor/courses", icon: BookOpen },
        { label: "Enrolled Students", href: "/instructor/students", icon: Users },
        { label: "Live Classes", href: "/instructor/live-classes", icon: Video },
        { label: "Announcements", href: "/instructor/announcements", icon: Megaphone },
        { label: "Profile", href: "/instructor/profile", icon: User },
      ];
    } else if (pathname.startsWith("/client")) {
      return [
        { label: "Overview", href: "/client/dashboard", icon: LayoutDashboard },
        { label: "My Consultations", href: "/client/consultations", icon: CalendarCheck },
        { label: "Orders & Invoices", href: "/client/orders", icon: CreditCard },
        { label: "Support Desk", href: "/client/support", icon: HelpCircle },
        { label: "Client Profile", href: "/client/profile", icon: User },
      ];
    } else {
      // Default: Student
      return [
        { label: "Overview", href: "/student/dashboard", icon: LayoutDashboard },
        { label: "My Courses", href: "/student/my-courses", icon: BookOpen },
        { label: "Live Classes", href: "/student/live-classes", icon: Video },
        { label: "Orders & Receipts", href: "/student/orders", icon: CreditCard },
        { label: "Certificates", href: "/student/certificates", icon: FileCheck },
        { label: "Notifications", href: "/student/notifications", icon: Bell },
        { label: "Support", href: "/student/support", icon: HelpCircle },
        { label: "My Profile", href: "/student/profile", icon: User },
      ];
    }
  };

  const navItems = getNavItems();

  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case "admin":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "instructor":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "client":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "student":
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col antialiased">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle dashboard sidebar"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#2457D6] flex items-center justify-center text-white font-extrabold text-sm shadow-xs">
              IEH
            </div>
            <span className="font-heading font-extrabold text-base text-[#172033] hidden sm:inline">
              Internet Entrepreneurs Hub
            </span>
          </Link>
        </div>

        {/* Right tools */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#2457D6] hover:bg-slate-100 transition-colors"
          >
            <Home className="w-3.5 h-3.5" /> Return to Website
          </Link>

          {/* Quick role switch for demo testing */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase px-1.5">Demo:</span>
            {(["student", "client", "instructor", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  loginAs(r);
                  router.push(`/${r}/dashboard`);
                }}
                className={`px-2 py-0.5 rounded-lg font-medium capitalize text-[11px] transition-all ${
                  currentUser?.role === r
                    ? "bg-[#2457D6] text-white shadow-xs"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* User profile dropdown badge */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <Image
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt={currentUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-[#172033] leading-none">{currentUser.name}</p>
                <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded border uppercase mt-0.5 ${getRoleBadgeColor(currentUser.role)}`}>
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="p-1.5 text-slate-400 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main container with sidebar & content */}
      <div className="flex-1 flex max-w-full overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0 top-16" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          {/* Dashboard Type Header */}
          <div className="p-4 border-b border-slate-100 bg-[#F5F7FB]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Portal</p>
            <h3 className="font-heading font-bold text-sm text-[#172033] capitalize">
              {currentUser?.role || "Student"} Portal
            </h3>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#2457D6] text-white shadow-xs shadow-blue-500/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#172033]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="flex-1 truncate">{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <Link
              href="/support"
              className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-[#2457D6]"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Need Assistance?
            </Link>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-10 bg-slate-900/30 lg:hidden"
          />
        )}

        {/* Content area */}
        <main className="flex-1 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Permission warning if role mismatch */}
          {!isAuthorized ? (
            <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl mb-6">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900 text-sm">Access Role Mismatch</h4>
                  <p className="text-xs text-amber-700 mt-0.5">
                    This section is intended for <strong className="uppercase">{allowedRole}</strong> roles. You are currently browsing as <strong className="uppercase">{currentUser?.role}</strong>. Use the demo switcher above to change roles.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {/* Breadcrumb & Title */}
          <div className="mb-6">
            <h1 className="font-heading font-extrabold text-2xl text-[#172033] tracking-tight">
              {title}
            </h1>
            {subtitle && <p className="text-xs sm:text-sm text-[#64748B] mt-1">{subtitle}</p>}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
