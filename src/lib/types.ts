// ─── Types ───────────────────────────────────────────────────────
export interface Student {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: "Male" | "Female";
  dob: string;
  blood_group: string;
  class: string;
  section: string;
  roll_no: number;
  admission_date: string;
  status: "Active" | "Inactive" | "Suspended";
  fee_status: "Paid" | "Pending" | "Overdue";
  avatar?: string;
  parent_name: string;
  address: string;
  attendance_rate: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  class: string;
  teacher: string;
  schedule: string;
  students_count: number;
  status: "Active" | "Upcoming" | "Completed";
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  student_name: string;
  class: string;
  section: string;
  date: string;
  status: "Present" | "Absent" | "Late" | "Excused";
  check_in?: string;
  check_out?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  class: string;
  date: string;
  duration: string;
  total_marks: number;
  status: "Scheduled" | "Ongoing" | "Completed" | "Cancelled";
  avg_score?: number;
  pass_rate?: number;
}

export interface FeeRecord {
  id: string;
  student_id: string;
  student_name: string;
  class: string;
  fee_type: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  status: "Paid" | "Pending" | "Overdue";
  payment_method?: string;
}

export interface Activity {
  id: string;
  student: string;
  action: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
}

export interface Alert {
  id: string;
  type: "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: string;
}

export interface DashboardStats {
  total_students: number;
  total_revenue: number;
  attendance_rate: number;
  pending_fees: number;
  active_classes: number;
  total_teachers: number;
  student_growth: number;
  revenue_growth: number;
  attendance_change: number;
  fee_collection_rate: number;
}
