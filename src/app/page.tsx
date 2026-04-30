import Link from "next/link";
import {
  Users,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  IndianRupee,
  LayoutDashboard,
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Globe,
  BarChart3,
  GraduationCap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIS — Student Information System",
  description:
    "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees. Built for modern schools.",
};

const features = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Complete student profiles with enrollment, attendance rates, fee status, and academic records in one place.",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Course Curriculum",
    description:
      "Manage courses, assign teachers, set schedules, and track student enrollment across all classes.",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    icon: CalendarCheck,
    title: "Attendance Tracking",
    description:
      "Real-time daily attendance with check-in/check-out times, absence alerts, and automated rate calculation.",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: ClipboardList,
    title: "Exam Management",
    description:
      "Schedule exams, record results, track average scores and pass rates with detailed analytics.",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
  {
    icon: IndianRupee,
    title: "Fee Collection",
    description:
      "Track tuition, lab, and transport fees. Monitor paid, pending, and overdue balances per student.",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "KPI cards, trend indicators, recent activity feeds, and smart alerts — all at a glance.",
    color: "from-cyan-500/10 to-cyan-600/5",
    iconColor: "text-cyan-600",
  },
];

const stats = [
  { value: "2,847", label: "Students Managed" },
  { value: "15+", label: "Active Courses" },
  { value: "94.2%", label: "Attendance Rate" },
  { value: "₹12.4L", label: "Revenue Tracked" },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on Next.js with server components for instant page loads.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Supabase-powered backend with row-level security and real-time sync.",
  },
  {
    icon: Globe,
    title: "Deploy Anywhere",
    description: "Vercel-optimized. One-click deploy with automatic HTTPS and CDN.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">SIS</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Stats
            </a>
            <a href="#benefits" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
              Why SIS
            </a>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg"
          >
            <LayoutDashboard className="h-4 w-4" />
            <span className="hidden sm:inline">Open Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-50 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-50 blur-3xl" />
          <div className="absolute -bottom-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-emerald-50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 md:pt-32 md:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Enterprise-grade school management
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Student Information{" "}
              <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-600 bg-clip-text text-transparent">
                System
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-gray-500 sm:text-lg md:text-xl">
              A modern, data-driven dashboard for managing students, courses,
              attendance, exams, and fees — all in one unified platform.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 sm:w-auto"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md sm:w-auto"
              >
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section id="stats" className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-12 md:grid-cols-4 md:py-16">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Everything you need to run a school
            </h2>
            <p className="mt-4 text-base text-gray-500 md:text-lg">
              Six powerful modules, one seamless experience. From enrollment to fee collection, SIS handles it all.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="border-y border-gray-100 bg-gray-50/50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Built for performance
            </h2>
            <p className="mt-4 text-base text-gray-500 md:text-lg">
              Modern technology stack designed for speed, reliability, and scalability.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-gray-100 shadow-sm">
                  <benefit.icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-8 py-16 text-center md:px-16 md:py-20">
            {/* CTA background glow */}
            <div className="absolute inset-0 -z-0">
              <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full bg-violet-500/10 blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Ready to modernize your school?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-gray-400 md:text-lg">
                Start managing your institution with a powerful, intuitive dashboard that puts data at your fingertips.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:bg-gray-100 hover:-translate-y-0.5 sm:w-auto"
                >
                  Open Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Free to deploy
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Open source
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Supabase powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold">SIS</span>
            <span className="text-xs text-gray-400">v1.0</span>
          </div>
          <p className="text-xs text-gray-400">
            © 2026 Student Information System. Built with Next.js & Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
