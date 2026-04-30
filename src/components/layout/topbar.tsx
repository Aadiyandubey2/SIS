"use client";

import { Search, Bell, ChevronDown, Menu } from "lucide-react";
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
import { useEffect, useRef } from "react";

interface TopbarProps {
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
}

export function Topbar({ onOpenCommandPalette, onToggleSidebar }: TopbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-focus search on mount
    searchRef.current?.focus();
  }, []);

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

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchRef}
          placeholder="Search... (⌘K)"
          className="pl-9 h-9 text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-ring"
          onClick={onOpenCommandPalette}
          readOnly
        />
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
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
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
