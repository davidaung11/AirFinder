"use client";

import { useState, type ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AirVent,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Clock3,
  ExternalLink,
  Home,
  Images,
  LogOut,
  MapPinned,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Settings,
  UserRound,
  WalletCards,
  Wrench,
  X,
} from "lucide-react";

import { useProfessional } from "../context/professional-context";
import { Toast } from "./ui";

const navigation = [
  { label: "Overview", href: "/professional", icon: Home },
  {
    label: "Customer Leads",
    href: "/professional/leads",
    icon: ClipboardList,
  },
  { label: "My Profile", href: "/professional/profile", icon: UserRound },
  { label: "Services & Pricing", href: "/professional/services", icon: Wrench },
  { label: "Portfolio", href: "/professional/portfolio", icon: Images },
  {
    label: "Availability",
    href: "/professional/availability",
    icon: CalendarDays,
  },
  {
    label: "Service Areas",
    href: "/professional/service-areas",
    icon: MapPinned,
  },
  { label: "Reviews", href: "/professional/reviews", icon: MessageSquareText },
  {
    label: "Billing & Credit",
    href: "/professional/billing",
    icon: WalletCards,
  },
  { label: "Settings", href: "/professional/settings", icon: Settings },
];

const mobilePrimary = [
  { label: "Home", href: "/professional", icon: Home },
  { label: "Leads", href: "/professional/leads", icon: ClipboardList },
  { label: "Profile", href: "/professional/profile", icon: UserRound },
];

function isCurrentPath(pathname: string, href: string) {
  return href === "/professional"
    ? pathname === href
    : pathname.startsWith(href);
}

export function ProfessionalShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { availability, notice, clearNotice, profile, leads } =
    useProfessional();
  const newLeads = leads.filter((lead) => lead.status === "new").length;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
            <AirVent className="size-5" />
          </div>
          <div>
            <p className="text-lg font-extrabold tracking-tight text-[#0f2942]">
              AirFinder
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Professional Portal
            </p>
          </div>
        </div>

        <div className="border-b border-slate-100 px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full bg-sky-100 text-sm font-extrabold text-sky-800">
              SA
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">
                {profile.name}
              </p>
              <p className="flex items-center gap-1.5 text-xs text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500" />
                {availability.status === "available"
                  ? "Available today"
                  : availability.status}
              </p>
            </div>
          </div>
        </div>

        <nav
          className="flex-1 overflow-y-auto p-4"
          aria-label="Professional navigation"
        >
          <ul className="space-y-1">
            {navigation.map((item) => {
              const active = isCurrentPath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                      active
                        ? "bg-sky-50 text-sky-800"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <item.icon className="size-[18px]" />
                    <span>{item.label}</span>
                    {item.href === "/professional/leads" && newLeads > 0 ? (
                      <span className="ml-auto rounded-full bg-sky-700 px-2 py-0.5 text-[11px] text-white">
                        {newLeads}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-4">
          <Link
            href="/professionals/somchai-air-service"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ExternalLink className="size-[18px]" /> View Public Profile
          </Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50">
            <LogOut className="size-[18px]" /> Sign Out
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 lg:hidden">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#0f2942] text-sky-300">
              <AirVent className="size-5" />
            </div>
            <div>
              <p className="font-extrabold tracking-tight text-[#0f2942]">
                AirFinder
              </p>
              <p className="text-[10px] font-bold tracking-wide text-slate-500 uppercase">
                Professional
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-500 lg:flex">
            <BriefcaseBusiness className="size-4" />
            <span>Professional workspace</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 sm:flex">
              <Clock3 className="size-3.5" /> Available today
            </div>
            <Link
              href="/professional/leads"
              className="relative flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-700"
              aria-label={`${newLeads} new customer leads`}
            >
              <ClipboardList className="size-[18px]" />
              {newLeads ? (
                <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-sky-700 text-[10px] font-bold text-white">
                  {newLeads}
                </span>
              ) : null}
            </Link>
            <button
              className="flex size-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1480px] px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-slate-200 bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(15,23,42,0.06)] lg:hidden">
        {mobilePrimary.map((item) => {
          const active = isCurrentPath(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                active ? "text-sky-700" : "text-slate-500"
              }`}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
        <button
          className="flex min-h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold text-slate-500"
          onClick={() => setMenuOpen(true)}
        >
          <MoreHorizontal className="size-5" /> More
        </button>
      </nav>

      {menuOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <button
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          />
          <div className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
              <div>
                <p className="font-bold text-slate-950">Professional menu</p>
                <p className="text-xs text-slate-500">{profile.name}</p>
              </div>
              <button
                className="rounded-lg p-2 hover:bg-slate-100"
                onClick={closeMenu}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                    isCurrentPath(pathname, item.href)
                      ? "bg-sky-50 text-sky-800"
                      : "text-slate-700"
                  }`}
                >
                  <item.icon className="size-[18px]" />
                  {item.label}
                  <ChevronRight className="ml-auto size-4 text-slate-400" />
                </Link>
              ))}
            </nav>
            <div className="border-t border-slate-100 p-4">
              <Link
                href="/professionals/somchai-air-service"
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800"
              >
                <ExternalLink className="size-[18px]" /> View Public Profile
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      {notice ? <Toast message={notice} onClose={clearNotice} /> : null}
    </div>
  );
}
