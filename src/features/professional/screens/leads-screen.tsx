"use client";

import { Phone, MapPin, MessageSquareText } from "lucide-react";
import { Button, Card, PageHeader, StatusBadge } from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function LeadsScreen() {
  const { leads, updateLeadStatus } = useProfessional();
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer contacts"
        title="Leads"
        description="Qualified customers who chose to reveal your contact details. Continue conversations directly outside AirFinder."
      />
      <div className="space-y-4">
        {leads.map((lead) => (
          <Card key={lead.id} className="p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-bold text-sky-700">{lead.id}</p>
                <h2 className="mt-1 text-lg font-bold text-slate-950">
                  {lead.customerName} · {lead.service}
                </h2>
                <p className="mt-1 text-xs text-slate-500">{lead.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  tone={
                    lead.status === "new"
                      ? "info"
                      : lead.status === "contacted"
                        ? "success"
                        : "neutral"
                  }
                >
                  {lead.status}
                </StatusBadge>
                <span className="text-sm font-extrabold text-slate-900">
                  Lead fee ฿{lead.leadFee}
                </span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
              <p className="flex items-center gap-2 text-sm text-slate-700">
                <MapPin className="size-4 text-sky-700" />
                {lead.location}
              </p>
              <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Phone className="size-4 text-sky-700" />
                {lead.phone}
              </p>
              <p className="flex items-start gap-2 text-sm text-slate-600 sm:col-span-2">
                <MessageSquareText className="mt-0.5 size-4 shrink-0 text-sky-700" />
                {lead.message}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              {lead.status === "new" ? (
                <Button onClick={() => updateLeadStatus(lead.id, "viewed")}>
                  Mark Viewed
                </Button>
              ) : null}
              {lead.status !== "contacted" ? (
                <Button
                  variant="ghost"
                  onClick={() => updateLeadStatus(lead.id, "contacted")}
                >
                  Mark Contacted
                </Button>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
