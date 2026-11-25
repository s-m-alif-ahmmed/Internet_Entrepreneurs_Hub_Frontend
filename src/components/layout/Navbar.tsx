"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/lib/store";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Calendar,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const pathname = usePathname();
  const { currentUser, logout, loginAs } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Membership", href: "/membership" },
    { label: "Blogs", href: "/blogs" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const getDashboardHref = (role: string) => {
    switch (role) {
      case "admin":
        return "/admin/dashboard";
      case "student":
      default:
        return "/student/dashboard";
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-white ${isScrolled ? "shadow-md border-b border-slate-200/80" : "border-b border-slate-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Short Logo */}
          <Link href="/" className="flex items-center shrink-0 group" aria-label="Internet Entrepreneurs Hub">
            <div className="w-11 h-11 rounded-xl bg-[#2457D6] flex items-center justify-center text-white font-extrabold text-xl shadow-md shadow-blue-600/20 group-hover:bg-[#193F9B] transition-colors shrink-0">
              IEH
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${isActive
                    ? "text-[#2457D6] bg-blue-50/70"
                    : "text-slate-600 hover:text-[#172033] hover:bg-slate-50"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {currentUser ? (
              <div className="relative shrink-0">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 xl:px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-200 shrink-0">
                    <Image
                      src={
                        currentUser.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      }
                      alt={currentUser.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left whitespace-nowrap shrink-0">
                    <span className="block text-xs font-bold text-[#172033] leading-tight whitespace-nowrap">
                      {currentUser.name}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-[#172033] truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href={getDashboardHref(currentUser.role)}
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2457D6] whitespace-nowrap"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#2457D6] shrink-0" />
                        <span>{currentUser.role.toUpperCase()} Dashboard</span>
                      </Link>
                    </div>

                    {/* Role quick switcher for testing */}
                    <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 whitespace-nowrap">
                        Switch Demo Role:
                      </p>
                      <div className="grid grid-cols-2 gap-1 text-[11px]">
                        {(["student", "admin"] as const).map((r) => (
                          <button
                            key={r}
                            onClick={() => {
                              loginAs(r);
                              setUserDropdownOpen(false);
                            }}
                            className={`px-2 py-1 rounded text-left font-medium capitalize whitespace-nowrap ${currentUser.role === r
                              ? "bg-[#2457D6] text-white"
                              : "text-slate-600 hover:bg-white hover:text-slate-900"
                              }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-semibold text-[#DC4545] hover:bg-red-50 whitespace-nowrap"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/login"
                  className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#2457D6] hover:bg-slate-50 border border-slate-200 transition-colors whitespace-nowrap shrink-0"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 rounded-xl text-xs xl:text-sm font-bold text-[#2457D6] bg-blue-50/70 hover:bg-blue-100 border border-blue-200/80 transition-colors whitespace-nowrap shrink-0"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Primary CTA */}
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2457D6] text-white text-sm font-bold shadow-md shadow-blue-500/20 hover:bg-[#193F9B] transition-all transform active:scale-95 whitespace-nowrap shrink-0"
            >
              <span className="whitespace-nowrap">Join The Community </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/consultation"
              className="px-3 py-1.5 rounded-lg bg-[#2457D6] text-white text-xs font-bold shadow-xs whitespace-nowrap shrink-0"
            >
              Consult
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div >

      {/* Mobile drawer */}
      {
        mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3 duration-200">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#2457D6]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              {currentUser ? (
                <div className="space-y-2">
                  <Link
                    href={getDashboardHref(currentUser.role)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-bold text-[#2457D6] bg-blue-50 rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Go to {currentUser.role.toUpperCase()} Dashboard</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#DC4545] hover:bg-red-50 rounded-xl"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 text-center text-sm font-bold text-white bg-[#2457D6] hover:bg-[#193F9B] rounded-xl shadow-xs transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      }
    </header >
  );
}
