"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    const next = pathname ? `?next=${encodeURIComponent(pathname)}` : "";

    supabase.auth.getSession().then(({ data }) => {
      if (!active) {
        return;
      }

      if (data.session) {
        setAllowed(true);
        setChecking(false);
        return;
      }

      setAllowed(false);
      router.replace(`/login${next}`);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }

      if (session) {
        setAllowed(true);
        setChecking(false);
        return;
      }

      setAllowed(false);
      router.replace(`/login${next}`);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  if (checking || !allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 text-muted-foreground">
        <div className="flex items-center gap-2 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking session...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
