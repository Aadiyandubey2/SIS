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
  UserCheck,
  UserX,
  Clock,
  AlertTriangle,
} from "lucide-react";
import type { AttendanceRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Present: "bg-green-50 text-green-700 border-green-200",
  Absent: "bg-red-50 text-red-700 border-red-200",
  Late: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Excused: "bg-blue-50 text-blue-700 border-blue-200",
};

const columns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: "student_id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.getValue("student_id")}
      </span>
    ),
  },
  {
    accessorKey: "student_name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium">{row.getValue("student_name")}</span>
    ),
  },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.class}-{row.original.section}
      </span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("date")}</span>
    ),
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
  {
    accessorKey: "check_in",
    header: "Check In",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("check_in") || "—"}
      </span>
    ),
  },
  {
    accessorKey: "check_out",
    header: "Check Out",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.getValue("check_out") || "—"}
      </span>
    ),
  },
];

interface AttendanceClientProps {
  records: AttendanceRecord[];
}

export default function AttendanceClient({ records }: AttendanceClientProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");

  const filteredData = useMemo(() => {
    let data = [...records];
    if (statusFilter !== "all") {
      data = data.filter((r) => r.status === statusFilter);
    }
    if (classFilter !== "all") {
      data = data.filter((r) => r.class === classFilter);
    }
    return data;
  }, [statusFilter, classFilter, records]);

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
    initialState: { pagination: { pageSize: 20 } },
  });

  const presentCount = records.filter((r) => r.status === "Present").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const lateCount = records.filter((r) => r.status === "Late").length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Attendance</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Today&apos;s attendance records — {records[0]?.date}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50">
              <UserCheck className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Present</p>
              <p className="text-lg font-semibold">{presentCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50">
              <UserX className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Absent</p>
              <p className="text-lg font-semibold">{absentCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Late</p>
              <p className="text-lg font-semibold">{lateCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rate</p>
              <p className="text-lg font-semibold">
                {records.length > 0
                  ? ((presentCount / records.length) * 100).toFixed(1)
                  : 0}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:min-w-[240px] sm:max-w-sm sm:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-9 h-9 text-sm"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>
        <Select value={classFilter} onValueChange={(v) => v !== null && setClassFilter(v)}>
          <SelectTrigger className="h-9 w-full text-sm sm:w-[130px]">
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="8">Class 8</SelectItem>
            <SelectItem value="9">Class 9</SelectItem>
            <SelectItem value="10">Class 10</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => v !== null && setStatusFilter(v)}>
          <SelectTrigger className="h-9 w-full text-sm sm:w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Present">Present</SelectItem>
            <SelectItem value="Absent">Absent</SelectItem>
            <SelectItem value="Late">Late</SelectItem>
            <SelectItem value="Excused">Excused</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="rounded-md border border-border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent bg-muted/30">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-medium h-10">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
