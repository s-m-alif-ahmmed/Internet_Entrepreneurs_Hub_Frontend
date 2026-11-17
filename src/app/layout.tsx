import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { NotificationToast } from "@/components/ui/NotificationToast";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

  const plusJakarta = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta",
    subsets: ["latin"],
    display: "swap",
  });

  export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://hub.example.com"),
    title: {
      default: "Internet Entrepreneurs Hub (IEH) | Business Consulting & Online Learning",
      template: "%s | Internet Entrepreneurs Hub",
    },
    description:
    "Internet Entrepreneurs Hub (IEH) is a premier business consultancy and online learning platform. Discover strategic business consulting and structured online education to scale your venture.",
    keywords: [
      "Internet Entrepreneurs Hub",
      "IEH",
      "business consulting",
      "startup advisory",
      "online courses",
      "IEH Academy",
      "entrepreneurship",
      "live classes",
      "growth strategy",
    ],
    authors: [
      { name: "Md. Roman Alom", url: "https://hub.example.com" },
      { name: "S M Alif Ahmmed", url: "https://hub.example.com" },
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "/",
      siteName: "Internet Entrepreneurs Hub",
      title: "Internet Entrepreneurs Hub | Learn. Grow. Consult. Succeed.",
      description:
      "Empowering founders, builders, and businesses through expert consulting and professional online education.",
    },
      robots: {
        index: true,
        follow: true,
      },
    };

  export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return(
  <html lang="en" className={`${inter.variable} ${plusJakarta.variable} h-full antialiased`}>
    <body className="min-h-full flex flex-col bg-white text-[#172033] font-sans antialiased">
      <AppProvider>
        {children}
        <NotificationToast />
        <CheckoutModal />
      </AppProvider>
    </body>
  </html>
  );
}
