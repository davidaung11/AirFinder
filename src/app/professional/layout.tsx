import type { ReactNode } from "react";

import { ProfessionalShell } from "@/features/professional/components/professional-shell";
import { ProfessionalProvider } from "@/features/professional/context/professional-context";

export default function ProfessionalLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ProfessionalProvider>
      <ProfessionalShell>{children}</ProfessionalShell>
    </ProfessionalProvider>
  );
}
