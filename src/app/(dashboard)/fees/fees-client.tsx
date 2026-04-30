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
  IndianRupee,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import type { FeeRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Paid: "bg-green-50 text-green-700 border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Overdue: "bg-red-50 text-red-700 border-red-200",
};

const columns: ColumnDef<FeeRecord>[] = [
  {
    accessorKey: "id",
    header: "Txn ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-muted-foreground">
        {row.getValue("id")}
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
      <div>
        <span className="text-sm font-medium">{row.getValue("student_name")}</span>
        <p className="text-xs text-muted-foreground">Class {row.original.class}</p>
      </div>
    ),
  },
  {
    accessorKey: "fee_type",
    header: "Fee Type",
    cell: ({ row }) => (
      <span className="text-sm">{row.getValue("fee_type")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1 hover:text-foreground transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount
        <ArrowUpDown className="h-3 w-3" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        ₹{(row.getValue("amount") as number).toLocaleString("en-IN")}
      </span>
    ),
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.getValue("due_date")}</span>
    ),
  },
  {
    accessorKey: "paid_date",
    header: "Paid Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {(row.getValue("paid_date") as string) || "—"}
      </span>
    ),
  },
  {
    accessorKey: "payment_method",
    header: "Method",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {(row.getValue("payment_method") as string) || "—"}
      </span>
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
];

interface FeesClientProps {
  feeRecords: FeeRecord[];
}

export default function FeesClient({ feeRecords }: FeesClientProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return feeRecords;
    return feeRecords.filter((f) => f.status === statusFilter);
  }, [statusFilter, feeRecords]);

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

  const totalCollected = feeRecords
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + f.amount, 0);
  const totalPending = feeRecords
    .filter((f) => f.status === "Pending")
    .reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = feeRecords
    .filter((f) => f.status === "Overdue")
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Fees</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Fee collection and payment tracking
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-lg font-semibold">
                ₹{((totalCollected + totalPending + totalOverdue) / 1000).toFixed(0)}K
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Collected</p>
              <p className="text-lg font-semibold">
                ₹{(totalCollected / 1000).toFixed(0)}K
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-lg font-semibold">
                ₹{(totalPending / 1000).toFixed(0)}K
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-border shadow-none">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Overdue</p>
              <p className="text-lg font-semibold text-red-600">
                ₹{(totalOverdue / 1000).toFixed(0)}K
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <div className="relative w-full sm:min-w-[240px] sm:max-w-sm sm:flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by student or ID..." className="pl-9 h-9 text-sm" value={globalFilter} onChange={(e) => setGlobalFilter(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={(v) => v !== null && setStatusFilter(v)}>
          <SelectTrigger className="h-9 w-full text-sm sm:w-[130px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-muted-foreground">No records found.</TableCell>
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
