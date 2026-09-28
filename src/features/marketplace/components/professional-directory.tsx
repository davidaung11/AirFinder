"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Filter,
  MapPin,
  Phone,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import {
  marketplaceLocations,
  marketplaceProfessionals,
} from "../data/marketplace.mock";
import { useCustomerAuth } from "@/features/customer-auth/context/customer-auth-context";

export function ProfessionalDirectory() {
  const [query, setQuery] = useState("");
  const [providerType, setProviderType] = useState("All");
  const [location, setLocation] = useState("All locations");
  const [service, setService] = useState("All services");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [sort, setSort] = useState("Recommended");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const normalized = query.toLowerCase();
    const filtered = marketplaceProfessionals.filter(
      (professional) =>
        (!normalized ||
          `${professional.name} ${professional.area} ${professional.services.join(" ")}`
            .toLowerCase()
            .includes(normalized)) &&
        (providerType === "All" ||
          professional.providerType === providerType) &&
        (location === "All locations" ||
          professional.area.includes(location)) &&
        (service === "All services" ||
          professional.services.includes(service)) &&
        professional.rating >= minRating &&
        professional.startingPrice <= maxPrice &&
        (!availableOnly || professional.availability === "Available Today") &&
        (!verifiedOnly || professional.verified),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "Highest Rated") return b.rating - a.rating;
      if (sort === "Nearest") return a.distance - b.distance;
      if (sort === "Lowest Starting Price")
        return a.startingPrice - b.startingPrice;
      if (sort === "Most Experienced") return b.experience - a.experience;
      return b.reviews - a.reviews;
    });
  }, [
    availableOnly,
    location,
    maxPrice,
    minRating,
    providerType,
    query,
    service,
    sort,
    verifiedOnly,
  ]);

  const filters = (
    <FilterControls
      query={query}
      setQuery={setQuery}
      providerType={providerType}
      setProviderType={setProviderType}
      availableOnly={availableOnly}
      setAvailableOnly={setAvailableOnly}
      verifiedOnly={verifiedOnly}
      setVerifiedOnly={setVerifiedOnly}
      location={location}
      setLocation={setLocation}
      service={service}
      setService={setService}
      minRating={minRating}
      setMinRating={setMinRating}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
    />
  );

  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <PublicHeader />
      <div className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold tracking-wider text-sky-700 uppercase">
            AirFinder Directory
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#0f2942]">
            Air-conditioning professionals near you
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Compare expertise, areas, pricing, and verified contact reviews—then
            contact professionals directly.
          </p>
        </div>
      </div>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="hidden h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:block">
          <h2 className="flex items-center gap-2 font-bold">
            <SlidersHorizontal className="size-4 text-sky-700" /> Filters
          </h2>
          <div className="mt-5">{filters}</div>
        </aside>
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-600">
              <span className="font-extrabold text-slate-950">
                {results.length}
              </span>{" "}
              professionals found
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-white px-3 text-sm font-bold ring-1 ring-slate-300 lg:hidden"
              >
                <Filter className="size-4" /> Filters
              </button>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm font-semibold"
              >
                {[
                  "Recommended",
                  "Highest Rated",
                  "Nearest",
                  "Lowest Starting Price",
                  "Most Experienced",
                ].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            {results.map((professional, index) => (
              <article
                key={professional.name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div
                    className={`flex size-20 shrink-0 items-center justify-center rounded-2xl text-xl font-extrabold ${professional.color}`}
                  >
                    {professional.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-950">
                        {professional.name}
                      </h2>
                      {professional.verified ? (
                        <BadgeCheck className="size-5 text-sky-600" />
                      ) : null}
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-bold text-slate-600">
                        {professional.providerType}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                      <span className="flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />{" "}
                        {professional.rating} ({professional.reviews})
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5 text-sky-700" />{" "}
                        {professional.area} · {professional.distance} km
                      </span>
                      <span>{professional.experience} years experience</span>
                      <span className="text-emerald-700">
                        ● {professional.availability}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {professional.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-800"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-sm font-extrabold text-[#0f2942]">
                      {professional.price}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-row gap-2 sm:w-36 sm:flex-col">
                    <Link
                      href={
                        index === 0 ? "/professionals/somchai-air-service" : "#"
                      }
                      className="flex h-10 flex-1 items-center justify-center rounded-xl bg-sky-700 px-3 text-sm font-bold text-white"
                    >
                      View Profile
                    </Link>
                    <Link
                      href={
                        index === 0
                          ? "/professionals/somchai-air-service#contact"
                          : "#"
                      }
                      className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-sky-50 px-3 text-sm font-bold text-sky-800"
                    >
                      <Phone className="size-4" /> Contact
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      {filtersOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close filters"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Search filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="p-2">
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-4">{filters}</div>
            <button
              onClick={() => setFiltersOpen(false)}
              className="mt-5 h-11 w-full rounded-xl bg-sky-700 text-sm font-bold text-white"
            >
              Show {results.length} Professionals
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterControls({
  query,
  setQuery,
  providerType,
  setProviderType,
  availableOnly,
  setAvailableOnly,
  verifiedOnly,
  setVerifiedOnly,
  location,
  setLocation,
  service,
  setService,
  minRating,
  setMinRating,
  maxPrice,
  setMaxPrice,
}: {
  query: string;
  setQuery: (value: string) => void;
  providerType: string;
  setProviderType: (value: string) => void;
  availableOnly: boolean;
  setAvailableOnly: (value: boolean) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (value: boolean) => void;
  location: string;
  setLocation: (value: string) => void;
  service: string;
  setService: (value: string) => void;
  minRating: number;
  setMinRating: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
}) {
  return (
    <div className="space-y-5">
      <label className="block text-xs font-bold text-slate-700">
        Location or service
        <div className="relative mt-1.5">
          <Search className="absolute top-3 left-3 size-4 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bang Na, cleaning…"
            className="h-10 w-full rounded-xl border border-slate-300 pr-3 pl-9 text-sm"
          />
        </div>
      </label>
      <label className="block text-xs font-bold text-slate-700">
        Location
        <select
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          className="mt-1.5 h-10 w-full rounded-xl border border-slate-300 px-3 text-sm"
        >
          <option>All locations</option>
          {marketplaceLocations.map((area) => (
            <option key={area}>{area}</option>
          ))}
        </select>
      </label>
      <label className="block text-xs font-bold text-slate-700">
        Service
        <select
          value={service}
          onChange={(event) => setService(event.target.value)}
          className="mt-1.5 h-10 w-full rounded-xl border border-slate-300 px-3 text-sm"
        >
          <option>All services</option>
          <option>AC Cleaning</option>
          <option>Repair</option>
          <option>Installation</option>
          <option>Commercial AC</option>
        </select>
      </label>
      <div>
        <p className="text-xs font-bold text-slate-700">Provider type</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["All", "Individual", "Team", "Company"].map((type) => (
            <button
              key={type}
              onClick={() => setProviderType(type)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${providerType === type ? "bg-sky-700 text-white" : "bg-slate-100 text-slate-600"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <label className="block text-xs font-bold text-slate-700">
        Minimum rating
        <select
          value={minRating}
          onChange={(event) => setMinRating(Number(event.target.value))}
          className="mt-1.5 h-10 w-full rounded-xl border border-slate-300 px-3 text-sm"
        >
          <option value="0">Any rating</option>
          <option value="4.5">4.5 and above</option>
          <option value="4.8">4.8 and above</option>
        </select>
      </label>
      <label className="block text-xs font-bold text-slate-700">
        Starting price up to ฿{maxPrice}
        <input
          type="range"
          min="300"
          max="2000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="mt-3 w-full accent-sky-700"
        />
      </label>
      <Check
        label="Available today"
        checked={availableOnly}
        onChange={setAvailableOnly}
      />
      <Check
        label="Verified only"
        checked={verifiedOnly}
        onChange={setVerifiedOnly}
      />
    </div>
  );
}
function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 accent-sky-700"
      />
      {label}
    </label>
  );
}
export function PublicHeader() {
  const { customer } = useCustomerAuth();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-extrabold text-[#0f2942]">
          AirFinder
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold text-slate-600">
          <Link href="/professionals">Professionals</Link>
          <Link href="/services" className="hidden sm:block">
            Services
          </Link>
          <Link href="/how-it-works" className="hidden sm:block">
            How It Works
          </Link>
          <Link
            href={customer ? "/account" : "/login"}
            className="hidden sm:block"
          >
            {customer ? "My Account" : "Log In"}
          </Link>
          <Link
            href="/professional"
            className="rounded-full bg-sky-50 px-3 py-2 text-sky-800"
          >
            For Professionals
          </Link>
        </nav>
      </div>
    </header>
  );
}
