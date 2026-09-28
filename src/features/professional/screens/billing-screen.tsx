"use client";

import { ArrowDownLeft, ArrowUpRight, WalletCards } from "lucide-react";
import { Button, Card, PageHeader, StatusBadge } from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function BillingScreen() {
  const { creditBalance, transactions, topUpCredit } = useProfessional();
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Lead credit"
        title="Billing & Credit"
        description="Preview your AirFinder credit balance, lead charges, and adjustments. No real payment is processed."
      />
      <Card className="overflow-hidden">
        <div className="bg-[#0f2942] p-6 text-white">
          <div className="flex items-center gap-2 text-sky-300">
            <WalletCards className="size-5" />
            <span className="text-xs font-bold uppercase">
              Current credit balance
            </span>
          </div>
          <p className="mt-3 text-4xl font-extrabold">
            ฿{creditBalance.toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Credit is used only when a qualified customer reveals your contact
            details.
          </p>
        </div>
        <div className="p-5">
          <p className="text-sm font-bold text-slate-900">Mock top up</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[300, 500, 1000].map((amount) => (
              <Button
                key={amount}
                variant="secondary"
                onClick={() => topUpCredit(amount)}
              >
                + ฿{amount.toLocaleString()}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-950">
          Transaction history
        </h2>
        <div className="mt-5 divide-y divide-slate-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full ${transaction.amount > 0 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
              >
                {transaction.amount > 0 ? (
                  <ArrowDownLeft className="size-5" />
                ) : (
                  <ArrowUpRight className="size-5" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-900">
                  {transaction.description}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {transaction.id} · {transaction.date}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={`font-extrabold ${transaction.amount > 0 ? "text-emerald-700" : "text-slate-900"}`}
                >
                  {transaction.amount > 0 ? "+" : "−"}฿
                  {Math.abs(transaction.amount)}
                </p>
                <StatusBadge>{transaction.type.replace("-", " ")}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
