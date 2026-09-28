"use client";

import { useState, type FormEvent } from "react";

import Link from "next/link";
import {
  Eye,
  Plus,
  ShieldCheck,
  Trash2,
  UserPlus,
  UsersRound,
} from "lucide-react";

import {
  Button,
  Card,
  Field,
  inputClass,
  PageHeader,
  StatusBadge,
} from "../components/ui";
import { useProfessional } from "../context/professional-context";
import type { ProviderType } from "../types/professional.types";

const providerTypes: {
  value: ProviderType;
  label: string;
  description: string;
}[] = [
  {
    value: "individual",
    label: "Individual",
    description: "You deliver services personally.",
  },
  {
    value: "team",
    label: "Team",
    description: "A small group led by a technician.",
  },
  {
    value: "company",
    label: "Company",
    description: "A registered service business.",
  },
];

export function ProfileScreen() {
  const {
    profile,
    updateProfile,
    changeProviderType,
    teamMembers,
    addTeamMember,
    removeTeamMember,
  } = useProfessional();
  const [editing, setEditing] = useState(false);
  const [memberFormOpen, setMemberFormOpen] = useState(false);

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateProfile({
      name: String(data.get("name")),
      legalName: String(data.get("legalName")),
      description: String(data.get("description")),
      phone: String(data.get("phone")),
      lineAccount: String(data.get("lineAccount")),
      email: String(data.get("email")),
      yearsExperience: Number(data.get("yearsExperience")),
      registrationNumber:
        String(data.get("registrationNumber") ?? "") || undefined,
      taxId: String(data.get("taxId") ?? "") || undefined,
      businessHours: String(data.get("businessHours") ?? "") || undefined,
    });
    setEditing(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Customer-facing information"
        title="My Profile"
        description="Keep your business details accurate and show customers why they can trust your work."
        action={
          <Link
            href="/professionals/somchai-air-service"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-slate-700 ring-1 ring-slate-300 ring-inset"
          >
            <Eye className="size-4" /> Preview Public Profile
          </Link>
        }
      />

      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-[#0f2942] to-sky-700" />
        <div className="relative p-5 pt-12 sm:p-6 sm:pt-12">
          <div className="absolute -top-9 left-5 flex size-18 items-center justify-center rounded-2xl border-4 border-white bg-sky-100 text-xl font-extrabold text-sky-800 sm:left-6">
            SA
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-950">
                  {profile.name}
                </h2>
                <StatusBadge tone="success">
                  <ShieldCheck className="size-3.5" /> Identity verified
                </StatusBadge>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {profile.providerType === "individual"
                  ? "Individual Professional"
                  : profile.providerType === "team"
                    ? "Professional Team"
                    : "Registered Company"}{" "}
                · {profile.baseLocation}
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                {profile.description}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setEditing((current) => !current)}
            >
              {editing ? "Cancel Editing" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-950">Professional type</h2>
        <p className="mt-1 text-sm text-slate-500">
          The fields below adapt to how you operate. Changes are preview-only.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {providerTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => changeProviderType(type.value)}
              className={`rounded-xl border p-4 text-left transition ${
                profile.providerType === type.value
                  ? "border-sky-600 bg-sky-50 ring-2 ring-sky-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <p className="font-bold text-slate-900">{type.label}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </Card>

      <form onSubmit={saveProfile}>
        <Card className="p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Profile details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Only suitable public details appear to customers.
              </p>
            </div>
            {!editing ? <StatusBadge>View only</StatusBadge> : null}
          </div>
          <fieldset
            disabled={!editing}
            className="mt-6 grid gap-5 disabled:opacity-80 sm:grid-cols-2"
          >
            <Field
              label={
                profile.providerType === "individual"
                  ? "Professional name"
                  : "Business name"
              }
            >
              <input
                name="name"
                defaultValue={profile.name}
                className={inputClass}
              />
            </Field>
            <Field
              label={
                profile.providerType === "company"
                  ? "Company contact"
                  : profile.providerType === "team"
                    ? "Team lead"
                    : "Full name"
              }
            >
              <input
                name="legalName"
                defaultValue={profile.legalName}
                className={inputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                label="Short description"
                hint="Help customers understand the kind of work you do."
              >
                <textarea
                  name="description"
                  defaultValue={profile.description}
                  rows={4}
                  className={`${inputClass} h-auto py-3`}
                />
              </Field>
            </div>
            <Field label="Years of experience">
              <input
                name="yearsExperience"
                type="number"
                min="0"
                defaultValue={profile.yearsExperience}
                className={inputClass}
              />
            </Field>
            <Field label="Phone">
              <input
                name="phone"
                defaultValue={profile.phone}
                className={inputClass}
              />
            </Field>
            <Field label="LINE account">
              <input
                name="lineAccount"
                defaultValue={profile.lineAccount}
                className={inputClass}
              />
            </Field>
            <Field
              label="Email"
              hint="Used for customer contact and account notices."
            >
              <input
                name="email"
                type="email"
                defaultValue={profile.email}
                className={inputClass}
              />
            </Field>
            <Field label="Languages">
              <input
                defaultValue={profile.languages.join(", ")}
                className={inputClass}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Specializations">
                <input
                  defaultValue={profile.specializations.join(", ")}
                  className={inputClass}
                />
              </Field>
            </div>

            {profile.providerType === "team" ? (
              <>
                <Field label="Team size">
                  <input
                    type="number"
                    defaultValue={profile.teamSize ?? 5}
                    className={inputClass}
                  />
                </Field>
                <Field label="Team lead">
                  <input
                    defaultValue={profile.teamLead ?? profile.legalName}
                    className={inputClass}
                  />
                </Field>
              </>
            ) : null}

            {profile.providerType === "company" ? (
              <>
                <Field label="Registration number">
                  <input
                    name="registrationNumber"
                    defaultValue={profile.registrationNumber ?? "0105569123456"}
                    className={inputClass}
                  />
                </Field>
                <Field label="Tax ID">
                  <input
                    name="taxId"
                    defaultValue={profile.taxId ?? "0105569123456"}
                    className={inputClass}
                  />
                </Field>
                <Field label="Business hours">
                  <input
                    name="businessHours"
                    defaultValue={
                      profile.businessHours ?? "08:00–18:00, Monday–Saturday"
                    }
                    className={inputClass}
                  />
                </Field>
                <Field label="Team size">
                  <input
                    type="number"
                    defaultValue={profile.teamSize ?? 5}
                    className={inputClass}
                  />
                </Field>
              </>
            ) : null}
          </fieldset>
          {editing ? (
            <div className="mt-6 flex justify-end">
              <Button type="submit">Save Profile</Button>
            </div>
          ) : null}
        </Card>
      </form>

      {profile.providerType !== "individual" ? (
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold text-slate-950">
                <UsersRound className="size-5 text-sky-700" /> Team Members
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                People customers may meet during service.
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => setMemberFormOpen((current) => !current)}
            >
              <UserPlus className="size-4" /> Add Member
            </Button>
          </div>
          {memberFormOpen ? (
            <MemberForm
              onAdd={(member) => {
                addTeamMember(member);
                setMemberFormOpen(false);
              }}
            />
          ) : null}
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-4"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-800">
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">
                    {member.role} · {member.yearsExperience} years ·{" "}
                    {member.skills.join(", ")}
                  </p>
                </div>
                <button
                  onClick={() => removeTeamMember(member.id)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                  aria-label={`Remove ${member.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Card className="flex items-start gap-3 p-5">
          <Plus className="mt-0.5 size-5 text-sky-700" />
          <div>
            <p className="font-bold text-slate-900">Need to add technicians?</p>
            <p className="mt-1 text-sm text-slate-500">
              Change your professional type to Team or Company to manage
              members.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}

function MemberForm({
  onAdd,
}: {
  onAdd: (member: {
    name: string;
    role: string;
    skills: string[];
    yearsExperience: number;
  }) => void;
}) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onAdd({
      name: String(data.get("memberName")),
      role: String(data.get("role")),
      skills: String(data.get("skills"))
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      yearsExperience: Number(data.get("experience")),
    });
  }

  return (
    <form
      onSubmit={submit}
      className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2"
    >
      <input
        name="memberName"
        required
        placeholder="Member name"
        className={inputClass}
      />
      <input name="role" required placeholder="Role" className={inputClass} />
      <input
        name="skills"
        required
        placeholder="Skills, separated by commas"
        className={inputClass}
      />
      <input
        name="experience"
        required
        min="0"
        type="number"
        placeholder="Years experience"
        className={inputClass}
      />
      <Button type="submit" className="sm:col-span-2 sm:justify-self-end">
        Add Team Member
      </Button>
    </form>
  );
}
