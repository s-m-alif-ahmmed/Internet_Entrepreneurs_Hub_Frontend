import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hub.example.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/services",
          "/services/*",
          "/courses",
          "/courses/*",
          "/membership",
          "/blogs",
          "/blogs/*",
          "/consultation",
          "/instructors",
          "/live-classes",
          "/contact",
          "/faq",
          "/support",
          "/terms-and-conditions",
          "/privacy-policy",
          "/refund-policy",
          "/cookie-policy",
        ],
        disallow: ["/student/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
