import { getAttendanceRecords } from "@/lib/db";
import AttendanceClient from "./attendance-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance — SIS",
  description:
    "Track daily student attendance records, check-in/check-out times, and attendance rates.",
};

export default async function AttendancePage() {
  const records = await getAttendanceRecords();
  return <AttendanceClient records={records} />;
}
