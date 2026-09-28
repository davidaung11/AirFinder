import Link from "next/link";
import {
  AirVent,
  ArrowLeft,
  BadgeCheck,
  CalendarCheck2,
  CheckCircle2,
  Clock3,
  Images,
  MapPin,
  ShieldCheck,
  Star,
  Wrench,
} from "lucide-react";

import {
  portfolioMock,
  professionalProfileMock,
  reviewsMock,
  servicesMock,
} from "@/features/professional/data/professional.mock";
import { ContactPanel, LeaveReview } from "./profile-interactions";

export function PublicProfessionalProfile() {
  const profile = professionalProfileMock;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold tracking-tight text-[#0f2942]"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-[#0f2942] text-sky-300">
              <AirVent className="size-5" />
            </span>
            AirFinder
          </Link>
          <Link
            href="/professional/profile"
            className="text-sm font-bold text-sky-700"
          >
            Back to Professional Portal
          </Link>
        </div>
      </header>

      <main>
        <section className="bg-[#0f2942] px-4 py-10 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300"
            >
              <ArrowLeft className="size-4" /> Back to professionals
            </Link>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex size-24 shrink-0 items-center justify-center rounded-3xl bg-sky-100 text-2xl font-extrabold text-sky-800 ring-4 ring-white/15">
                  SA
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-extrabold tracking-tight">
                      {profile.name}
                    </h1>
                    <BadgeCheck className="size-6 text-sky-300" />
                  </div>
                  <p className="mt-2 text-sm text-slate-300">
                    Individual Professional · {profile.yearsExperience} years
                    experience
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4 text-sky-300" />{" "}
                      {profile.baseLocation}
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <span className="size-2 rounded-full bg-emerald-400" />{" "}
                      Available Today
                    </span>
                  </div>
                </div>
              </div>
              <a
                href="#contact"
                className="flex h-12 items-center rounded-xl bg-sky-600 px-6 text-sm font-bold text-white hover:bg-sky-500"
              >
                Contact Professional
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-100 py-5 sm:grid-cols-4">
            <Metric
              value={profile.rating.toString()}
              label={`${profile.reviewCount} reviews`}
              star
            />
            <Metric
              value={`${profile.yearsExperience} yrs`}
              label="Experience"
            />
            <Metric value="18 min" label="Average response" />
            <Metric value="100%" label="Identity checked" />
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <div className="space-y-6">
            <ProfileSection title="About" icon={ShieldCheck}>
              <p className="text-sm leading-7 text-slate-600">
                {profile.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.specializations.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ProfileSection>

            <ProfileSection title="Services & starting prices" icon={Wrench}>
              <div className="divide-y divide-slate-100">
                {servicesMock
                  .filter((service) => service.active)
                  .map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start justify-between gap-4 py-4 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-bold text-slate-900">
                          {service.name}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {service.description}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-extrabold text-[#0f2942]">
                        {service.price}
                      </p>
                    </div>
                  ))}
              </div>
            </ProfileSection>

            <ProfileSection title="Recent work" icon={Images}>
              <div className="grid gap-4 sm:grid-cols-3">
                {portfolioMock.map((item) => (
                  <article key={item.id}>
                    <div
                      className={`flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br ${item.color}`}
                    >
                      <AirVent className="size-8 text-sky-700/50" />
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-900">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.location} · {item.completedAt}
                    </p>
                  </article>
                ))}
              </div>
            </ProfileSection>

            <ProfileSection title="Customer reviews" icon={Star}>
              <div className="mb-5 flex justify-end">
                <LeaveReview />
              </div>
              <div className="space-y-5">
                {reviewsMock.map((review) => (
                  <article
                    key={review.id}
                    className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-slate-900">
                        {review.customerName}
                      </p>
                      <span className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: review.rating }, (_, index) => (
                          <Star key={index} className="size-3.5 fill-current" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      “{review.feedback}”
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="size-3.5" /> Verified Contact ·{" "}
                      {review.service}
                    </p>
                  </article>
                ))}
              </div>
            </ProfileSection>
          </div>

          <aside className="space-y-5">
            <ContactPanel />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs leading-5 text-slate-600">
              <p className="flex items-center gap-2">
                <CalendarCheck2 className="size-4 text-emerald-600" /> Usually
                responds within 18 minutes
              </p>
              <p className="mt-3 flex items-center gap-2">
                <Clock3 className="size-4 text-sky-600" /> Working hours
                08:00–18:00
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Metric({
  value,
  label,
  star = false,
}: {
  value: string;
  label: string;
  star?: boolean;
}) {
  return (
    <div className="px-3 text-center sm:px-5">
      <p className="flex items-center justify-center gap-1 text-xl font-extrabold text-[#0f2942]">
        {value}{" "}
        {star ? (
          <Star className="size-4 fill-amber-400 text-amber-400" />
        ) : null}
      </p>
      <p className="mt-1 text-[11px] font-semibold text-slate-500 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function ProfileSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof ShieldCheck;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
        <Icon className="size-5 text-sky-700" /> {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
