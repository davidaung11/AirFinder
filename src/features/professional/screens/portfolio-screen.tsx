"use client";

import { useState, type FormEvent } from "react";

import {
  AirVent,
  ArrowRight,
  CalendarDays,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";

import {
  Button,
  Card,
  Field,
  inputClass,
  PageHeader,
  StatusBadge,
} from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function PortfolioScreen() {
  const { portfolio, addPortfolioItem, removePortfolioItem } =
    useProfessional();
  const [formOpen, setFormOpen] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addPortfolioItem({
      title: String(data.get("title")),
      category: String(data.get("category")),
      location: String(data.get("location")),
      description: String(data.get("description")),
      completedAt: String(data.get("completedAt")),
      beforeAfter: data.get("beforeAfter") === "on",
    });
    event.currentTarget.reset();
    setFormOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Proof of work"
        title="Portfolio"
        description="Show previous work clearly so customers can judge your experience and workmanship."
        action={
          <Button onClick={() => setFormOpen((current) => !current)}>
            <Plus className="size-4" /> Add Work
          </Button>
        }
      />

      {formOpen ? (
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">
            Add completed work
          </h2>
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Job title">
              <input
                name="title"
                required
                placeholder="e.g. 4-Unit Office Deep Clean"
                className={inputClass}
              />
            </Field>
            <Field label="Service category">
              <input
                name="category"
                required
                placeholder="AC Cleaning"
                className={inputClass}
              />
            </Field>
            <Field label="Location">
              <input
                name="location"
                required
                placeholder="Bang Na"
                className={inputClass}
              />
            </Field>
            <Field label="Completion date">
              <input
                name="completedAt"
                required
                placeholder="Sep 2026"
                className={inputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Short description">
                <textarea
                  name="description"
                  required
                  rows={3}
                  className={`${inputClass} h-auto py-3`}
                />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 sm:col-span-2">
              <input
                name="beforeAfter"
                type="checkbox"
                className="size-4 accent-sky-700"
              />
              Include a before / after comparison
            </label>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add to Portfolio</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {portfolio.map((item) => (
          <Card key={item.id} className="group overflow-hidden">
            <div
              className={`relative flex aspect-[16/10] items-center justify-center bg-gradient-to-br ${item.color}`}
            >
              {item.beforeAfter ? (
                <div className="grid h-full w-full grid-cols-2">
                  <div className="flex items-center justify-center border-r border-white/70 bg-slate-300/30">
                    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-600">
                      BEFORE
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-sky-700">
                      AFTER
                    </span>
                  </div>
                </div>
              ) : (
                <AirVent className="size-12 text-sky-700/50" />
              )}
              <button
                onClick={() => removePortfolioItem(item.id)}
                className="absolute top-3 right-3 rounded-lg bg-white/90 p-2 text-slate-500 shadow-sm hover:text-red-600"
                aria-label={`Delete ${item.title}`}
              >
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="p-5">
              <StatusBadge tone="info">{item.category}</StatusBadge>
              <h2 className="mt-3 text-lg font-bold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> {item.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" /> {item.completedAt}
                </span>
              </div>
              <button className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700">
                Edit details <ArrowRight className="size-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
