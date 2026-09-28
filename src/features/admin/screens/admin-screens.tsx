"use client";
import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  FileWarning,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";
import { adminPayments } from "../data/admin.mock";
import { useAdmin } from "../context/admin-context";
import type { PaymentStatus, ProfessionalStatus } from "../types/admin.types";
import {
  Button,
  Card,
  PageHeader,
  StatusBadge,
} from "@/features/professional/components/ui";

export function AdminDashboard() {
  const { professionals, complaints, verifications } = useAdmin();
  const metrics = [
    [
      "Active Professionals",
      professionals.filter((p) => p.status === "active").length,
      UsersRound,
    ],
    [
      "Pending Verification",
      verifications.filter((v) => v.status === "pending").length,
      ShieldCheck,
    ],
    ["Customer Leads", 184, Activity],
    ["Lead Revenue", "฿9,200", CreditCard],
    ["Credit Top-Ups", "฿14,500", ArrowUpRight],
    [
      "Open Complaints",
      complaints.filter((c) => c.status === "open").length,
      FileWarning,
    ],
    [
      "Suspended Accounts",
      professionals.filter((p) => p.status === "suspended").length,
      FileWarning,
    ],
    ["Average Rating", 4.7, Star],
  ] as const;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Platform health"
        title="Admin Dashboard"
        description="Monitor directory growth, qualified leads, credit activity, and trust operations."
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {metrics.map(([label, value, Icon]) => (
          <Card key={label} className="p-4">
            <Icon className="size-5 text-sky-700" />
            <p className="mt-3 text-2xl font-extrabold text-slate-950">
              {value}
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Trend title="Revenue Trend" values={[35, 50, 44, 68, 62, 82, 76]} />
        <Trend title="Lead Trend" values={[42, 38, 55, 48, 72, 66, 88]} />
        <Breakdown
          title="Top Service Areas"
          items={[
            ["Bang Na", 84],
            ["Sukhumvit", 72],
            ["Samut Prakan", 58],
            ["Prawet", 43],
          ]}
        />
        <Breakdown
          title="Most Requested Services"
          items={[
            ["AC Cleaning", 92],
            ["Repair", 68],
            ["Installation", 44],
            ["Gas Refill", 31],
          ]}
        />
      </div>
    </div>
  );
}

export function AdminProfessionalsScreen({
  suspendedOnly = false,
}: {
  suspendedOnly?: boolean;
}) {
  const { professionals, updateProfessional } = useAdmin();
  const [action, setAction] = useState<{
    id: string;
    status: ProfessionalStatus;
  } | null>(null);
  const items = suspendedOnly
    ? professionals.filter((item) =>
        ["suspended", "blocked"].includes(item.status),
      )
    : professionals;
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Directory supply"
        title={suspendedOnly ? "Suspended Accounts" : "Professionals"}
        description="Review provider standing, lead activity, credit, and trust signals."
      />
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="grid gap-3 md:grid-cols-[1.4fr_repeat(5,.7fr)_auto] md:items-center">
              <div>
                <p className="font-bold text-slate-950">{item.name}</p>
                <p className="text-xs text-slate-500">
                  {item.id} · {item.type}
                </p>
              </div>
              <AdminValue label="Verification" value={item.verification} />
              <AdminValue label="Rating" value={item.rating.toString()} />
              <AdminValue label="Leads" value={item.leads.toString()} />
              <AdminValue label="Credit" value={`฿${item.balance}`} />
              <AdminValue
                label="Complaints"
                value={item.complaints.toString()}
              />
              <div className="flex flex-wrap gap-2">
                <StatusBadge
                  tone={
                    item.status === "active"
                      ? "success"
                      : item.status === "pending"
                        ? "warning"
                        : "danger"
                  }
                >
                  {item.status}
                </StatusBadge>
                {item.status === "pending" ? (
                  <Button
                    variant="secondary"
                    onClick={() => updateProfessional(item.id, "active")}
                  >
                    Approve
                  </Button>
                ) : item.status === "active" ? (
                  <>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setAction({ id: item.id, status: "suspended" })
                      }
                    >
                      Suspend
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setAction({ id: item.id, status: "blocked" })
                      }
                    >
                      Block
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => updateProfessional(item.id, "active")}
                  >
                    Restore
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {action ? (
        <ReasonDialog
          title="Reason required"
          onCancel={() => setAction(null)}
          onConfirm={() => {
            updateProfessional(action.id, action.status);
            setAction(null);
          }}
        />
      ) : null}
    </div>
  );
}

