import { supabase } from "./supabase";
import type {
  Student,
  Course,
  AttendanceRecord,
  Exam,
  FeeRecord,
  Activity,
  Alert,
  DashboardStats,
} from "./types";

// ─── Students ────────────────────────────────────────────────────
export async function getStudents(): Promise<Student[]> {
  const { data, error } = await supabase
    .from("students")
    .select("*")
    .order("roll_no", { ascending: true });
  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }
  return data as Student[];
}

// ─── Courses ─────────────────────────────────────────────────────
export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("code", { ascending: true });
  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
  return data as Course[];
}

// ─── Attendance ──────────────────────────────────────────────────
export async function getAttendanceRecords(): Promise<AttendanceRecord[]> {
  const { data, error } = await supabase
    .from("attendance_records")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching attendance:", error);
    return [];
  }
  return data as AttendanceRecord[];
}

// ─── Exams ───────────────────────────────────────────────────────
export async function getExams(): Promise<Exam[]> {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .order("date", { ascending: true });
  if (error) {
    console.error("Error fetching exams:", error);
    return [];
  }
  return data as Exam[];
}

// ─── Fees ────────────────────────────────────────────────────────
export async function getFeeRecords(): Promise<FeeRecord[]> {
  const { data, error } = await supabase
    .from("fee_records")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching fees:", error);
    return [];
  }
  return data as FeeRecord[];
}

// ─── Activities ──────────────────────────────────────────────────
export async function getActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: false });
  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
  return data as Activity[];
}

// ─── Alerts ──────────────────────────────────────────────────────
export async function getAlerts(): Promise<Alert[]> {
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching alerts:", error);
    return [];
  }
  return data as Alert[];
}

// ─── Dashboard Stats ─────────────────────────────────────────────
export async function getDashboardStats(): Promise<DashboardStats> {
  const { data, error } = await supabase
    .from("dashboard_stats")
    .select("*")
    .single();
  if (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      total_students: 0,
      total_revenue: 0,
      attendance_rate: 0,
      pending_fees: 0,
      active_classes: 0,
      total_teachers: 0,
      student_growth: 0,
      revenue_growth: 0,
      attendance_change: 0,
      fee_collection_rate: 0,
    };
  }
  return data as DashboardStats;
}
