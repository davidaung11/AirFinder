"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AirVent,
  BarChart3,
  CreditCard,
  FileWarning,
  Home,
  Menu,
  MessageSquareText,
  Settings,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
const nav = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Professionals", href: "/admin/professionals", icon: UsersRound },
  { label: "Customers", href: "/admin/customers", icon: UserRound },
  { label: "Leads", href: "/admin/leads", icon: MessageSquareText },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquareText },
  { label: "Reports", href: "/admin/reports", icon: FileWarning },
  { label: "Verifications", href: "/admin/verifications", icon: ShieldCheck },
  { label: "Suspended", href: "/admin/suspended", icon: FileWarning },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];
export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = (
    <nav className="space-y-1">
      {nav.map((item) => {
        const active =
          item.href === "/admin"
            ? pathname === item.href
            : pathname.startsWith(item.href);
        return (
          <Link
            onClick={() => setOpen(false)}
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${active ? "bg-sky-50 text-sky-800" : "text-slate-600 hover:bg-slate-50"}`}
          >
            <item.icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white p-4 lg:block">
        <div className="flex h-14 items-center gap-3 px-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
            <AirVent className="size-5" />
          </span>
          <div>
            <p className="font-extrabold text-[#0f2942]">AirFinder</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase">
              Admin Console
            </p>
          </div>
        </div>
        <div className="mt-5">{links}</div>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6">
          <p className="font-bold text-slate-950">Platform Administration</p>
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </header>
        <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:p-8">
          {children}
        </main>
      </div>
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close menu"
          />
          <aside className="absolute inset-y-0 right-0 w-[min(88vw,340px)] overflow-y-auto bg-white p-4">
            <div className="flex items-center justify-between px-2 py-3">
              <p className="font-bold">Admin menu</p>
              <button onClick={() => setOpen(false)}>
                <X className="size-5" />
              </button>
            </div>
            {links}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
