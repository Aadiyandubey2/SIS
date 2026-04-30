import { getStudents } from "@/lib/db";
import StudentsClient from "./students-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students — SIS",
  description:
    "Manage student enrollment, view academic records, attendance rates, and fee status.",
};

export default async function StudentsPage() {
  const students = await getStudents();
  return <StudentsClient students={students} />;
}
