"use client";
import { type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AirVent,
  Heart,
  History,
  Home,
  LogOut,
  MessageSquareText,
  UserRound,
} from "lucide-react";
import { useCustomerAuth } from "@/features/customer-auth/context/customer-auth-context";
const links = [
  { label: "Overview", href: "/account", icon: Home },
  { label: "Profile", href: "/account/profile", icon: UserRound },
  { label: "Favorites", href: "/account/favorites", icon: Heart },
  { label: "Contact History", href: "/account/contacts", icon: History },
  { label: "My Reviews", href: "/account/reviews", icon: MessageSquareText },
];
export function AccountShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { customer, hydrated, logout } = useCustomerAuth();
  if (!hydrated) return <div className="min-h-screen bg-[#f8f9ff]" />;
  if (!customer)
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9ff] p-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm">
          <UserRound className="mx-auto size-10 text-sky-700" />
          <h1 className="mt-4 text-xl font-bold">Customer login required</h1>
          <p className="mt-2 text-sm text-slate-500">
            Log in to access account-based features. Public browsing remains
            available.
          </p>
          <Link
            href="/customer/login"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-sky-700 px-5 text-sm font-bold text-white"
          >
            Customer Login
          </Link>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-[#0f2942]"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
              <AirVent className="size-5" />
            </span>
            AirFinder
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-semibold text-slate-600 sm:block">
              {customer.fullName}
            </span>
            <span className="flex size-9 items-center justify-center rounded-full bg-sky-100 text-xs font-extrabold text-sky-800">
              {customer.initials}
            </span>
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr] lg:py-8">
        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:block">
          <nav className="space-y-1">
            {links.map((item) => {
              const active =
                item.href === "/account"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
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
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="mt-3 flex w-full items-center gap-3 border-t border-slate-100 px-3 pt-4 pb-2 text-sm font-semibold text-slate-500"
          >
            <LogOut className="size-[18px]" /> Log Out
          </button>
        </aside>
        <main className="pb-24 lg:pb-0">{children}</main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white pb-[max(.5rem,env(safe-area-inset-bottom))] lg:hidden">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[10px] font-bold ${pathname === item.href ? "text-sky-700" : "text-slate-500"}`}
          >
            <item.icon className="size-5" />
            {item.label === "Contact History" ? "Contacts" : item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
