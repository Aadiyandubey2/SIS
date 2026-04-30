"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2, MailCheck, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";
type AuthMethod = "otp" | "password";

interface AuthFormProps {
  mode: AuthMode;
  redirectTo?: string;
}

function getSafeRedirect(path: string | undefined) {
  if (path && path.startsWith("/") && !path.startsWith("//")) {
    return path;
  }

  return "/dashboard";
}

function getRedirectUrl(path: string) {
  if (typeof window === "undefined") {
    return undefined;
  }

  return `${window.location.origin}${path}`;
}

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const safeRedirectTo = getSafeRedirect(redirectTo);

  const [method, setMethod] = useState<AuthMethod>("otp");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [resendIn, setResendIn] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) {
        router.replace(safeRedirectTo);
      }
    });

    return () => {
      active = false;
    };
  }, [router, safeRedirectTo]);

  useEffect(() => {
    if (resendIn <= 0) {
      return;
    }

    const timer = window.setTimeout(() => {
      setResendIn((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [resendIn]);

  function resetMessages() {
    setError("");
    setNotice("");
  }

  function switchMethod(nextMethod: AuthMethod) {
    setMethod(nextMethod);
    setOtp("");
    setOtpSent(false);
    resetMessages();
  }

  function getNormalizedEmail() {
    return email.trim().toLowerCase();
  }

  async function requestEmailOtp() {
    const normalizedEmail = getNormalizedEmail();

    if (!normalizedEmail) {
      setError("Enter your email address first.");
      return;
    }

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: normalizedEmail,
      options: {
        shouldCreateUser: isSignup,
        data:
          isSignup && fullName.trim()
            ? {
                full_name: fullName.trim(),
              }
            : undefined,
        emailRedirectTo: getRedirectUrl(safeRedirectTo),
      },
    });

    if (otpError) {
      throw otpError;
    }

    setOtpSent(true);
    setOtp("");
    setResendIn(45);
    const message = `We sent a 6-digit OTP to ${normalizedEmail}.`;
    setNotice(message);
    toast.success("OTP sent");
  }

  async function verifyEmailOtp() {
    const normalizedEmail = getNormalizedEmail();
    const token = otp.replace(/\D/g, "");

    if (token.length !== 6) {
      setError("Enter the 6-digit OTP from your email.");
      return;
    }

    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: normalizedEmail,
      token,
      type: "email",
      options: {
        redirectTo: getRedirectUrl(safeRedirectTo),
      },
    });

    if (verifyError) {
      throw verifyError;
    }

    toast.success(isSignup ? "Account created" : "Signed in successfully");
    router.push(safeRedirectTo);
    router.refresh();
  }

  async function handlePasswordAuth() {
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (isSignup) {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: getNormalizedEmail(),
        password,
        options: {
          data: fullName.trim()
            ? {
                full_name: fullName.trim(),
              }
            : undefined,
          emailRedirectTo: getRedirectUrl(safeRedirectTo),
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.session) {
        toast.success("Account created");
        router.push(safeRedirectTo);
        router.refresh();
        return;
      }

      const message = "Check your email to confirm your account.";
      setNotice(message);
      toast.success(message);
      setPassword("");
      setConfirmPassword("");
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: getNormalizedEmail(),
      password,
    });

    if (signInError) {
      throw signInError;
    }

    toast.success("Signed in successfully");
    router.push(safeRedirectTo);
    router.refresh();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (method === "otp") {
        if (otpSent) {
          await verifyEmailOtp();
          return;
        }

        await requestEmailOtp();
        return;
      }

      await handlePasswordAuth();
    } catch (authError) {
      const message =
        authError instanceof Error
          ? authError.message
          : "Unable to complete authentication.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    resetMessages();
    setLoading(true);

    try {
      await requestEmailOtp();
    } catch (authError) {
      const message =
        authError instanceof Error
          ? authError.message
          : "Unable to resend OTP.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full rounded-lg border-border/80 shadow-sm">
      <CardHeader className="gap-2 px-6 pt-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isSignup
            ? "Use email OTP to create your SIS account."
            : "Sign in with an email OTP or your password."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="mb-4 grid grid-cols-2 rounded-lg bg-muted p-1">
          {(["otp", "password"] as const).map((item) => (
            <button
              className={cn(
                "h-9 rounded-md text-sm font-medium transition-colors",
                method === item
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              disabled={loading}
              key={item}
              onClick={() => switchMethod(item)}
              type="button"
            >
              {item === "otp" ? "Email OTP" : "Password"}
            </button>
          ))}
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                autoComplete="name"
                className="h-10"
                disabled={loading || otpSent}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="School admin"
                value={fullName}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              autoComplete="email"
              className="h-10"
              disabled={loading || otpSent}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@school.edu"
              required
              type="email"
              value={email}
            />
          </div>

          {method === "otp" && otpSent && (
            <div className="space-y-2">
              <Label htmlFor="otp">Email OTP</Label>
              <Input
                id="otp"
                autoComplete="one-time-code"
                className="h-12 text-center text-lg tracking-[0.35em]"
                disabled={loading}
                inputMode="numeric"
                maxLength={6}
                onChange={(event) =>
                  setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                pattern="[0-9]*"
                placeholder="000000"
                required
                type="text"
                value={otp}
              />
            </div>
          )}

          {method === "password" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  className="h-10"
                  disabled={loading}
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  required
                  type="password"
                  value={password}
                />
              </div>

              {isSignup && (
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <Input
                    id="confirm-password"
                    autoComplete="new-password"
                    className="h-10"
                    disabled={loading}
                    minLength={6}
                    onChange={(event) =>
                      setConfirmPassword(event.target.value)
                    }
                    placeholder="Confirm your password"
                    required
                    type="password"
                    value={confirmPassword}
                  />
                </div>
              )}
            </>
          )}

          {error && (
            <p className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {notice && (
            <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {notice}
            </p>
          )}

          <Button className="h-10 w-full" disabled={loading} type="submit">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : method === "otp" ? (
              <>
                {otpSent ? "Verify OTP" : "Send email OTP"}
                {otpSent ? <ArrowRight /> : <MailCheck />}
              </>
            ) : (
              <>
                {isSignup ? "Sign up" : "Log in"}
                <ArrowRight />
              </>
            )}
          </Button>
        </form>

        {method === "otp" && otpSent && (
          <div className="mt-4 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
            <button
              className="inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:text-muted-foreground"
              disabled={loading || resendIn > 0}
              onClick={() => void handleResendOtp()}
              type="button"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {resendIn > 0 ? `Resend in ${resendIn}s` : "Resend OTP"}
            </button>
            <button
              className="rounded-md px-2 py-1.5 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              disabled={loading}
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                resetMessages();
              }}
              type="button"
            >
              Change email
            </button>
          </div>
        )}

        <p className="mt-5 text-center text-sm text-muted-foreground">
          {isSignup ? "Already have an account?" : "Need an account?"}{" "}
          <Link
            className="font-medium text-foreground underline-offset-4 hover:underline"
            href={isSignup ? "/login" : "/signup"}
          >
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
