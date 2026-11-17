import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Workspace | Internet Entrepreneurs Hub",
  robots: { index: false, follow: false },
};

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
