import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create an SIS dashboard account.",
};

export default function SignupPage() {
  return (
    <AuthShell>
      <AuthForm mode="signup" redirectTo="/dashboard" />
    </AuthShell>
  );
}
