"use client";

import { useState, type FormEvent } from "react";

import { Plus, Power, Trash2, Wrench } from "lucide-react";

import {
  Button,
  Card,
  Field,
  inputClass,
  PageHeader,
  StatusBadge,
} from "../components/ui";
import { useProfessional } from "../context/professional-context";
import type { PriceType } from "../types/professional.types";

const priceTypes: PriceType[] = [
  "Fixed",
  "Starting From",
  "Price Range",
  "Per Unit",
  "Inspection Quote",
];

export function ServicesScreen() {
  const { services, addService, toggleService, removeService } =
    useProfessional();
  const [formOpen, setFormOpen] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addService({
      name: String(data.get("name")),
      category: String(data.get("category")),
      price: String(data.get("price")),
      priceType: String(data.get("priceType")) as PriceType,
      description: String(data.get("description")),
      active: true,
    });
    event.currentTarget.reset();
    setFormOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Your offer"
        title="Services & Pricing"
        description="Show customers exactly what you provide and give them a clear starting price."
        action={
          <Button onClick={() => setFormOpen((current) => !current)}>
            <Plus className="size-4" /> Add Service
          </Button>
        }
      />

      {formOpen ? (
        <Card className="p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">Add a service</h2>
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Service name">
              <input
                name="name"
                required
                placeholder="e.g. AC Chemical Wash"
                className={inputClass}
              />
            </Field>
            <Field label="Category">
              <input
                name="category"
                required
                placeholder="Cleaning, repair…"
                className={inputClass}
              />
            </Field>
            <Field label="Displayed price">
              <input
                name="price"
                required
                placeholder="e.g. From ฿900"
                className={inputClass}
              />
            </Field>
            <Field label="Price type">
              <select name="priceType" className={inputClass}>
                {priceTypes.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Description">
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="What is included?"
                  className={`${inputClass} h-auto py-3`}
                />
              </Field>
            </div>
            <div className="flex justify-end gap-2 sm:col-span-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Service</Button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        {services.map((service) => (
          <Card
            key={service.id}
            className={`p-5 ${service.active ? "" : "bg-slate-50 opacity-80"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                  <Wrench className="size-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-slate-950">{service.name}</h2>
                    <StatusBadge tone={service.active ? "success" : "neutral"}>
                      {service.active ? "Active" : "Inactive"}
                    </StatusBadge>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {service.category} · {service.priceType}
                  </p>
                </div>
              </div>
              <p className="text-right text-base font-extrabold text-[#0f2942]">
                {service.price}
              </p>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {service.description}
            </p>
            <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="secondary"
                onClick={() => toggleService(service.id)}
              >
                <Power className="size-4" />{" "}
                {service.active ? "Deactivate" : "Activate"}
              </Button>
              <Button
                variant="danger"
                onClick={() => removeService(service.id)}
              >
                <Trash2 className="size-4" /> Remove
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
