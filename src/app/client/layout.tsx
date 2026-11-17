import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Workspace | Internet Entrepreneurs Hub",
  robots: { index: false, follow: false },
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
