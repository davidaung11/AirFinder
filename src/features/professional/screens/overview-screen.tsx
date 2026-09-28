"use client";

import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Star,
  UserRoundCheck,
  WalletCards,
} from "lucide-react";

import { Card, PageHeader, StatusBadge } from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function OverviewScreen() {
  const { profile, leads, creditBalance, availability, reviews } =
    useProfessional();
  const summaries = [
    {
      label: "Profile Views This Month",
      value: "342",
      icon: Eye,
      color: "text-sky-700",
    },
    {
      label: "Customer Leads",
      value: "18",
      icon: UserRoundCheck,
      color: "text-indigo-600",
    },
    {
      label: "Credit Balance",
      value: `฿${creditBalance}`,
      icon: WalletCards,
      color: "text-emerald-600",
    },
    {
      label: "Average Rating",
      value: profile.rating.toString(),
      icon: Star,
      color: "text-amber-500",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Monday, 28 September"
        title="Good morning, Somchai"
        description="Keep your listing current, respond to new customer leads, and monitor your AirFinder credit."
        action={
          <Link
            href="/professionals/somchai-air-service"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-700 ring-1 ring-slate-300"
          >
            <Eye className="size-4" /> View Public Profile
          </Link>
        }
      />

      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-[#0f2942] text-lg font-extrabold text-sky-200">
            SA
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-slate-950">
                {profile.name}
              </h2>
              <StatusBadge tone="success">Verified</StatusBadge>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Individual Professional · {profile.baseLocation}
            </p>
          </div>
        </div>
        <StatusBadge
          tone={availability.status === "available" ? "success" : "warning"}
        >
          {availability.status === "available"
            ? "Available Today"
            : availability.status}
        </StatusBadge>
      </Card>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summaries.map((summary) => (
          <Card key={summary.label} className="p-4 sm:p-5">
            <summary.icon className={`size-5 ${summary.color}`} />
            <p className="mt-4 text-2xl font-extrabold text-slate-950">
              {summary.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">
              {summary.label}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Recent leads</h2>
              <p className="mt-1 text-sm text-slate-500">
                Customers who revealed your contact information.
              </p>
            </div>
            <Link
              href="/professional/leads"
              className="text-sm font-bold text-sky-700"
            >
              View all
            </Link>
          </div>
          <div className="mt-5 divide-y divide-slate-100">
            {leads.slice(0, 3).map((lead) => (
              <div
                key={lead.id}
                className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex size-10 items-center justify-center rounded-full bg-sky-50 font-bold text-sky-800">
                  {lead.customerName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">
                    {lead.customerName} · {lead.service}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {lead.location} · {lead.date}
                  </p>
                </div>
                <StatusBadge tone={lead.status === "new" ? "info" : "neutral"}>
                  {lead.status}
                </StatusBadge>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-5">
          <Card className="p-5">
            <p className="text-sm font-bold text-slate-950">
              Profile completion
            </p>
            <p className="mt-2 text-3xl font-extrabold text-[#0f2942]">78%</p>
            <div className="mt-4 h-2 rounded-full bg-slate-100">
              <div className="h-full w-[78%] rounded-full bg-sky-600" />
            </div>
            <ul className="mt-4 space-y-2 text-xs text-slate-600">
              <li>Add 2 more portfolio photos</li>
              <li>Confirm travel radius</li>
              <li>Submit certificate verification</li>
            </ul>
            <Link
              href="/professional/profile"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700"
            >
              Complete profile <ArrowRight className="size-4" />
            </Link>
          </Card>
          <Card className="p-5">
            <p className="text-sm font-bold text-slate-950">Latest review</p>
            <div className="mt-2 flex gap-0.5 text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              “{reviews[0]?.feedback}”
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
