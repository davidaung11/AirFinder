import type { ReactNode } from "react";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminProvider } from "@/features/admin/context/admin-context";
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
