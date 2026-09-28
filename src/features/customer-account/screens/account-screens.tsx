"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  BadgeCheck,
  CheckCircle2,
  Heart,
  History,
  MapPin,
  MessageSquareText,
  Star,
  UserRound,
} from "lucide-react";
import { useCustomerAuth } from "@/features/customer-auth/context/customer-auth-context";
import {
  customerProfileSchema,
  type CustomerProfileValues,
} from "@/features/customer-auth/schemas/customer-auth.schemas";
import {
  AuthField,
  inputClass,
} from "@/features/customer-auth/screens/customer-login-screen";
import { Card, PageHeader } from "@/features/professional/components/ui";

export function AccountOverviewScreen() {
  const { customer } = useCustomerAuth();
  if (!customer) return null;
  const actions = [
    {
      label: "Saved Professionals",
      value: "2",
      icon: Heart,
      href: "/account/favorites",
    },
    {
      label: "Contact History",
      value: "3",
      icon: History,
      href: "/account/contacts",
    },
    {
      label: "Reviews",
      value: "1",
      icon: MessageSquareText,
      href: "/account/reviews",
    },
  ];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer account"
        title={`Hello, ${customer.fullName.split(" ")[0]}`}
        description="Manage your AirFinder profile and account-based activity."
      />
      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
        <span className="flex size-16 items-center justify-center rounded-full bg-sky-100 text-lg font-extrabold text-sky-800">
          {customer.initials}
        </span>
        <div className="flex-1">
          <h2 className="text-lg font-bold">{customer.fullName}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {customer.email} · {customer.phone}
          </p>
          {customer.preferredArea ? (
            <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-sky-700">
              <MapPin className="size-3.5" /> Preferred area:{" "}
              {customer.preferredArea}
            </p>
          ) : null}
        </div>
        <Link
          href="/account/profile"
          className="rounded-xl bg-sky-50 px-4 py-2 text-center text-sm font-bold text-sky-800"
        >
          Edit Profile
        </Link>
      </Card>
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((item) => (
          <Link href={item.href} key={item.label}>
            <Card className="p-5 transition hover:border-sky-300">
              <item.icon className="size-5 text-sky-700" />
              <p className="mt-4 text-2xl font-extrabold">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {item.label}
              </p>
            </Card>
          </Link>
        ))}
      </div>
      <Card className="p-5">
        <p className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="size-5 text-emerald-600" /> Public browsing
          always stays open
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          You only need this account for saved professionals, contact history,
          reviews, reports, and profile management.
        </p>
      </Card>
    </div>
  );
}

export function AccountProfileScreen() {
  const { customer, updateProfile } = useCustomerAuth();
  const [saved, setSaved] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerProfileValues>({
    resolver: zodResolver(customerProfileSchema),
    values: {
      fullName: customer?.fullName ?? "",
      phone: customer?.phone ?? "",
      email: customer?.email ?? "",
      preferredArea: customer?.preferredArea ?? "",
    },
  });
  if (!customer) return null;
  function submit(values: CustomerProfileValues) {
    updateProfile({ ...values });
    setSaved(true);
  }
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Personal details"
        title="Customer Profile"
        description="Keep your contact information current for saved activity and future contact requests."
      />
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#0f2942] to-sky-700" />
        <div className="relative p-5 pt-12 sm:p-6">
          <div className="absolute -top-9 flex size-18 items-center justify-center rounded-2xl border-4 border-white bg-sky-100 text-xl font-extrabold text-sky-800">
            {customer.initials}
          </div>
          <h2 className="text-lg font-bold">{customer.fullName}</h2>
          <p className="mt-1 text-sm text-slate-500">Customer Account</p>
        </div>
      </Card>
      <Card className="p-5 sm:p-6">
        <form
          onSubmit={handleSubmit(submit)}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <AuthField label="Full Name" error={errors.fullName?.message}>
              <input {...register("fullName")} className={inputClass} />
            </AuthField>
          </div>
          <AuthField label="Phone Number" error={errors.phone?.message}>
            <input {...register("phone")} className={inputClass} />
          </AuthField>
          <AuthField label="Email" error={errors.email?.message}>
            <input {...register("email")} className={inputClass} />
          </AuthField>
          <div className="sm:col-span-2">
            <AuthField
              label="Preferred Area / District"
              error={errors.preferredArea?.message}
            >
              <select {...register("preferredArea")} className={inputClass}>
                <option value="">No preference</option>
                <option>Bang Na</option>
                <option>Udom Suk</option>
                <option>On Nut</option>
                <option>Sukhumvit</option>
                <option>Samut Prakan</option>
              </select>
            </AuthField>
          </div>
          <div className="flex items-center justify-end gap-3 sm:col-span-2">
            {saved ? (
              <span className="text-xs font-semibold text-emerald-700">
                Profile saved.
              </span>
            ) : null}
            <button className="h-11 rounded-xl bg-sky-700 px-5 text-sm font-bold text-white">
              Save Profile
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export function AccountPlaceholderScreen({
  type,
}: {
  type: "favorites" | "contacts" | "reviews";
}) {
  const content = {
    favorites: {
      title: "Saved Professionals",
      description: "Professionals you want to compare or contact later.",
      icon: Heart,
      items: [
        "Somchai Air Service · Bang Na",
        "CoolFix Team Bangkok · Udom Suk",
      ],
    },
    contacts: {
      title: "Contact History",
      description:
        "Professionals whose details you revealed through AirFinder.",
      icon: History,
      items: [
        "Somchai Air Service · AC Cleaning · 28 Sep 2026",
        "CoolFix Team · Repair · 14 Sep 2026",
        "Bangkok Cooling Solutions · Installation · 02 Sep 2026",
      ],
    },
    reviews: {
      title: "My Reviews",
      description: "Reviews submitted after an AirFinder verified contact.",
      icon: MessageSquareText,
      items: ["Somchai Air Service · 5 stars · Visible"],
    },
  }[type];
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer account"
        title={content.title}
        description={content.description}
      />
      {content.items.map((item) => (
        <Card key={item} className="flex items-center gap-3 p-5">
          <content.icon className="size-5 text-sky-700" />
          <span className="flex-1 text-sm font-semibold text-slate-700">
            {item}
          </span>
          {type === "favorites" ? (
            <BadgeCheck className="size-4 text-sky-600" />
          ) : type === "reviews" ? (
            <span className="flex text-amber-500">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </span>
          ) : (
            <UserRound className="size-4 text-slate-400" />
          )}
        </Card>
      ))}
    </div>
  );
}
