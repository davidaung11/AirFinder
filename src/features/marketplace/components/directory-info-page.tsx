import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import {
  marketplaceLocations,
  marketplaceServices,
} from "../data/marketplace.mock";
import { PublicHeader } from "./professional-directory";

export function ServicesDirectoryPage() {
  return (
    <InfoShell
      eyebrow="Explore services"
      title="Air-conditioning services"
      description="Understand common services and compare professionals who offer them."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketplaceServices.map((service) => (
          <article
            key={service.name}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
              <service.icon className="size-5" />
            </div>
            <h2 className="mt-4 font-bold text-slate-950">{service.name}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {service.description}
            </p>
            <p className="mt-4 text-sm font-extrabold text-[#0f2942]">
              {service.price}
            </p>
            <Link
              href="/professionals"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-sky-700"
            >
              Find professionals <ArrowRight className="size-4" />
            </Link>
          </article>
        ))}
      </div>
    </InfoShell>
  );
}
export function LocationsDirectoryPage() {
  return (
    <InfoShell
      eyebrow="Browse locally"
      title="Service locations"
      description="Find professionals familiar with your district and nearby travel routes."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {marketplaceLocations.map((location, index) => (
          <Link
            href="/professionals"
            key={location}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-sky-300"
          >
            <MapPin className="size-5 text-sky-700" />
            <h2 className="mt-4 font-bold text-slate-950">{location}</h2>
            <p className="mt-1 text-sm text-slate-500">
              {14 + index * 3} listed professionals
            </p>
          </Link>
        ))}
      </div>
    </InfoShell>
  );
}
export function HowItWorksPage() {
  return (
    <InfoShell
      eyebrow="Direct contact directory"
      title="How AirFinder works"
      description="AirFinder helps you discover and contact professionals. Service arrangements happen directly between you and the provider."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {[
          [
            "1",
            "Search your area",
            "Choose your location, service, and preferred availability.",
          ],
          [
            "2",
            "Compare professionals",
            "Review pricing, experience, portfolio work, and verified-contact reviews.",
          ],
          [
            "3",
            "Reveal contact details",
            "Submit a short contact form, then call or message the professional directly.",
          ],
        ].map(([number, title, text]) => (
          <article
            key={number}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#0f2942] font-extrabold text-sky-300">
              {number}
            </span>
            <h2 className="mt-5 text-lg font-bold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 rounded-2xl bg-sky-50 p-5 text-sm leading-6 text-sky-950">
        <strong>Important:</strong> AirFinder does not assign technicians,
        manage the service, hold payments, or verify that work was completed.
      </div>
    </InfoShell>
  );
}
function InfoShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-wider text-sky-700 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#0f2942]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}
