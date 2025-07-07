import { ProtectedSidebar } from "@/components/dashboard/protected-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Zul Hub",
  description: "Private dashboard for managing website content",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ProtectedSidebar />
      <main className="flex min-h-screen flex-1 flex-col">
        <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background px-4">
          <SidebarTrigger />
        </div>
        <div className="flex-1 px-4 py-8">{children}</div>
      </main>
    </SidebarProvider>
  );
}
