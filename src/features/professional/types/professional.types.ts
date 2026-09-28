export type ProviderType = "individual" | "team" | "company";
export type AvailabilityStatus = "available" | "busy" | "unavailable";
export type LeadStatus = "new" | "viewed" | "contacted";
export type PriceType =
  "Fixed" | "Starting From" | "Price Range" | "Per Unit" | "Inspection Quote";

export interface ProfessionalProfile {
  id: string;
  providerType: ProviderType;
  name: string;
  legalName: string;
  description: string;
  yearsExperience: number;
  phone: string;
  lineAccount: string;
  email: string;
  languages: string[];
  specializations: string[];
  baseLocation: string;
  rating: number;
  reviewCount: number;
  teamSize?: number;
  teamLead?: string;
  registrationNumber?: string;
  taxId?: string;
  businessHours?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skills: string[];
  yearsExperience: number;
  initials: string;
}

export interface Lead {
  id: string;
  customerName: string;
  service: string;
  location: string;
  date: string;
  phone: string;
  message: string;
  leadFee: number;
  status: LeadStatus;
}

export interface ProfessionalService {
  id: string;
  name: string;
  category: string;
  price: string;
  priceType: PriceType;
  description: string;
  active: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  completedAt: string;
  beforeAfter: boolean;
  color: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  service: string;
  date: string;
  feedback: string;
  verified: boolean;
  reply?: string;
}

export interface Availability {
  status: AvailabilityStatus;
  workingDays: string[];
  startTime: string;
  endTime: string;
  nextAvailableDate: string;
}

export interface NotificationSettings {
  email: boolean;
  customerLeads: boolean;
  reviews: boolean;
  lowBalance: boolean;
}

export type WalletTransactionType =
  "top-up" | "lead-charge" | "refund" | "adjustment";

export interface WalletTransaction {
  id: string;
  type: WalletTransactionType;
  description: string;
  amount: number;
  date: string;
}
