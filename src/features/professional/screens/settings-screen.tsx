"use client";

import {
  Bell,
  Building2,
  LockKeyhole,
  Mail,
  MessageSquareText,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { Card, PageHeader, StatusBadge } from "../components/ui";
import { useProfessional } from "../context/professional-context";
import type { NotificationSettings } from "../types/professional.types";

export function SettingsScreen() {
  const { profile, notifications, toggleNotification } = useProfessional();

  const notificationRows: {
    key: keyof NotificationSettings;
    title: string;
    description: string;
    icon: typeof Bell;
  }[] = [
    {
      key: "email",
      title: "Email notifications",
      description: "Account and marketplace updates sent to your email.",
      icon: Mail,
    },
    {
      key: "customerLeads",
      title: "New customer leads",
      description:
        "Get notified when a nearby customer reveals your contact details.",
      icon: Smartphone,
    },
    {
      key: "reviews",
      title: "Customer reviews",
      description: "Know when a confirmed customer leaves feedback.",
      icon: MessageSquareText,
    },
    {
      key: "lowBalance",
      title: "Low credit balance",
      description: "Receive a reminder before your lead credit runs low.",
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Workspace preferences"
        title="Settings"
        description="Manage mock notification preferences and review your account and verification status."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Bell className="size-5 text-sky-700" />
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Notifications
                </h2>
                <p className="text-sm text-slate-500">
                  These controls update the frontend preview only.
                </p>
              </div>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {notificationRows.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <item.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                  <Toggle
                    checked={notifications[item.key]}
                    onClick={() => toggleNotification(item.key)}
                    label={item.title}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <LockKeyhole className="size-5 text-sky-700" />
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Account & privacy
                </h2>
                <p className="text-sm text-slate-500">
                  Authentication controls will be added in a later phase.
                </p>
              </div>
            </div>
            <dl className="mt-5 divide-y divide-slate-100 text-sm">
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-slate-500">Account email</dt>
                <dd className="font-semibold text-slate-800">
                  {profile.email}
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-slate-500">Public phone</dt>
                <dd className="font-semibold text-slate-800">
                  Revealed after a qualified contact lead
                </dd>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <dt className="text-slate-500">Professional type</dt>
                <dd className="font-semibold text-slate-800 capitalize">
                  {profile.providerType}
                </dd>
              </div>
            </dl>
          </Card>
        </div>

        <Card className="h-fit p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-wide text-sky-700 uppercase">
                Verification status
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-950">
                3 of 4 checks complete
              </h2>
            </div>
            <ShieldCheck className="size-8 text-emerald-600" />
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-3/4 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-5 space-y-3">
            <VerificationRow label="Phone" status="Verified" />
            <VerificationRow label="Identity" status="Verified" />
            <VerificationRow
              label={
                profile.providerType === "company"
                  ? "Business"
                  : "Professional details"
              }
              status="Verified"
            />
            <VerificationRow label="Certificate" status="Pending" pending />
          </div>
          <div className="mt-5 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            Mock status for stakeholder preview. No real documents have been
            verified.
          </div>
        </Card>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onClick,
  label,
}: {
  checked: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onClick}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-sky-700" : "bg-slate-300"}`}
    >
      <span
        className={`absolute top-1 size-5 rounded-full bg-white shadow-sm transition ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  );
}

function VerificationRow({
  label,
  status,
  pending = false,
}: {
  label: string;
  status: string;
  pending?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
      <div
        className={`flex size-8 items-center justify-center rounded-lg ${pending ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
      >
        {pending ? (
          <Building2 className="size-4" />
        ) : (
          <ShieldCheck className="size-4" />
        )}
      </div>
      <span className="flex-1 text-sm font-semibold text-slate-800">
        {label}
      </span>
      <StatusBadge tone={pending ? "warning" : "success"}>{status}</StatusBadge>
    </div>
  );
}
