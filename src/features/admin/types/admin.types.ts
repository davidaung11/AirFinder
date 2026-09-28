export type ProfessionalStatus = "pending" | "active" | "suspended" | "blocked";
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
export type ReportStatus = "open" | "under-review" | "resolved" | "dismissed";
export type VerificationStatus =
  "not-submitted" | "pending" | "verified" | "rejected";
export interface AdminProfessional {
  id: string;
  name: string;
  type: "Individual" | "Team" | "Company";
  verification: VerificationStatus;
  rating: number;
  leads: number;
  balance: number;
  complaints: number;
  status: ProfessionalStatus;
}
export interface AdminPayment {
  id: string;
  professional: string;
  type: "Top Up" | "Lead Charge" | "Refund" | "Adjustment";
  amount: number;
  status: PaymentStatus;
  date: string;
}
export interface AdminReview {
  id: string;
  customer: string;
  professional: string;
  rating: number;
  comment: string;
  visible: boolean;
  date: string;
}
export interface Complaint {
  id: string;
  reporter: string;
  professional: string;
  category:
    | "Scam"
    | "Fake Information"
    | "No Show"
    | "Overcharging"
    | "Unsafe Behavior"
    | "Poor Service"
    | "Other";
  description: string;
  date: string;
  status: ReportStatus;
}
export interface Verification {
  id: string;
  professional: string;
  category: "Phone" | "Identity" | "Business" | "Certificate";
  status: VerificationStatus;
  submitted: string;
}
