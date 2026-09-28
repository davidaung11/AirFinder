"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, Phone, Star, X } from "lucide-react";
import Link from "next/link";
import { useCustomerAuth } from "@/features/customer-auth/context/customer-auth-context";

const fieldClass =
  "h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-sky-600 focus:ring-3 focus:ring-sky-100";

export function ContactPanel() {
  const [formOpen, setFormOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRevealed(true);
    setFormOpen(false);
  }
  return (
    <div
      id="contact"
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6"
    >
      <p className="text-xs font-bold tracking-wide text-sky-700 uppercase">
        Contact directly
      </p>
      <h2 className="mt-2 text-xl font-bold text-slate-950">
        Contact Somchai Air Service
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Share your basic service need before we reveal direct contact details.
      </p>
      {revealed ? (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
            <CheckCircle2 className="mr-2 inline size-4" />
            Your contact request has been recorded.
          </div>
          <a
            href="tel:+66895550142"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-sky-700 text-sm font-bold text-white"
          >
            <Phone className="size-4" /> 089-555-0142
          </a>
          <a
            href="#"
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white"
          >
            <MessageCircle className="size-4" /> LINE: @somchaiair
          </a>
          <p className="text-xs leading-5 text-slate-500">
            AirFinder records this as a qualified lead. Service scope and
            payment are agreed directly with the professional.
          </p>
        </div>
      ) : (
        <div className="mt-5 grid gap-2">
          <button
            onClick={() => setFormOpen(true)}
            className="h-11 rounded-xl bg-sky-700 text-sm font-bold text-white"
          >
            Show Phone Number
          </button>
          <button
            onClick={() => setFormOpen(true)}
            className="h-11 rounded-xl bg-emerald-50 text-sm font-bold text-emerald-800"
          >
            Contact on LINE
          </button>
        </div>
      )}
      {formOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            onClick={() => setFormOpen(false)}
            className="absolute inset-0 bg-slate-950/45"
            aria-label="Close contact form"
          />
          <form
            onSubmit={submit}
            className="relative z-10 w-full max-w-lg rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  Continue to contact
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  This creates a mock qualified lead.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="p-2"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Your name" className={fieldClass} />
              <input
                required
                type="tel"
                placeholder="Phone number"
                className={fieldClass}
              />
              <select required className={fieldClass}>
                <option>AC Cleaning</option>
                <option>Repair Inspection</option>
                <option>Gas Refill</option>
                <option>Installation</option>
              </select>
              <input required placeholder="Location" className={fieldClass} />
              <textarea
                placeholder="Short message (optional)"
                rows={3}
                className={`${fieldClass} h-auto py-3 sm:col-span-2`}
              />
            </div>
            <button
              type="submit"
              className="mt-5 h-11 w-full rounded-xl bg-sky-700 text-sm font-bold text-white"
            >
              Continue to Contact
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">
              No booking or payment is created.
            </p>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export function LeaveReview() {
  const { customer } = useCustomerAuth();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setOpen(false);
  }
  if (!customer)
    return (
      <Link
        href="/customer/login"
        className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-bold text-sky-800"
      >
        Log in to Leave Review
      </Link>
    );
  return (
    <div>
      {submitted ? (
        <p className="rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">
          Thanks. Your mock review was submitted for moderation.
        </p>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="rounded-xl bg-sky-50 px-4 py-2 text-sm font-bold text-sky-800"
        >
          Leave Review
        </button>
      )}
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <button
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setOpen(false)}
            aria-label="Close review form"
          />
          <form
            onSubmit={submit}
            className="relative z-10 w-full max-w-lg rounded-t-3xl bg-white p-6 sm:rounded-2xl"
          >
            <h3 className="text-xl font-bold">Leave a review</h3>
            <p className="mt-1 text-sm text-slate-500">
              For customers who contacted this professional through AirFinder.
            </p>
            <div className="mt-4 flex gap-1 text-amber-500">
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className="size-7 fill-current" />
              ))}
            </div>
            <select className={`${fieldClass} mt-4`}>
              <option>AC Cleaning</option>
              <option>Repair Inspection</option>
            </select>
            <textarea
              required
              rows={4}
              placeholder="Share your experience"
              className={`${fieldClass} mt-3 h-auto py-3`}
            />
            <button className="mt-4 h-11 w-full rounded-xl bg-sky-700 text-sm font-bold text-white">
              Submit Review
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
