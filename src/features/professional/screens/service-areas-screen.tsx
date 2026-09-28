"use client";

import { useState, type FormEvent } from "react";

import { LocateFixed, MapPin, Navigation, Plus, X } from "lucide-react";

import { Button, Card, inputClass, PageHeader } from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function ServiceAreasScreen() {
  const { profile, serviceAreas, addServiceArea, removeServiceArea } =
    useProfessional();
  const [radius, setRadius] = useState(15);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const area = String(data.get("area")).trim();
    if (area) addServiceArea(area);
    form.reset();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Where you work"
        title="Service Areas"
        description="Set a practical travel range so customers in relevant areas can contact you."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-5">
          <Card className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                <LocateFixed className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                  Base location
                </p>
                <h2 className="mt-1 text-lg font-bold text-slate-950">
                  {profile.baseLocation}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Exact home or office address stays private.
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-950">
              Districts you serve
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add familiar districts where you regularly accept work.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-sky-50 px-3 text-sm font-bold text-sky-800"
                >
                  <MapPin className="size-4" /> {area}
                  <button
                    onClick={() => removeServiceArea(area)}
                    className="rounded-full p-1 hover:bg-sky-100"
                    aria-label={`Remove ${area}`}
                  >
                    <X className="size-3.5" />
                  </button>
                </span>
              ))}
            </div>
            <form
              onSubmit={submit}
              className="mt-5 flex flex-col gap-2 sm:flex-row"
            >
              <input
                name="area"
                required
                placeholder="Add district or area"
                className={inputClass}
              />
              <Button type="submit" className="shrink-0">
                <Plus className="size-4" /> Add Area
              </Button>
            </form>
          </Card>

          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Travel radius
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Measured from your base location.
                </p>
              </div>
              <span className="text-2xl font-extrabold text-[#0f2942]">
                {radius} km
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={radius}
              onChange={(event) => setRadius(Number(event.target.value))}
              className="mt-6 w-full accent-sky-700"
              aria-label="Travel radius"
            />
            <div className="mt-2 flex justify-between text-xs font-semibold text-slate-400">
              <span>5 km</span>
              <span>40 km</span>
            </div>
          </Card>
        </div>

        <Card className="overflow-hidden xl:sticky xl:top-24 xl:h-fit">
          <div className="relative aspect-square overflow-hidden bg-[#eaf2fb]">
            <div className="absolute inset-0 [background-image:linear-gradient(#b7cada_1px,transparent_1px),linear-gradient(90deg,#b7cada_1px,transparent_1px)] [background-size:36px_36px] opacity-40" />
            <div className="absolute top-1/2 left-1/2 flex size-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-sky-500/40 bg-sky-300/20">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#0f2942] text-white shadow-lg ring-8 ring-white/80">
                <Navigation className="size-6" />
              </div>
            </div>
            {serviceAreas.slice(0, 4).map((area, index) => {
              const positions = [
                "top-[22%] left-[28%]",
                "top-[30%] right-[20%]",
                "bottom-[25%] left-[22%]",
                "bottom-[20%] right-[24%]",
              ];
              return (
                <span
                  key={area}
                  className={`absolute ${positions[index]} rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow-sm`}
                >
                  {area}
                </span>
              );
            })}
          </div>
          <div className="p-5">
            <p className="font-bold text-slate-950">
              Approximate service coverage
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              This visual is a preview only. No live map or precise address is
              used.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
