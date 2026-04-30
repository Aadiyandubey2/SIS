"use client";

import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CalendarDays,
  Trophy,
  BarChart3,
} from "lucide-react";
import type { Exam } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  Ongoing: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Exam Name
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ row }) => (
      <div>
        <span className="text-sm font-medium">{row.getValue("name")}</span>
        <p className="text-xs text-muted-foreground">{row.original.subject}</p>
      </div>
    ),
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("class")}</span>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("date")}</span>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("duration")}</span>
    ),
  },
  {
    accessorKey: "total_marks",
    header: "Marks",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("total_marks")}</span>
    ),
  },
  {
    accessorKey: "avg_score",
    header: "Avg Score",
    cell: ({ row }) => {
      const avg = row.getValue("avg_score") as number | undefined;
      return (
        <span className="text-sm text-muted-foreground">
          {avg !== undefined && avg !== null ? avg.toFixed(1) : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "pass_rate",
    header: "Pass %",
    cell: ({ row }) => {
      const rate = row.getValue("pass_rate") as number | undefined;
      return (
        <span className={cn("text-sm", rate !== undefined && rate !== null && rate < 85 ? "text-yellow-600" : "text-muted-foreground")}>
          {rate !== undefined && rate !== null ? `${rate}%` : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        className={cn(
          "text-[11px] font-medium",
          statusColors[row.getValue("status") as string],
          "hover:opacity-90"
        )}
      >
        {row.getValue("status")}
      </Badge>
    ),
  },
];

interface ExamsClientProps {
  exams: Exam[];
}

export default function ExamsClient({ exams }: ExamsClientProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const filteredData = useMemo(() => {
    let data = [...exams];
    if (statusFilter !== "all") data = data.filter((e) => e.status === statusFilter);
    if (classFilter !== "all") data = data.filter((e) => e.class === classFilter);
    return data;
  }, [statusFilter, classFilter, exams]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  const scheduledCount = exams.filter((e) => e.status === "Scheduled").length;
  const completedCount = exams.filter((e) => e.status === "Completed").length;
  const completedExams = exams.filter((e) => e.avg_score !== undefined && e.avg_score !== null);
  const avgOverall = completedExams.length > 0
    ? (completedExams.reduce((sum, e) => sum + (e.avg_score || 0), 0) / completedExams.length).toFixed(1)
    : "—";

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Exams</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Examination schedule, results, and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Exams</p>
              <p className="text-lg font-semibold">{exams.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50">
              <CalendarDays className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Scheduled</p>
              <p className="text-lg font-semibold">{scheduledCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50">
              <Trophy className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-lg font-semibold">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Score</p>
              <p className="text-lg font-semibold">{avgOverall}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search exams..." className="pl-9 h-9 text-sm" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
        <Select value={classFilter} onValueChange={(v) => v !== null && setClassFilter(v)}>
          <SelectTrigger className="h-9 w-[130px] text-sm"><SelectValue placeholder="Class" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => v !== null && setStatusFilter(v)}>
          <SelectTrigger className="h-9 w-[130px] text-sm"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border border-border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="hover:bg-transparent bg-muted/30">
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="text-xs font-medium h-10">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/40 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">No exams found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</span>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft className="h-4 w-4" /></Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}
