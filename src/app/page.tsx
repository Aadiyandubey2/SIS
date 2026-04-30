import Link from "next/link";
import {
  Student,
  BookOpenText,
  CalendarCheck,
  Exam,
  CurrencyInr,
  ChartBar,
  ArrowRight,
  Lightning,
  ShieldCheck,
  Globe,
  GraduationCap,
  CheckCircle,
  ArrowUpRight,
  Users,
  Clock,
  ChartLineUp,
} from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIS — Student Information System",
  description:
    "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees. Built for modern schools.",
};

const features = [
  {
    icon: Student,
    title: "Student Management",
    description:
      "Complete student profiles with enrollment, attendance rates, fee status, and academic records in one place.",
  },
  {
    icon: BookOpenText,
    title: "Course Curriculum",
    description:
      "Manage courses, assign teachers, set schedules, and track student enrollment across all classes.",
  },
  {
    icon: CalendarCheck,
    title: "Attendance Tracking",
    description:
      "Real-time daily attendance with check-in/check-out times, absence alerts, and automated rate calculation.",
  },
  {
    icon: Exam,
    title: "Exam Management",
    description:
      "Schedule exams, record results, track average scores and pass rates with detailed analytics.",
  },
  {
    icon: CurrencyInr,
    title: "Fee Collection",
    description:
      "Track tuition, lab, and transport fees. Monitor paid, pending, and overdue balances per student.",
  },
  {
    icon: ChartBar,
    title: "Analytics Dashboard",
    description:
      "KPI cards, trend indicators, recent activity feeds, and smart alerts — all at a glance.",
  },
];

const pillars = [
  {
    icon: Lightning,
    title: "Lightning fast",
    description:
      "Built on Next.js with server components for instant page loads and seamless navigation.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & reliable",
    description:
      "Supabase-powered backend with row-level security, real-time sync, and automatic backups.",
  },
  {
    icon: Globe,
    title: "Deploy anywhere",
    description:
      "Vercel-optimized with one-click deploy, automatic HTTPS, edge caching, and global CDN.",
  },
];

