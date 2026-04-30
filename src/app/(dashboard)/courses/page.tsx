import { getCourses } from "@/lib/db";
import CoursesClient from "./courses-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — SIS",
  description:
    "View and manage course curriculum, teacher assignments, schedules, and student enrollment.",
};

export default async function CoursesPage() {
  const courses = await getCourses();
  return <CoursesClient courses={courses} />;
}
