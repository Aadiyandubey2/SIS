import type { ReactNode } from "react";
import Link from "next/link";
import { Database, GraduationCap, ShieldCheck, Users } from "lucide-react";

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
    <main className="min-h-screen bg-[#f7f7f5] px-4 py-8 text-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_430px]">
        <section className="hidden h-full min-h-[640px] flex-col justify-between rounded-lg border border-black/5 bg-white p-8 shadow-sm lg:flex">
          <Link className="flex items-center gap-2.5" href="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight">SIS</span>
          </Link>

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
          <Link
            className="mb-8 flex items-center justify-center gap-2.5 lg:hidden"
            href="/"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-background">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-semibold tracking-tight">SIS</span>
          </Link>
          {children}
        </section>
      </div>
    </main>
  );
}