const stats = [
  { value: "2,847", label: "Students Managed", icon: Users },
  { value: "15+", label: "Active Courses", icon: BookOpenText },
  { value: "94.2%", label: "Attendance Rate", icon: Clock },
  { value: "₹12.4L", label: "Revenue Tracked", icon: ChartLineUp },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ─── Navbar ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-black/[0.04] bg-[#fafafa]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a1a1a]">
              <GraduationCap size={16} weight="bold" className="text-white" />
            </div>
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-[#1a1a1a]">
              SIS
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#features"
              className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#666] transition-colors hover:text-[#1a1a1a]"
            >
              Features
            </a>
            <a
              href="#platform"
              className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#666] transition-colors hover:text-[#1a1a1a]"
            >
              Platform
            </a>
            <a
              href="#why-sis"
              className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#666] transition-colors hover:text-[#1a1a1a]"
            >
              Why SIS
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#333] active:scale-[0.98]"
            >
              Open Dashboard
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Warm gradient orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-gradient-to-b from-orange-200/60 via-amber-100/40 to-transparent blur-[100px]" />
          <div className="absolute right-1/4 top-32 h-[300px] w-[300px] rounded-full bg-orange-100/50 blur-[80px]" />
          <div className="absolute left-1/4 top-48 h-[250px] w-[250px] rounded-full bg-amber-100/40 blur-[80px]" />
        </div>

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-24 md:pb-32 md:pt-36">
          <div className="mx-auto max-w-[700px] text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e67e22]" />
              School Management Platform
            </div>

            {/* Headline */}
            <h1 className="text-[42px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1a1a1a] sm:text-[52px] md:text-[64px]">
              Student Information
              <br />
              System
            </h1>

            {/* Subtext */}
            <p className="mx-auto mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[#888] md:text-[18px]">
              Built for modern schools. Powered by real-time data.
              <br className="hidden sm:block" />
              Delivering complete institutional oversight.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-7 py-3 text-[14px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all hover:bg-[#333] hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] active:scale-[0.98] sm:w-auto"
              >
                Experience SIS
                <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href="#features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-7 py-3 text-[14px] font-medium text-[#555] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-black/[0.12] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] active:scale-[0.98] sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Stats ────────────────────────────────────────────────── */}
      <section id="platform" className="border-y border-black/[0.04] bg-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 divide-x divide-black/[0.04] px-0 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center px-6 py-10 md:py-14"
            >
              <stat.icon
                size={20}
                weight="duotone"
                className="mb-3 text-[#999]"
              />
              <p className="text-[28px] font-semibold tracking-[-0.02em] text-[#1a1a1a] md:text-[32px]">
                {stat.value}
              </p>
              <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.06em] text-[#999]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Pillars (3-col) ──────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-0 divide-y divide-black/[0.04] md:grid-cols-3 md:divide-x md:divide-y-0">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="flex flex-col items-center px-8 py-10 text-center md:py-2"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
                  <pillar.icon
                    size={22}
                    weight="duotone"
                    className="text-[#1a1a1a]"
                  />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-[280px] text-[13px] leading-[1.7] text-[#888]">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section
        id="features"
        className="border-t border-black/[0.04] bg-white py-20 md:py-28"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          {/* Section header */}
          <div className="mx-auto max-w-[500px] text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999]">
              Modules
            </p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1a1a1a] md:text-[40px]">
              Everything you need to
              <br />
              run a school
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#888]">
              Six powerful modules, one seamless experience.
            </p>
          </div>

          {/* Feature grid */}
          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-black/[0.04] bg-[#fafafa] p-7 transition-all duration-200 hover:border-black/[0.08] hover:bg-white hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.06] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-shadow group-hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <feature.icon
                    size={20}
                    weight="duotone"
                    className="text-[#1a1a1a]"
                  />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.7] text-[#888]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why SIS ──────────────────────────────────────────────── */}
      <section id="why-sis" className="border-t border-black/[0.04] py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#999]">
              Why SIS
            </p>
            <h2 className="mt-3 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#1a1a1a] md:text-[40px]">
              Built for performance
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#888]">
              Modern technology stack designed for speed, reliability, and
              scalability. From enrollment to fee collection, SIS handles it
              all.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-[560px] space-y-5">
            {[
              "Server-rendered pages with real-time Supabase data",
              "Mobile responsive with drawer-based navigation",
              "Per-page SEO with Open Graph and Twitter cards",
              "Dynamic sitemap and robots.txt generation",
              "One-click Vercel deployment ready",
              "Comprehensive loading skeletons for all routes",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3.5 rounded-xl border border-black/[0.04] bg-white px-5 py-4"
              >
                <CheckCircle
                  size={18}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-[#e67e22]"
                />
                <span className="text-[14px] leading-[1.6] text-[#555]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────── */}
      <section className="border-t border-black/[0.04] bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="relative overflow-hidden rounded-[28px] bg-[#1a1a1a] px-8 py-16 text-center md:px-16 md:py-20">
            {/* Warm glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/[0.08] blur-[100px]" />
              <div className="absolute bottom-0 right-1/4 h-[200px] w-[300px] rounded-full bg-amber-500/[0.06] blur-[80px]" />
            </div>

            <div className="relative z-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888]">
                Get Started
              </p>
              <h2 className="mt-4 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] text-white md:text-[40px]">
                Ready to modernize
                <br />
                your school?
              </h2>
              <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-[1.7] text-[#888]">
                Start managing your institution with a powerful, intuitive
                dashboard that puts data at your fingertips.
              </p>

              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/dashboard"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-medium text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all hover:bg-[#f0f0f0] active:scale-[0.98] sm:w-auto"
                >
                  Open Dashboard
                  <ArrowRight size={16} weight="bold" />
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-[#666]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="text-[#e67e22]"
                  />
                  Free to deploy
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="text-[#e67e22]"
                  />
                  Open source
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle
                    size={14}
                    weight="fill"
                    className="text-[#e67e22]"
                  />
                  Supabase powered
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-black/[0.04]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1a1a1a]">
              <GraduationCap size={12} weight="bold" className="text-white" />
            </div>
            <span className="text-[13px] font-semibold text-[#1a1a1a]">
              SIS
            </span>
            <span className="text-[11px] text-[#bbb]">v1.0</span>
          </div>
          <p className="text-[11px] text-[#bbb]">
            © 2026 Student Information System. Built with Next.js & Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
