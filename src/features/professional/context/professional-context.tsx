"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getProfessionalWorkspace } from "../services/professional.service";
import type {
  Availability,
  AvailabilityStatus,
  Lead,
  LeadStatus,
  NotificationSettings,
  PortfolioItem,
  ProfessionalProfile,
  ProfessionalService,
  ProviderType,
  Review,
  TeamMember,
  WalletTransaction,
} from "../types/professional.types";

interface ProfessionalContextValue {
  profile: ProfessionalProfile;
  leads: Lead[];
  services: ProfessionalService[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  teamMembers: TeamMember[];
  availability: Availability;
  serviceAreas: string[];
  notifications: NotificationSettings;
  transactions: WalletTransaction[];
  creditBalance: number;
  notice: string | null;
  setAvailabilityStatus: (status: AvailabilityStatus) => void;
  updateAvailability: (availability: Availability) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  topUpCredit: (amount: number) => void;
  updateProfile: (profile: Partial<ProfessionalProfile>) => void;
  changeProviderType: (type: ProviderType) => void;
  addService: (service: Omit<ProfessionalService, "id">) => void;
  toggleService: (id: string) => void;
  removeService: (id: string) => void;
  addPortfolioItem: (item: Omit<PortfolioItem, "id" | "color">) => void;
  removePortfolioItem: (id: string) => void;
  addServiceArea: (area: string) => void;
  removeServiceArea: (area: string) => void;
  addTeamMember: (member: Omit<TeamMember, "id" | "initials">) => void;
  removeTeamMember: (id: string) => void;
  toggleNotification: (key: keyof NotificationSettings) => void;
  replyToReview: (id: string, reply: string) => void;
  clearNotice: () => void;
}

const ProfessionalContext = createContext<ProfessionalContextValue | null>(
  null,
);

export function ProfessionalProvider({ children }: { children: ReactNode }) {
  const [workspace] = useState(getProfessionalWorkspace);
  const [profile, setProfile] = useState(workspace.profile);
  const [leads, setLeads] = useState(workspace.leads);
  const [services, setServices] = useState(workspace.services);
  const [portfolio, setPortfolio] = useState(workspace.portfolio);
  const [reviews, setReviews] = useState(workspace.reviews);
  const [teamMembers, setTeamMembers] = useState(workspace.teamMembers);
  const [availability, setAvailability] = useState(workspace.availability);
  const [serviceAreas, setServiceAreas] = useState(workspace.serviceAreas);
  const [notifications, setNotifications] = useState(workspace.notifications);
  const [transactions, setTransactions] = useState(workspace.transactions);
  const [creditBalance, setCreditBalance] = useState(workspace.creditBalance);
  const [notice, setNotice] = useState<string | null>(null);

  const showNotice = useCallback((message: string) => setNotice(message), []);

  const value = useMemo<ProfessionalContextValue>(
    () => ({
      profile,
      leads,
      services,
      portfolio,
      reviews,
      teamMembers,
      availability,
      serviceAreas,
      notifications,
      transactions,
      creditBalance,
      notice,
      setAvailabilityStatus: (status) => {
        setAvailability((current) => ({ ...current, status }));
        showNotice(`Status changed to ${status}.`);
      },
      updateAvailability: (nextAvailability) => {
        setAvailability(nextAvailability);
        showNotice("Availability saved.");
      },
      updateLeadStatus: (id, status) => {
        setLeads((current) =>
          current.map((lead) => (lead.id === id ? { ...lead, status } : lead)),
        );
        showNotice(`Lead ${id} marked ${status}.`);
      },
      topUpCredit: (amount) => {
        setCreditBalance((current) => current + amount);
        setTransactions((current) => [
          {
            id: `TX-${Date.now()}`,
            type: "top-up",
            description: "Mock credit top-up",
            amount,
            date: "28 Sep 2026",
          },
          ...current,
        ]);
        showNotice(`฿${amount.toLocaleString()} mock credit added.`);
      },
      updateProfile: (updates) => {
        setProfile((current) => ({ ...current, ...updates }));
        showNotice("Profile changes saved.");
      },
      changeProviderType: (providerType) => {
        setProfile((current) => ({ ...current, providerType }));
        showNotice("Professional type updated for this preview.");
      },
      addService: (service) => {
        setServices((current) => [
          ...current,
          { ...service, id: `service-${Date.now()}` },
        ]);
        showNotice("Service added.");
      },
      toggleService: (id) => {
        setServices((current) =>
          current.map((service) =>
            service.id === id
              ? { ...service, active: !service.active }
              : service,
          ),
        );
        showNotice("Service visibility updated.");
      },
      removeService: (id) => {
        setServices((current) =>
          current.filter((service) => service.id !== id),
        );
        showNotice("Service removed from this preview.");
      },
      addPortfolioItem: (item) => {
        setPortfolio((current) => [
          {
            ...item,
            id: `work-${Date.now()}`,
            color: "from-sky-100 to-blue-200",
          },
          ...current,
        ]);
        showNotice("Portfolio work added.");
      },
      removePortfolioItem: (id) => {
        setPortfolio((current) => current.filter((item) => item.id !== id));
        showNotice("Portfolio work removed.");
      },
      addServiceArea: (area) => {
        setServiceAreas((current) =>
          current.some((item) => item.toLowerCase() === area.toLowerCase())
            ? current
            : [...current, area],
        );
        showNotice("Service area added.");
      },
      removeServiceArea: (area) => {
        setServiceAreas((current) => current.filter((item) => item !== area));
        showNotice("Service area removed.");
      },
      addTeamMember: (member) => {
        const initials = member.name
          .split(" ")
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        setTeamMembers((current) => [
          ...current,
          { ...member, id: `member-${Date.now()}`, initials },
        ]);
        showNotice("Team member added.");
      },
      removeTeamMember: (id) => {
        setTeamMembers((current) =>
          current.filter((member) => member.id !== id),
        );
        showNotice("Team member removed.");
      },
      toggleNotification: (key) => {
        setNotifications((current) => ({ ...current, [key]: !current[key] }));
        showNotice("Notification preference updated.");
      },
      replyToReview: (id, reply) => {
        setReviews((current) =>
          current.map((review) =>
            review.id === id ? { ...review, reply } : review,
          ),
        );
        showNotice("Reply saved.");
      },
      clearNotice: () => setNotice(null),
    }),
    [
      availability,
      notice,
      notifications,
      portfolio,
      profile,
      leads,
      reviews,
      serviceAreas,
      services,
      showNotice,
      teamMembers,
      transactions,
      creditBalance,
    ],
  );

  return (
    <ProfessionalContext.Provider value={value}>
      {children}
    </ProfessionalContext.Provider>
  );
}

export function useProfessional() {
  const context = useContext(ProfessionalContext);
  if (!context) {
    throw new Error("useProfessional must be used within ProfessionalProvider");
  }
  return context;
}
