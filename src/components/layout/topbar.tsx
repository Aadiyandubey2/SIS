"use client";

import { Search, Bell, ChevronDown, Menu, User, Settings, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
}

export function Topbar({ onOpenCommandPalette, onToggleSidebar }: TopbarProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-white px-4 md:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onToggleSidebar}
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search — click opens command palette */}
      <div
        className="relative flex-1 max-w-md cursor-pointer"
        onClick={onOpenCommandPalette}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <div className="flex h-9 items-center rounded-md bg-muted/50 pl-9 pr-3 text-sm text-muted-foreground transition-colors hover:bg-muted">
          <span>Search... (⌘K)</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button
          onClick={() => toast.info("No new notifications")}
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 text-[10px] bg-red-600 text-white hover:bg-red-600 border-0">
            3
          </Badge>
        </button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted transition-colors cursor-pointer">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs bg-foreground text-background">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium leading-none">
                  Admin
                </span>
                <span className="text-[11px] text-muted-foreground leading-none mt-0.5">
                  Administrator
                </span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden md:block" />
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
                toast.success("Signed out successfully");
                router.push("/");
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
