"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabase";

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
}

export function Topbar({ onOpenCommandPalette, onToggleSidebar }: TopbarProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("Admin");
  const [userEmail, setUserEmail] = useState("Administrator");

  useEffect(() => {
    let active = true;

    const setUserFromSession = (email?: string, fullName?: unknown) => {
      const nameFromMetadata =
        typeof fullName === "string" ? fullName.trim() : "";
      const nameFromEmail = email?.split("@")[0] ?? "";

      setUserName(nameFromMetadata || nameFromEmail || "Admin");
      setUserEmail(email || "Administrator");
    };

    supabase.auth.getUser().then(({ data }) => {
      if (!active) {
        return;
      }

      setUserFromSession(
        data.user?.email,
        data.user?.user_metadata?.full_name
      );
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) {
        return;
      }

      setUserFromSession(
        session?.user.email,
        session?.user.user_metadata?.full_name
      );
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Signed out successfully");
    router.push("/login");
    router.refresh();
  }

  const initials =
    userName
      .split(/\s+/)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  return (
    <header className="sticky top-0 z-30 flex h-14 min-w-0 items-center gap-2 border-b border-border bg-white px-3 sm:gap-3 sm:px-4 md:px-6">
      <button
        aria-label="Toggle sidebar"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        onClick={onToggleSidebar}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div
        className="relative min-w-0 flex-1 cursor-pointer sm:max-w-md"
        onClick={onOpenCommandPalette}
      >
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <div className="flex h-9 items-center rounded-md bg-muted/50 pl-9 pr-3 text-sm text-muted-foreground transition-colors hover:bg-muted">
          <span className="truncate">
            <span className="sm:hidden">Search</span>
            <span className="hidden sm:inline">Search... (Ctrl K)</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          onClick={() => toast.info("No new notifications")}
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -right-0.5 -top-0.5 h-4 min-w-4 border-0 bg-red-600 px-1 text-[10px] text-white hover:bg-red-600">
            3
          </Badge>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-1.5 text-sm transition-colors hover:bg-muted sm:px-2">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-foreground text-xs text-background">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden flex-col items-start md:flex">
              <span className="text-sm font-medium leading-none">
                {userName}
              </span>
              <span className="mt-0.5 max-w-[160px] truncate text-[11px] leading-none text-muted-foreground">
                {userEmail}
              </span>
            </div>
            <ChevronDown className="hidden h-3 w-3 text-muted-foreground md:block" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onSelect={() => toast.info("Profile page coming soon")}
            >
              <User className="mr-2 h-3.5 w-3.5" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => toast.info("Settings page coming soon")}
            >
              <Settings className="mr-2 h-3.5 w-3.5" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onSelect={() => {
                void handleSignOut();
              }}
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
