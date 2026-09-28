import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CustomerAuthProvider } from "@/features/customer-auth/context/customer-auth-context";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AirFinder | Trusted Air-Conditioning Professionals",
    template: "%s | AirFinder",
  },
  description:
    "Find and compare trusted air-conditioning professionals across Bangkok and Samut Prakan.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full">
        <CustomerAuthProvider>{children}</CustomerAuthProvider>
      </body>
    </html>
  );
}
