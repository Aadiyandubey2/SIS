"use client";

import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  IndianRupee,
  UserPlus,
  Download,
  Search,
} from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();

  const runCommand = (command: () => void) => {
    onOpenChange(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/students"))}
          >
            <Users className="mr-2 h-4 w-4" />
            Students
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/courses"))}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Courses
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/attendance"))}
          >
            <CalendarCheck className="mr-2 h-4 w-4" />
            Attendance
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/exams"))}
          >
            <ClipboardList className="mr-2 h-4 w-4" />
            Exams
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => router.push("/fees"))}
          >
            <IndianRupee className="mr-2 h-4 w-4" />
            Fees
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() =>
              runCommand(() => router.push("/students/new"))
            }
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Student
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Download className="mr-2 h-4 w-4" />
            Export Student Data
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => {})}>
            <Search className="mr-2 h-4 w-4" />
            Search Student by ID
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
