import type { ReactNode } from "react";
import { Database, ShieldCheck, Users } from "lucide-react";

import { BrandLogo } from "@/components/brand-logo";

const highlights = [
  {
    icon: Database,
    label: "Supabase data",
  },
  {
    icon: ShieldCheck,
    label: "Protected dashboard",
  },
  {
    icon: Users,
    label: "School admin access",
  },
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f7f5] px-3 py-5 text-foreground sm:px-4 sm:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-2.5rem)] w-full max-w-6xl items-center gap-8 sm:min-h-[calc(100vh-4rem)] lg:grid-cols-[1fr_430px] lg:gap-10">
        <section className="hidden h-full min-h-[640px] flex-col justify-between rounded-lg border border-black/5 bg-white p-8 shadow-sm lg:flex">
          <BrandLogo href="/" priority />

          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Student Information System
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight">
              Manage your school workspace securely.
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground">
              Sign in to continue managing students, courses, attendance,
              exams, and fees from the SIS dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div
                className="rounded-lg border border-border bg-muted/30 p-4"
                key={item.label}
              >
                <item.icon className="h-5 w-5 text-foreground" />
                <p className="mt-3 text-sm font-medium leading-snug">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[430px]">
          <BrandLogo className="mb-5 justify-center sm:mb-8 lg:hidden" href="/" priority />
          {children}
        </section>
      </div>
    </main>
  );
}
