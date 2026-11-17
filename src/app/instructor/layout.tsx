import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructor Workspace | Internet Entrepreneurs Hub",
  robots: { index: false, follow: false },
};

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
