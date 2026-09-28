import type { ReactNode } from "react";
import Link from "next/link";
import { AirVent, ArrowLeft, ShieldCheck } from "lucide-react";

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8f9ff]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-[#0f2942]"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#0f2942] text-sky-300">
              <AirVent className="size-5" />
            </span>
            AirFinder
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft className="size-4" /> Back to directory
          </Link>
        </div>
      </header>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_480px]">
        <div className="hidden lg:block">
          <p className="text-xs font-bold tracking-[0.16em] text-sky-700 uppercase">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-lg text-4xl font-extrabold tracking-tight text-[#0f2942]">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
            {description}
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl bg-sky-50 p-5 text-sm leading-6 text-sky-950">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-sky-700" />
            This is a frontend demonstration. No real account, password, or
            session is created.
          </div>
        </div>
        <div>
          <div className="mb-6 lg:hidden">
            <p className="text-xs font-bold tracking-[0.16em] text-sky-700 uppercase">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#0f2942]">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}
