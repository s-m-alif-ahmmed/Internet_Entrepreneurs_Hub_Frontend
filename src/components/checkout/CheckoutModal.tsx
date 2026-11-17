"use client";

import React, { useState } from "react";
import { useApp } from "@/lib/store";
import { X, CheckCircle, Tag, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function CheckoutModal() {
  const { checkoutCourse, closeCheckout, currentUser, createOrder, applyCoupon } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "Credit Card / Debit Card" | "Bank Transfer" | "Mobile Payment" | "Demo Checkout"
  >("Demo Checkout");
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderConfirmedRef, setOrderConfirmedRef] = useState<string | null>(null);

  if (!checkoutCourse) return null;

  const originalPrice = checkoutCourse.discountPrice || checkoutCourse.price;
  const finalPrice = Math.max(0, originalPrice - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode, originalPrice);
    if (res.valid) {
      setDiscountAmount(res.discount);
      setCouponMsg(res.message);
    } else {
      setCouponMsg(res.message);
    }
  };

  const handleCompleteOrder = () => {
    if (!acceptedTerms) return;
    setIsProcessing(true);

    setTimeout(() => {
      const ref = createOrder({
        customerName: currentUser?.name || "Demo Student",
        customerEmail: currentUser?.email || "student@ieh.com",
        itemType: "course",
        itemId: checkoutCourse.id,
        itemTitle: checkoutCourse.title,
        amount: checkoutCourse.price,
        discount: (checkoutCourse.price - (checkoutCourse.discountPrice || checkoutCourse.price)) + discountAmount,
        finalAmount: finalPrice,
        paymentMethod,
        paymentStatus: "Paid",
        orderStatus: "Completed",
      });
      setIsProcessing(false);
      setOrderConfirmedRef(ref);
    }, 900);
  };

  const handleClose = () => {
    setOrderConfirmedRef(null);
    setDiscountAmount(0);
    setCouponCode("");
    setCouponMsg("");
    closeCheckout();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#F5F7FB]">
          <div>
            <h3 id="checkout-modal-title" className="text-lg font-bold text-[#172033]">
              {orderConfirmedRef ? "Order Confirmed!" : "Course Enrollment Checkout"}
            </h3>
            <p className="text-xs text-[#64748B]">IEH Academy Secure Demo Enrollment</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmedRef ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-[#172033]">Enrollment Complete!</h4>
              <p className="text-sm text-[#64748B] mt-1">
                You are now officially enrolled in <strong className="text-slate-800">{checkoutCourse.title}</strong>.
              </p>
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 inline-block text-xs font-mono font-medium text-slate-700">
                Order Reference: <span className="text-[#2457D6] font-bold">{orderConfirmedRef}</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/70 rounded-xl text-left border border-blue-100 text-xs text-slate-600">
              <p className="font-semibold text-[#193F9B] mb-1">Demo Simulation Notice:</p>
              This transaction was processed in demonstration mode. The course has been automatically added to your Student Dashboard.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/student/my-courses"
                onClick={handleClose}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#2457D6] text-white font-medium hover:bg-[#193F9B] transition-colors shadow-md shadow-blue-500/10 text-sm"
              >
                Go to My Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={handleClose}
                className="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Item Card */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                <Image
                  src={checkoutCourse.thumbnail}
                  alt={checkoutCourse.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2457D6]">
                  {checkoutCourse.category}
                </span>
                <h4 className="text-sm font-bold text-[#172033] line-clamp-1">{checkoutCourse.title}</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Instructor: {checkoutCourse.instructorName}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base font-bold text-[#172033]">${originalPrice}</span>
                {checkoutCourse.discountPrice && (
                  <span className="block text-xs line-through text-slate-400">
                    ${checkoutCourse.price}
                  </span>
                )}
              </div>
            </div>

            {/* Coupon input */}
            <div>
              <label htmlFor="coupon-code-input" className="block text-xs font-semibold text-[#172033] mb-1.5">
                Have a Promo Coupon?
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    id="coupon-code-input"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Try GROWTH20 or STARTUP50"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#2457D6] uppercase tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-900 transition-colors"
                >
                  Apply
                </button>
              </form>
              {couponMsg && (
                <p className={`text-xs mt-1.5 ${discountAmount > 0 ? "text-[#16A36A] font-medium" : "text-[#DC4545]"}`}>
                  {couponMsg}
                </p>
              )}
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  "Demo Checkout",
                  "Credit Card / Debit Card",
                  "Bank Transfer",
                  "Mobile Payment",
                ].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method as typeof paymentMethod)}
                    className={`p-3 rounded-xl border text-left font-medium transition-all ${
                      paymentMethod === method
                        ? "border-[#2457D6] bg-blue-50/50 text-[#193F9B] shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-[#64748B]">
              <div className="flex justify-between">
                <span>Course Price:</span>
                <span>${originalPrice}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#16A36A] font-medium">
                  <span>Coupon Discount:</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#172033] pt-2 border-t border-slate-100">
                <span>Total Amount Due:</span>
                <span className="text-base text-[#2457D6]">${finalPrice}</span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded text-[#2457D6] focus:ring-[#2457D6]"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-snug">
                I agree to the{" "}
                <Link href="/terms-and-conditions" target="_blank" className="text-[#2457D6] underline">
                  Terms & Conditions
                </Link>{" "}
                and acknowledge the 14-day{" "}
                <Link href="/refund-policy" target="_blank" className="text-[#2457D6] underline">
                  Refund Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit button */}
            <button
              onClick={handleCompleteOrder}
              disabled={isProcessing || !acceptedTerms}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2457D6] text-white font-semibold text-sm hover:bg-[#193F9B] disabled:opacity-60 transition-colors shadow-lg shadow-blue-500/20"
            >
              {isProcessing ? (
                <>Processing Enrollment...</>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" /> Confirm Enrollment (${finalPrice})
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
