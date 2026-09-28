"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BriefcaseBusiness, LockKeyhole } from "lucide-react";
import { AuthShell } from "../components/auth-shell";
import { inputClass } from "./customer-login-screen";

export function WorkspaceLoginScreen({
  role,
}: {
  role: "professional" | "admin";
}) {
  const router = useRouter();
  const professional = role === "professional";
  return (
    <AuthShell
      eyebrow={`${role} access`}
      title={
        professional
          ? "Manage your professional listing"
          : "AirFinder administration"
      }
      description={
        professional
          ? "Preview your listing, customer leads, services, availability, and AirFinder credit."
          : "Frontend-only access to platform operations and trust controls."
      }
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
          {professional ? (
            <BriefcaseBusiness className="size-5" />
          ) : (
            <LockKeyhole className="size-5" />
          )}
        </span>
        <div>
          <h2 className="font-bold text-slate-950">
            {professional ? "Professional Login" : "Admin Login"}
          </h2>
          <p className="text-xs text-slate-500">Mock access only</p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.push(professional ? "/professional" : "/admin");
        }}
        className="mt-6 space-y-4"
      >
        <label className="block text-sm font-semibold">
          Email
          <input
            required
            type="email"
            defaultValue={
              professional ? "pro@airfinder.demo" : "admin@airfinder.demo"
            }
            className={`${inputClass} mt-1.5`}
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            required
            type="password"
            defaultValue="demo123"
            className={`${inputClass} mt-1.5`}
          />
        </label>
        <button className="h-11 w-full rounded-xl bg-sky-700 text-sm font-bold text-white">
          Log In
        </button>
      </form>
      {professional ? (
        <p className="mt-6 text-center text-sm text-slate-600">
          New professional?{" "}
          <Link href="/professional" className="font-bold text-sky-700">
            Preview registration workspace
          </Link>
        </p>
      ) : null}
    </AuthShell>
  );
}
