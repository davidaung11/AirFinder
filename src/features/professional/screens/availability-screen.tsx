"use client";

import { useState, type FormEvent } from "react";

import { CalendarCheck2, Check, Clock3 } from "lucide-react";

import { Button, Card, Field, inputClass, PageHeader } from "../components/ui";
import { useProfessional } from "../context/professional-context";
import type { AvailabilityStatus } from "../types/professional.types";

const statuses: {
  value: AvailabilityStatus;
  label: string;
  description: string;
  color: string;
}[] = [
  {
    value: "available",
    label: "Available",
    description: "Customers can reveal your contact details today.",
    color: "bg-emerald-500",
  },
  {
    value: "busy",
    label: "Busy",
    description: "Visible, but customers know replies may take longer.",
    color: "bg-amber-500",
  },
  {
    value: "unavailable",
    label: "Unavailable",
    description: "Temporarily stop receiving new customer leads.",
    color: "bg-slate-400",
  },
];

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export function AvailabilityScreen() {
  const { availability, setAvailabilityStatus, updateAvailability } =
    useProfessional();
  const [workingDays, setWorkingDays] = useState(availability.workingDays);

  function toggleDay(day: string) {
    setWorkingDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateAvailability({
      ...availability,
      workingDays,
      startTime: String(data.get("startTime")),
      endTime: String(data.get("endTime")),
      nextAvailableDate: String(data.get("nextAvailableDate")),
    });
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your schedule"
        title="Availability"
        description="Keep this simple and current so customers know when to expect a response."
      />

      <Card className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
            <CalendarCheck2 className="size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950">Current status</h2>
            <p className="text-sm text-slate-500">
              Change this any time—it takes effect immediately.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setAvailabilityStatus(status.value)}
              className={`relative rounded-xl border p-4 text-left transition ${
                availability.status === status.value
                  ? "border-sky-600 bg-sky-50 ring-2 ring-sky-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {availability.status === status.value ? (
                <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-sky-700 text-white">
                  <Check className="size-3" />
                </span>
              ) : null}
              <p className="flex items-center gap-2 font-bold text-slate-900">
                <span className={`size-2.5 rounded-full ${status.color}`} />{" "}
                {status.label}
              </p>
              <p className="mt-2 pr-4 text-xs leading-5 text-slate-500">
                {status.description}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <form onSubmit={submit}>
        <Card className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Clock3 className="size-5 text-sky-700" />
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Regular working hours
              </h2>
              <p className="text-sm text-slate-500">
                Set general contact hours, not appointment slots.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-800">Working days</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {days.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`min-h-10 rounded-xl px-3 text-sm font-bold transition ${
                    workingDays.includes(day)
                      ? "bg-sky-700 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Field label="Start time">
              <input
                name="startTime"
                type="time"
                defaultValue={availability.startTime}
                className={inputClass}
              />
            </Field>
            <Field label="End time">
              <input
                name="endTime"
                type="time"
                defaultValue={availability.endTime}
                className={inputClass}
              />
            </Field>
            <Field label="Next available date">
              <input
                name="nextAvailableDate"
                defaultValue={availability.nextAvailableDate}
                className={inputClass}
              />
            </Field>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit">Save Availability</Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
