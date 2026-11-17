import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INITIAL_SERVICES } from "@/lib/mock-data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import {
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} | Business Consultancy`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = INITIAL_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = INITIAL_SERVICES.filter(
    (s) => s.id !== service.id && s.category === service.category
  ).slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Breadcrumb Header */}
        <section className="bg-[#F5F7FB] py-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-[#64748B] mb-4">
              <Link href="/" className="hover:text-[#2457D6]">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href="/services" className="hover:text-[#2457D6]">
                Services
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#172033] font-semibold truncate max-w-xs">{service.title}</span>
            </div>

            <div className="max-w-3xl space-y-3">
              <span className="text-[11px] font-bold text-[#2457D6] bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider">
                {service.category}
              </span>
              <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#172033] tracking-tight">
                {service.title}
              </h1>
              <p className="text-base text-[#64748B] leading-relaxed pt-1">
                {service.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content: Left 8 cols */}
              <div className="lg:col-span-8 space-y-12">
                {/* Hero Visual */}
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-md border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                    alt={service.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>

                {/* Detailed Description */}
                <div className="space-y-4">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Overview & Advisory Scope
                  </h2>
                  <p className="text-base text-slate-700 leading-relaxed">
                    {service.fullDescription}
                  </p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Strategic Benefits
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#16A36A] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Consultation Process */}
                <div className="space-y-6 pt-4 border-t border-slate-100">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    Our Consultation Process
                  </h2>
                  <div className="space-y-4">
                    {service.process.map((step) => (
                      <div
                        key={step.step}
                        className="flex gap-4 p-5 rounded-2xl border border-slate-200 bg-white"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#2457D6] text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {step.step}
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-base text-[#172033]">
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What's Included */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                    What is Included
                  </h2>
                  <ul className="space-y-3">
                    {service.included.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-[#2457D6]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* FAQs */}
                {service.faqs.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h2 className="font-heading font-extrabold text-2xl text-[#172033]">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-3">
                      {service.faqs.map((faq, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                          <h4 className="font-bold text-sm text-[#172033] flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-[#2457D6]" /> {faq.question}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#64748B] mt-2 pl-6 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar Booking Card: Right 4 cols */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-28 bg-[#F5F7FB] p-7 rounded-3xl border border-slate-200 shadow-md space-y-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Service Engagement
                    </span>
                    <h3 className="font-heading font-extrabold text-2xl text-[#172033] mt-1">
                      {service.startingPrice ? `$${service.startingPrice}` : "Custom Quote"}
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Starting advisory fee for dedicated sessions
                    </p>
                  </div>

                  <div className="space-y-3 border-t border-slate-200 pt-4 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Delivery: {service.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-400" />
                      <span>Strict Confidentiality Guaranteed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>Online Video Session or In-Person</span>
                    </div>
                  </div>

                  <Link
                    href={`/consultation?service=${service.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2457D6] text-white font-bold text-sm hover:bg-[#193F9B] transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Book a Consultation <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-[11px] text-center text-[#64748B]">
                    Initial booking is subject to IEH consultant schedule verification.
                  </p>
                </div>

                {/* Related services */}
                {relatedServices.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-heading font-bold text-base text-[#172033]">
                      Related Services
                    </h3>
                    <div className="space-y-3">
                      {relatedServices.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`/services/${rel.slug}`}
                          className="block p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#2457D6] hover:shadow-md transition-all"
                        >
                          <h4 className="font-bold text-sm text-[#172033]">{rel.title}</h4>
                          <p className="text-xs text-[#64748B] line-clamp-2 mt-1">
                            {rel.shortDescription}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
