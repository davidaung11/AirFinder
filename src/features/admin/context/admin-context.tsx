"use client";
import { createContext, useContext, useState, type ReactNode } from "react";
import {
  adminComplaints,
  adminProfessionals,
  adminReviews,
  adminVerifications,
} from "../data/admin.mock";
import type {
  AdminProfessional,
  AdminReview,
  Complaint,
  ProfessionalStatus,
  ReportStatus,
  Verification,
  VerificationStatus,
} from "../types/admin.types";
interface AdminContextValue {
  professionals: AdminProfessional[];
  reviews: AdminReview[];
  complaints: Complaint[];
  verifications: Verification[];
  updateProfessional: (id: string, status: ProfessionalStatus) => void;
  moderateReview: (id: string, visible: boolean) => void;
  updateComplaint: (id: string, status: ReportStatus) => void;
  updateVerification: (id: string, status: VerificationStatus) => void;
}
const AdminContext = createContext<AdminContextValue | null>(null);
export function AdminProvider({ children }: { children: ReactNode }) {
  const [professionals, setProfessionals] = useState(adminProfessionals);
  const [reviews, setReviews] = useState(adminReviews);
  const [complaints, setComplaints] = useState(adminComplaints);
  const [verifications, setVerifications] = useState(adminVerifications);
  return (
    <AdminContext.Provider
      value={{
        professionals,
        reviews,
        complaints,
        verifications,
        updateProfessional: (id, status) =>
          setProfessionals((items) =>
            items.map((item) => (item.id === id ? { ...item, status } : item)),
          ),
        moderateReview: (id, visible) =>
          setReviews((items) =>
            items.map((item) => (item.id === id ? { ...item, visible } : item)),
          ),
        updateComplaint: (id, status) =>
          setComplaints((items) =>
            items.map((item) => (item.id === id ? { ...item, status } : item)),
          ),
        updateVerification: (id, status) =>
          setVerifications((items) =>
            items.map((item) => (item.id === id ? { ...item, status } : item)),
          ),
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used inside AdminProvider");
  return context;
}
