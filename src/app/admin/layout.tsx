import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Workspace | Internet Entrepreneurs Hub",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
