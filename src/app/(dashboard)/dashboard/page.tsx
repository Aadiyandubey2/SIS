import {
  Users,
  IndianRupee,
  CalendarCheck,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardStats, getActivities, getAlerts } from "@/lib/db";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — SIS",
  description:
    "Overview of your institution's key metrics including students, revenue, attendance, and fees.",
};

const alertIcons = {
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const alertColors = {
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
};

export default async function DashboardPage() {
  const [dashboardStats, recentActivity, alertsList] = await Promise.all([
    getDashboardStats(),
    getActivities(),
    getAlerts(),
  ]);

  const kpiCards = [
    {
      title: "Total Students",
      value: dashboardStats.total_students.toLocaleString("en-IN"),
      change: `+${dashboardStats.student_growth}%`,
      trend: "up" as const,
      icon: Users,
    },
    {
      title: "Revenue",
      value: `₹${(dashboardStats.total_revenue / 100000).toFixed(1)}L`,
      change: `+${dashboardStats.revenue_growth}%`,
      trend: "up" as const,
      icon: IndianRupee,
    },
    {
      title: "Attendance Rate",
      value: `${dashboardStats.attendance_rate}%`,
      change: `${dashboardStats.attendance_change}%`,
      trend: "down" as const,
      icon: CalendarCheck,
    },
    {
      title: "Pending Fees",
      value: `₹${(dashboardStats.pending_fees / 100000).toFixed(1)}L`,
      change: `${dashboardStats.fee_collection_rate}% collected`,
      trend: "neutral" as const,
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Overview of your institution&apos;s key metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card) => (
          <Card
            key={card.title}
            className="border border-border shadow-none hover:-translate-y-0.5 transition-transform duration-150"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </span>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-foreground">
                  {card.value}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-1">
                {card.trend === "up" && (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                )}
                {card.trend === "down" && (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span
                  className={cn(
                    "text-xs",
                    card.trend === "up"
                      ? "text-green-600"
                      : card.trend === "down"
                      ? "text-red-600"
                      : "text-muted-foreground"
                  )}
                >
                  {card.change}
                </span>
                {card.trend !== "neutral" && (
                  <span className="text-xs text-muted-foreground">
                    vs last month
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity Table — 2/3 width */}
        <Card className="lg:col-span-2 border border-border shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-xs font-medium h-9">
                      Student
                    </TableHead>
                    <TableHead className="text-xs font-medium h-9">
                      Action
                    </TableHead>
                    <TableHead className="text-xs font-medium h-9">
                      Date
                    </TableHead>
                    <TableHead className="text-xs font-medium h-9">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentActivity.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="py-2.5 text-sm font-medium">
                        {item.student}
                      </TableCell>
                      <TableCell className="py-2.5 text-sm text-muted-foreground">
                        {item.action}
                      </TableCell>
                      <TableCell className="py-2.5 text-sm text-muted-foreground">
                        {item.date}
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge
                          variant={
                            item.status === "Completed" ? "default" : "secondary"
                          }
                          className={cn(
                            "text-[11px] font-medium",
                            item.status === "Completed"
                              ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-50"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50"
                          )}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Panel — 1/3 width */}
        <Card className="border border-border shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {alertsList.map((alert) => {
                const Icon = alertIcons[alert.type];
                return (
                  <div
                    key={alert.id}
                    className="flex gap-3 px-5 py-3 hover:bg-muted/50 transition-colors"
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 mt-0.5 shrink-0",
                        alertColors[alert.type]
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {alert.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[11px] text-muted-foreground">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
