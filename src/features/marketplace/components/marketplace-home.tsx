import Link from "next/link";
import {
  AirVent,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  UserRound,
  WalletCards,
} from "lucide-react";

import {
  marketplaceProfessionals,
  marketplaceServices,
} from "../data/marketplace.mock";

export function MarketplaceHome() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
              <AirVent className="size-5" />
            </span>
            <span>
              <span className="block font-extrabold tracking-tight text-[#0f2942]">
                AirFinder
              </span>
              <span className="hidden text-[10px] font-semibold text-slate-500 sm:block">
                Air-Con Service Marketplace
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {[
              { label: "Find Professionals", href: "/professionals" },
              { label: "Services", href: "/services" },
              { label: "How It Works", href: "/how-it-works" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/professional"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              For Professionals
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 sm:block"
            >
              Log In
            </Link>
            <Link
              href="/professional"
              className="rounded-full bg-sky-50 px-4 py-2 text-xs font-bold text-sky-800 hover:bg-sky-100 sm:text-sm"
            >
              Join as Professional
            </Link>
            <span className="hidden size-8 items-center justify-center rounded-full bg-[#001428] text-white sm:flex">
              <UserRound className="size-4" />
            </span>
          </div>
        </div>
      </header>

      <div className="bg-[#001428] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2 text-xs sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="rounded bg-sky-400/15 px-2 py-1 font-bold text-sky-300">
              Bangkok & Samut Prakan
            </span>
            <span>Average professional response: 18 minutes</span>
          </div>
          <span className="flex items-center gap-1.5 text-slate-300">
            <BadgeCheck className="size-4 text-emerald-300" /> 412 technicians
            identity checked
          </span>
        </div>
      </div>

      <main>
        <section className="bg-[#eff4ff] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-sky-700 shadow-sm">
                <AirVent className="size-3.5" /> Verified Air Conditioning
                Marketplace
              </span>
              <h1 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-[#001428] sm:text-5xl sm:leading-[1.08]">
                Find trusted air-conditioning professionals near you
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Compare technicians, teams, and companies by location,
                transparent pricing, availability, previous work, and confirmed
                customer reviews.
              </p>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-4 shadow-[0_14px_40px_rgba(15,41,66,0.10)] sm:p-6">
              <div className="grid gap-4 lg:grid-cols-[1.4fr_1.2fr_.8fr_auto] lg:items-end">
                <SearchField icon={MapPin} label="Service Location">
                  <input
                    defaultValue="Bang Na, Bangkok"
                    className="h-11 w-full rounded-xl bg-slate-50 px-3 text-sm outline-none focus:ring-2 focus:ring-sky-200"
                  />
                </SearchField>
                <SearchField icon={AirVent} label="Service Needed">
                  <select className="h-11 w-full rounded-xl bg-slate-50 px-3 text-sm outline-none">
                    <option>AC Cleaning</option>
                    <option>AC Repair & Diagnostic</option>
                    <option>Installation & Replacement</option>
                    <option>Refrigerant Refill</option>
                  </select>
                </SearchField>
                <SearchField icon={CalendarDays} label="Schedule">
                  <select className="h-11 w-full rounded-xl bg-slate-50 px-3 text-sm outline-none">
                    <option>Available Today</option>
                    <option>Tomorrow</option>
                    <option>This Weekend</option>
                  </select>
                </SearchField>
                <Link
                  href="/professionals"
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 text-sm font-bold text-white hover:bg-sky-800"
                >
                  <Search className="size-4" /> Find Pros
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-600">
                <span className="text-slate-400">Quick select:</span>
                {[
                  "Standard Wash ฿500",
                  "Water Leak Fix",
                  "R32 Refill",
                  "Inverter PCB Repair",
                ].map((label) => (
                  <button
                    key={label}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 hover:bg-slate-200"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <TrustItem
                icon={ShieldCheck}
                title="Identity & License Checked"
                description="Provider documents and background details reviewed"
              />
              <TrustItem
                icon={Star}
                title="Confirmed Customer Reviews"
                description="Reviews come from customers who revealed contact details"
              />
              <TrustItem
                icon={WalletCards}
                title="Clear Upfront Estimates"
                description="Standardized rates in Thai Baht with no hidden fees"
              />
            </div>
          </div>
        </section>

        <section id="services" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Categorized Services"
              title="Popular Air-Conditioning Services"
              description="Compare providers with clear starting estimates across Greater Bangkok."
            />
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {marketplaceServices.map((service) => (
                <article
                  key={service.name}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
                    <service.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-[#0f2942]">
                    {service.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                    <span className="text-xs font-semibold text-slate-500">
                      Starting rate
                    </span>
                    <span className="text-sm font-extrabold text-[#0f2942]">
                      {service.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="professionals"
          className="bg-white px-4 py-14 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Trusted nearby"
              title="Available Professionals"
              description="Compare provider types without losing the details that matter."
            />
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {marketplaceProfessionals.map((professional, index) => (
                <article
                  key={professional.name}
                  className="rounded-2xl border border-slate-200 p-5 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${professional.color}`}
                    >
                      {professional.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="truncate font-bold text-slate-950">
                          {professional.name}
                        </h3>
                        <BadgeCheck className="size-4 shrink-0 text-sky-600" />
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {professional.type}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-slate-600">
                        <MapPin className="size-3" /> {professional.area}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl bg-slate-50 py-3 text-center">
                    <div>
                      <p className="flex items-center justify-center gap-1 font-extrabold text-slate-900">
                        {professional.rating}{" "}
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {professional.reviews} reviews
                      </p>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">
                        {professional.experience} yrs
                      </p>
                      <p className="text-[10px] text-slate-500">experience</p>
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900">
                        {professional.price}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        service price
                      </p>
                    </div>
                  </div>
                  <Link
                    href={
                      index === 0 ? "/professionals/somchai-air-service" : "#"
                    }
                    className="mt-4 flex h-10 items-center justify-center gap-2 rounded-xl bg-sky-50 text-sm font-bold text-sky-800 hover:bg-sky-100"
                  >
                    View Profile <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Simple from start to finish"
              title="Contact professionals with confidence"
              description="A focused process with clear information at every step."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                [
                  Search,
                  "1",
                  "Describe what you need",
                  "Choose a service, location, and preferred time.",
                ],
                [
                  BadgeCheck,
                  "2",
                  "Compare verified providers",
                  "Review skills, prices, portfolios, and ratings.",
                ],
                [
                  CheckCircle2,
                  "3",
                  "Confirm and get it fixed",
                  "Reveal contact details and arrange service directly.",
                ],
              ].map(([Icon, number, title, description]) => {
                const StepIcon = Icon as typeof Search;
                return (
                  <div
                    key={String(number)}
                    className="rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
                        <StepIcon className="size-5" />
                      </span>
                      <span className="text-3xl font-extrabold text-slate-100">
                        {String(number)}
                      </span>
                    </div>
                    <h3 className="mt-5 font-bold text-slate-950">
                      {String(title)}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {String(description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#0f2942] px-4 py-12 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-sky-300 uppercase">
                For Professionals
              </p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Grow your air-conditioning business
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Connect with local homeowners and condominiums, control your
                schedule, and build a trusted service record.
              </p>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-200">
                {[
                  "Keep 100% of quote rates",
                  "Control your availability",
                  "Build a verified reputation",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-300" /> {item}
                  </span>
                ))}
              </div>
              <Link
                href="/professional"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-sky-600 px-5 text-sm font-bold text-white hover:bg-sky-500"
              >
                Open Professional Portal <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/10">
              <div className="rounded-xl bg-white p-4 text-slate-900">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Clock3 className="size-5" />
                  </span>
                  <div>
                    <p className="font-bold">Live Bangkok job feed</p>
                    <p className="text-xs text-slate-500">New customer leads</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-xs">
                  {[
                    "Bang Na · Wash 2 units · ฿1,000",
                    "Udom Suk · Water leak · ฿650",
                    "Prawet · R32 top-up · ฿800",
                  ].map((job) => (
                    <div
                      key={job}
                      className="rounded-lg bg-slate-50 p-2.5 font-semibold text-slate-700"
                    >
                      {job}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#eff4ff] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 font-extrabold text-[#0f2942]">
              <AirVent className="size-5" /> AirFinder
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Thailand’s marketplace for residential and commercial
              air-conditioning services.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm font-semibold text-slate-600">
            <Link href="#services">Services</Link>
            <Link href="/professional">Provider Portal</Link>
            <Link href="#professionals">Professionals</Link>
            <span>Help Center</span>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-slate-200 pt-5 text-xs text-slate-500">
          © 2026 AirFinder. Frontend stakeholder preview.
        </div>
      </footer>
    </div>
  );
}

function SearchField({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-slate-700">
        <Icon className="size-3.5 text-sky-700" /> {label}
      </span>
      {children}
    </label>
  );
}

function TrustItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof ShieldCheck;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-xs font-bold text-slate-900">{title}</span>
        <span className="mt-0.5 block text-[11px] text-slate-500">
          {description}
        </span>
      </span>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.16em] text-sky-700 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-[#0f2942] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
