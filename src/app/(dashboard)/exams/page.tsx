import { getExams } from "@/lib/db";
import ExamsClient from "./exams-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exams — SIS",
  description:
    "Manage examination schedules, view results, pass rates, and academic performance analytics.",
};

export default async function ExamsPage() {
  const exams = await getExams();
  return <ExamsClient exams={exams} />;
}
