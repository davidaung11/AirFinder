"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn, UserRoundCheck } from "lucide-react";
import { AuthShell } from "../components/auth-shell";
import {
  customerLoginSchema,
  type CustomerLoginValues,
} from "../schemas/customer-auth.schemas";
import { useCustomerAuth } from "../context/customer-auth-context";

export function CustomerLoginScreen() {
  const router = useRouter();
  const { login } = useCustomerAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CustomerLoginValues>({
    resolver: zodResolver(customerLoginSchema),
    defaultValues: { email: "", password: "" },
  });
  function submit(values: CustomerLoginValues) {
    login(values.email);
    router.push("/account");
  }
  function useDemo() {
    setValue("email", "customer@airfinder.demo");
    setValue("password", "demo123");
  }
  return (
    <AuthShell
      eyebrow="Customer account"
      title="Welcome back to AirFinder"
      description="Log in to manage your profile, saved professionals, contact history, and reviews."
    >
      <h2 className="text-xl font-bold text-slate-950">Customer Login</h2>
      <p className="mt-1 text-sm text-slate-500">
        Continue to your customer account.
      </p>
      <form onSubmit={handleSubmit(submit)} className="mt-6 space-y-4">
        <AuthField label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            className={inputClass}
            autoComplete="email"
          />
        </AuthField>
        <AuthField label="Password" error={errors.password?.message}>
          <input
            type="password"
            {...register("password")}
            className={inputClass}
            autoComplete="current-password"
          />
        </AuthField>
        <div className="flex justify-end">
          <button type="button" className="text-xs font-bold text-sky-700">
            Forgot Password?
          </button>
        </div>
        <button
          disabled={isSubmitting}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-700 text-sm font-bold text-white"
        >
          <LogIn className="size-4" /> Log In
        </button>
      </form>
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <UserRoundCheck className="size-4 text-sky-700" /> Demo Customer
          Account
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          Email: customer@airfinder.demo
          <br />
          Password: demo123
        </p>
        <button
          onClick={useDemo}
          className="mt-3 h-9 rounded-lg bg-white px-3 text-xs font-bold text-sky-700 ring-1 ring-slate-300"
        >
          Use Demo Customer Account
        </button>
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link href="/customer/register" className="font-bold text-sky-700">
          Create Customer Account
        </Link>
      </p>
    </AuthShell>
  );
}
export const inputClass =
  "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-sky-600 focus:ring-3 focus:ring-sky-100";
export function AuthField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-slate-800">
      {label}
      <span className="mt-1.5 block">{children}</span>
      {error ? (
        <span className="mt-1 block text-xs font-medium text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
