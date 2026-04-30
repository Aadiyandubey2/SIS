"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
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
import { supabase } from "@/lib/supabase";

type AuthMode = "login" | "signup";

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

export function AuthForm({ mode, redirectTo }: AuthFormProps) {
  const router = useRouter();
  const isSignup = mode === "signup";
  const safeRedirectTo = getSafeRedirect(redirectTo);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setNotice("");

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: fullName.trim()
              ? {
                  full_name: fullName.trim(),
                }
              : undefined,
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/login`
                : undefined,
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
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      toast.success("Signed in successfully");
      router.push(safeRedirectTo);
      router.refresh();
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

  return (
    <Card className="w-full rounded-lg border-border/80 shadow-sm">
      <CardHeader className="gap-2 px-6 pt-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {isSignup ? "Create your account" : "Welcome back"}
        </CardTitle>
        <CardDescription>
          {isSignup
            ? "Use your school email to create an SIS account."
            : "Sign in with your SIS Supabase account."}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="full-name">Full name</Label>
              <Input
                id="full-name"
                autoComplete="name"
                className="h-10"
                disabled={loading}
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
              disabled={loading}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@school.edu"
              required
              type="email"
              value={email}
            />
          </div>

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
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Confirm your password"
                required
                type="password"
                value={confirmPassword}
              />
            </div>
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
            ) : (
              <>
                {isSignup ? "Sign up" : "Log in"}
                <ArrowRight />
              </>
            )}
          </Button>
        </form>

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
