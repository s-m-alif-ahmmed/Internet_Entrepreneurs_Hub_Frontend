import { MetadataRoute } from "next";
import { INITIAL_COURSES, INITIAL_SERVICES } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hub.example.com";
  const now = new Date();

  // Core static public routes
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/consultation",
    "/courses",
    "/instructors",
    "/live-classes",
    "/contact",
    "/faq",
    "/support",
    "/terms-and-conditions",
    "/privacy-policy",
    "/refund-policy",
    "/cookie-policy",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : route.startsWith("/services") || route.startsWith("/courses") ? 0.9 : 0.7,
  }));

  // Dynamic service detail routes
  const serviceRoutes = INITIAL_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic course detail routes
  const courseRoutes = INITIAL_COURSES.map((c) => ({
    url: `${baseUrl}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...courseRoutes];
}
