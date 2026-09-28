"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, UserPlus } from "lucide-react";
import { AuthShell } from "../components/auth-shell";
import {
  customerRegistrationSchema,
  type CustomerRegistrationValues,
} from "../schemas/customer-auth.schemas";
import { useCustomerAuth } from "../context/customer-auth-context";
import { AuthField, inputClass } from "./customer-login-screen";

export function CustomerRegisterScreen() {
  const [created, setCreated] = useState(false);
  const { register: createCustomer } = useCustomerAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerRegistrationValues>({
    resolver: zodResolver(customerRegistrationSchema),
  });
  function submit(values: CustomerRegistrationValues) {
    createCustomer(values);
    setCreated(true);
  }
  return (
    <AuthShell
      eyebrow="Customer registration"
      title="Create your AirFinder account"
      description="Save trusted professionals and keep your contact activity organized with a simple customer profile."
    >
      {created ? (
        <div className="py-8 text-center">
          <CheckCircle2 className="mx-auto size-14 text-emerald-600" />
          <h2 className="mt-4 text-xl font-bold text-slate-950">
            Your AirFinder account has been created.
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Your demo customer session is ready.
          </p>
          <Link
            href="/account"
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-sky-700 px-5 text-sm font-bold text-white"
          >
            Continue to My Account
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-bold text-slate-950">
            Create Customer Account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Only the essentials are required.
          </p>
          <form
            onSubmit={handleSubmit(submit)}
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <AuthField label="Full Name" error={errors.fullName?.message}>
                <input {...register("fullName")} className={inputClass} />
              </AuthField>
            </div>
            <AuthField label="Phone Number" error={errors.phone?.message}>
              <input type="tel" {...register("phone")} className={inputClass} />
            </AuthField>
            <AuthField label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register("email")}
                className={inputClass}
              />
            </AuthField>
            <AuthField label="Password" error={errors.password?.message}>
              <input
                type="password"
                {...register("password")}
                className={inputClass}
              />
            </AuthField>
            <AuthField
              label="Confirm Password"
              error={errors.confirmPassword?.message}
            >
              <input
                type="password"
                {...register("confirmPassword")}
                className={inputClass}
              />
            </AuthField>
            <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 text-sm font-bold text-white sm:col-span-2">
              <UserPlus className="size-4" /> Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/customer/login" className="font-bold text-sky-700">
              Log In
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  );
}
