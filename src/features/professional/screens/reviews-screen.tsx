"use client";

import { useState, type FormEvent } from "react";

import { CheckCircle2, MessageSquareReply, Star } from "lucide-react";

import {
  Button,
  Card,
  PageHeader,
  StatusBadge,
  inputClass,
} from "../components/ui";
import { useProfessional } from "../context/professional-context";

export function ReviewsScreen() {
  const { profile, reviews, replyToReview } = useProfessional();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const distribution = [
    { stars: 5, percent: 88 },
    { stars: 4, percent: 9 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ];

  function submitReply(event: FormEvent<HTMLFormElement>, reviewId: string) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    replyToReview(reviewId, String(data.get("reply")));
    setReplyingTo(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer trust"
        title="Reviews"
        description="See what confirmed customers say. Reviews cannot be edited or removed by professionals."
      />

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="p-5 sm:p-6">
          <p className="text-sm font-bold text-slate-950">Average rating</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-5xl font-extrabold tracking-tight text-[#0f2942]">
              {profile.rating}
            </span>
            <span className="mb-1 text-sm text-slate-500">out of 5</span>
          </div>
          <div className="mt-2 flex gap-1 text-amber-500">
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} className="size-5 fill-current" />
            ))}
          </div>
          <p className="mt-2 text-sm text-slate-500">
            Based on {profile.reviewCount} verified reviews
          </p>
        </Card>

        <Card className="p-5 sm:p-6">
          <p className="text-sm font-bold text-slate-950">
            Rating distribution
          </p>
          <div className="mt-4 space-y-2.5">
            {distribution.map((item) => (
              <div
                key={item.stars}
                className="grid grid-cols-[42px_1fr_36px] items-center gap-3 text-xs"
              >
                <span className="flex items-center gap-1 font-bold text-slate-600">
                  {item.stars}{" "}
                  <Star className="size-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-right font-semibold text-slate-500">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
                  {review.customerName[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {review.customerName}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <Star key={index} className="size-3 fill-current" />
                      ))}
                    </span>
                    <span>·</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              {review.verified ? (
                <StatusBadge tone="success">
                  <CheckCircle2 className="size-3.5" /> Verified Contact
                </StatusBadge>
              ) : null}
            </div>
            <p className="mt-4 text-xs font-bold tracking-wide text-sky-700 uppercase">
              {review.service}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              “{review.feedback}”
            </p>

            {review.reply ? (
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-bold text-slate-800">
                  Reply from {profile.name}
                </p>
                <p className="mt-1 text-sm text-slate-600">{review.reply}</p>
              </div>
            ) : replyingTo === review.id ? (
              <form
                onSubmit={(event) => submitReply(event, review.id)}
                className="mt-4"
              >
                <textarea
                  name="reply"
                  required
                  rows={3}
                  placeholder="Write a helpful, professional reply…"
                  className={`${inputClass} h-auto py-3`}
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Post Reply</Button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setReplyingTo(review.id)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-sky-700"
              >
                <MessageSquareReply className="size-4" /> Reply
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
