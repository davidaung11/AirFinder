"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type {
  CustomerProfile,
  CustomerRegistrationInput,
} from "../types/customer.types";

const STORAGE_KEY = "airfinder-demo-customer";
const demoCustomer: CustomerProfile = {
  fullName: "Narin Chaiyasit",
  phone: "089-246-8103",
  email: "customer@airfinder.demo",
  preferredArea: "Bang Na",
  initials: "NC",
};

interface CustomerAuthContextValue {
  customer: CustomerProfile | null;
  hydrated: boolean;
  login: (email: string) => void;
  register: (input: CustomerRegistrationInput) => void;
  updateProfile: (profile: Omit<CustomerProfile, "initials">) => void;
  logout: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(
  null,
);

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setCustomer(JSON.parse(stored) as CustomerProfile);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(hydrationTimer);
  }, []);

  function save(profile: CustomerProfile | null) {
    setCustomer(profile);
    if (profile)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    else window.localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <CustomerAuthContext.Provider
      value={{
        customer,
        hydrated,
        login: (email) => save({ ...demoCustomer, email }),
        register: (input) =>
          save({
            fullName: input.fullName,
            phone: input.phone,
            email: input.email,
            preferredArea: "",
            initials: initialsFor(input.fullName),
          }),
        updateProfile: (profile) =>
          save({ ...profile, initials: initialsFor(profile.fullName) }),
        logout: () => save(null),
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (!context)
    throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return context;
}