export function AdminPaymentsScreen() {
  const [filter, setFilter] = useState<"all" | PaymentStatus>("all");
  const payments = adminPayments.filter(
    (item) => filter === "all" || item.status === filter,
  );
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Credit ledger"
        title="Payments"
        description="Monitor mock top-ups, lead charges, refunds, and adjustments."
        action={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        }
      />
      <div className="space-y-3">
        {payments.map((item) => (
          <Card
            key={item.id}
            className="grid gap-3 p-4 sm:grid-cols-[1fr_1fr_.7fr_.6fr_.8fr] sm:items-center"
          >
            <AdminValue label="Transaction" value={item.id} />
            <AdminValue label="Professional" value={item.professional} />
            <AdminValue label="Type" value={item.type} />
            <p
              className={`font-extrabold ${item.amount > 0 ? "text-emerald-700" : "text-slate-900"}`}
            >
              {item.amount > 0 ? "+" : "−"}฿{Math.abs(item.amount)}
            </p>
            <div>
              <StatusBadge
                tone={
                  item.status === "paid"
                    ? "success"
                    : item.status === "pending"
                      ? "warning"
                      : "neutral"
                }
              >
                {item.status}
              </StatusBadge>
              <p className="mt-1 text-xs text-slate-500">{item.date}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AdminReviewsScreen() {
  const { reviews, moderateReview } = useAdmin();
  const [reason, setReason] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Trust & safety"
        title="Review Moderation"
        description="Hide, restore, or remove customer reviews with a recorded moderation reason."
      />
      {reviews.map((review) => (
        <Card key={review.id} className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-bold">
                {review.customer} → {review.professional}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {review.id} · {review.date} · {review.rating}/5
              </p>
            </div>
            <StatusBadge tone={review.visible ? "success" : "warning"}>
              {review.visible ? "visible" : "hidden"}
            </StatusBadge>
          </div>
          <p className="mt-4 text-sm text-slate-600">“{review.comment}”</p>
          <div className="mt-4 flex gap-2">
            {review.visible ? (
              <Button variant="danger" onClick={() => setReason(review.id)}>
                Hide
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={() => moderateReview(review.id, true)}
              >
                Restore
              </Button>
            )}
            <Button variant="ghost">View</Button>
          </div>
        </Card>
      ))}
      {reason ? (
        <ReasonDialog
          title="Moderation reason"
          onCancel={() => setReason(null)}
          onConfirm={() => {
            moderateReview(reason, false);
            setReason(null);
          }}
        />
      ) : null}
    </div>
  );
}

export function AdminReportsScreen() {
  const { complaints, updateComplaint } = useAdmin();
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer protection"
        title="Reports & Complaints"
        description="Review reports about directory information and direct customer-provider experiences."
      />
      {complaints.map((item) => (
        <Card key={item.id} className="p-5">
          <div className="flex flex-wrap justify-between gap-3">
            <div>
              <p className="font-bold">
                {item.category}: {item.professional}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {item.id} · Reported by {item.reporter} · {item.date}
              </p>
            </div>
            <StatusBadge
              tone={
                item.status === "open"
                  ? "danger"
                  : item.status === "resolved"
                    ? "success"
                    : "warning"
              }
            >
              {item.status}
            </StatusBadge>
          </div>
          <p className="mt-4 text-sm text-slate-600">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() => updateComplaint(item.id, "under-review")}
            >
              Review
            </Button>
            <Button
              variant="ghost"
              onClick={() => updateComplaint(item.id, "resolved")}
            >
              Resolve
            </Button>
            <Button
              variant="ghost"
              onClick={() => updateComplaint(item.id, "dismissed")}
            >
              Dismiss
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function AdminVerificationsScreen() {
  const { verifications, updateVerification } = useAdmin();
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Provider trust"
        title="Verifications"
        description="Mock review of phone, identity, business, and certificate submissions."
      />
      {verifications.map((item) => (
        <Card
          key={item.id}
          className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center"
        >
          <div className="flex-1">
            <p className="font-bold">{item.professional}</p>
            <p className="mt-1 text-xs text-slate-500">
              {item.id} · {item.category} · Submitted {item.submitted}
            </p>
          </div>
          <StatusBadge
            tone={
              item.status === "verified"
                ? "success"
                : item.status === "rejected"
                  ? "danger"
                  : "warning"
            }
          >
            {item.status}
          </StatusBadge>
          <Button
            variant="secondary"
            onClick={() => updateVerification(item.id, "verified")}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            onClick={() => updateVerification(item.id, "rejected")}
          >
            Reject
          </Button>
        </Card>
      ))}
    </div>
  );
}

export function AdminAnalyticsScreen() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Business intelligence"
        title="Analytics"
        description="Meaningful directory, lead, revenue, and demand signals."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Trend
          title="Lead Revenue · Last 7 Days"
          values={[34, 48, 39, 70, 64, 82, 91]}
        />
        <Trend
          title="Qualified Leads · Last 7 Days"
          values={[42, 55, 46, 68, 77, 73, 94]}
        />
        <Breakdown
          title="High-demand / Low-provider Areas"
          items={[
            ["Lat Phrao", 91],
            ["Samut Prakan", 78],
            ["Phra Khanong", 63],
          ]}
        />
        <Breakdown
          title="Professional Signals"
          items={[
            ["Most contacted: Somchai Air", 92],
            ["Highest rated: Bangkok Cooling", 88],
            ["New professionals", 42],
            ["Inactive professionals", 18],
          ]}
        />
      </div>
    </div>
  );
}
export function AdminSimpleScreen({
  kind,
}: {
  kind: "customers" | "leads" | "settings";
}) {
  const content = {
    customers: [
      "Customers",
      "Customer directory activity and contact history.",
      [
        "Narin P. · 3 contacts",
        "Kanya S. · 2 contacts",
        "David T. · 1 contact",
      ],
    ],
    leads: [
      "Customer Leads",
      "Qualified contact reveals across the platform.",
      [
        "AF-L1024 · AC Cleaning · ฿50",
        "AF-L1021 · Water Leak Repair · ฿50",
        "AF-L1018 · Deep Cleaning · ฿50",
      ],
    ],
    settings: [
      "Admin Settings",
      "Frontend-only platform preferences.",
      [
        "Lead pricing rules",
        "Trust & safety notifications",
        "Directory visibility defaults",
      ],
    ],
  } as const;
  const [title, description, items] = content[kind];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Administration"
        title={title}
        description={description}
      />
      {items.map((item) => (
        <Card key={item} className="p-5 text-sm font-semibold text-slate-700">
          {item}
        </Card>
      ))}
    </div>
  );
}
function AdminValue({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-wide text-slate-400 uppercase">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800 capitalize">
        {value}
      </p>
    </div>
  );
}
function Trend({ title, values }: { title: string; values: number[] }) {
  return (
    <Card className="p-5">
      <h2 className="font-bold text-slate-950">{title}</h2>
      <div className="mt-6 flex h-40 items-end gap-3">
        {values.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t bg-sky-600"
              style={{ height: `${value}%` }}
            />
            <span className="text-[9px] text-slate-400">D{index + 1}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
function Breakdown({
  title,
  items,
}: {
  title: string;
  items: readonly (readonly [string, number])[];
}) {
  return (
    <Card className="p-5">
      <h2 className="font-bold text-slate-950">{title}</h2>
      <div className="mt-5 space-y-4">
        {items.map(([label, value]) => (
          <div key={label}>
            <div className="flex justify-between text-xs font-semibold">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-600"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
function ReasonDialog({
  title,
  onCancel,
  onConfirm,
}: {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        onClick={onCancel}
        className="absolute inset-0 bg-slate-950/45"
        aria-label="Cancel"
      />
      <div className="relative z-10 w-full max-w-md rounded-t-3xl bg-white p-6 sm:rounded-2xl">
        <h2 className="text-lg font-bold">{title}</h2>
        <textarea
          required
          rows={4}
          placeholder="e.g. Multiple scam complaints"
          className="mt-4 w-full rounded-xl border border-slate-300 p-3 text-sm"
        />
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirm Action
          </Button>
        </div>
      </div>
    </div>
  );
}
