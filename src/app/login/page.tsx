import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to the SIS dashboard.",
};

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string | string[];
  }>;
};

function getRedirectTo(next: string | string[] | undefined) {
  const path = Array.isArray(next) ? next[0] : next;

  if (path && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }

  return "/dashboard";
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <AuthShell>
      <AuthForm mode="login" redirectTo={getRedirectTo(params?.next)} />
    </AuthShell>
  );
}
