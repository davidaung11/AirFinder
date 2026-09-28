import Link from "next/link";
import { BriefcaseBusiness, ChevronRight, UserRound } from "lucide-react";
import { AuthShell } from "../components/auth-shell";

export function RoleLoginScreen() {
  return (
    <AuthShell
      eyebrow="Choose your account"
      title="Log in to AirFinder"
      description="Public browsing does not require an account. Choose the workspace you want to access."
    >
      <h2 className="text-xl font-bold text-slate-950">
        How do you use AirFinder?
      </h2>
      <div className="mt-6 space-y-3">
        <RoleOption
          href="/customer/login"
          icon={UserRound}
          title="Customer Login"
          description="Manage your profile, favorites, contact history, and reviews."
        />
        <RoleOption
          href="/professional/login"
          icon={BriefcaseBusiness}
          title="Professional Login"
          description="Manage your listing, leads, services, and credit."
        />
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        Administrators use a separate protected entry point.
      </p>
    </AuthShell>
  );
}
function RoleOption({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof UserRound;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-sky-400 hover:bg-sky-50"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
        <Icon className="size-5" />
      </span>
      <span className="flex-1">
        <span className="block font-bold text-slate-950">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      </span>
      <ChevronRight className="size-5 text-slate-400" />
    </Link>
  );
}
