"use client";

import { useState } from "react";
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
  CheckCircle,
  ArrowUpRight,
  Users,
  Clock,
  ChartLineUp,
  List,
  X,
} from "@phosphor-icons/react";

import { BrandLogo } from "@/components/brand-logo";

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

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#platform", label: "Platform" },
  { href: "#why-sis", label: "Why SIS" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ─── Animated mesh gradient (sarvam sun-like effect) ─────── */}
      <style jsx>{`
        @keyframes meshMove {
          0%,
          100% {
            transform: translate(0%, 0%) scale(1);
          }
          25% {
            transform: translate(5%, -5%) scale(1.05);
          }
          50% {
            transform: translate(-3%, 3%) scale(0.97);
          }
          75% {
            transform: translate(4%, 2%) scale(1.03);
          }
        }
        @keyframes meshMove2 {
          0%,
          100% {
            transform: translate(0%, 0%) scale(1);
          }
          25% {
            transform: translate(-6%, 4%) scale(1.08);
          }
          50% {
            transform: translate(4%, -3%) scale(0.95);
          }
          75% {
            transform: translate(-2%, -5%) scale(1.02);
          }
        }
        @keyframes meshMove3 {
          0%,
          100% {
            transform: translate(0%, 0%) scale(1.02);
          }
          33% {
            transform: translate(6%, 4%) scale(0.96);
          }
          66% {
            transform: translate(-4%, -2%) scale(1.06);
          }
        }
        @keyframes meshPulse {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.7;
          }
        }
        .mesh-orb-1 {
          animation: meshMove 12s ease-in-out infinite, meshPulse 8s ease-in-out infinite;
        }
        .mesh-orb-2 {
          animation: meshMove2 15s ease-in-out infinite, meshPulse 10s ease-in-out infinite 2s;
        }
        .mesh-orb-3 {
          animation: meshMove3 18s ease-in-out infinite, meshPulse 12s ease-in-out infinite 4s;
        }
        .mesh-orb-4 {
          animation: meshMove 20s ease-in-out infinite reverse, meshPulse 14s ease-in-out infinite 1s;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        .animate-fade-up-delay-1 {
          animation: fadeUp 0.8s ease-out 0.15s forwards;
          opacity: 0;
        }
        .animate-fade-up-delay-2 {
          animation: fadeUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-up-delay-3 {
          animation: fadeUp 0.8s ease-out 0.45s forwards;
          opacity: 0;
        }
      `}</style>

      {/* ─── Navbar ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-black/[0.04] bg-[#fafafa]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-6">
          <BrandLogo
            href="/"
            markClassName="rounded-lg"
            priority
            size="sm"
            textClassName="text-[17px]"
          />

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-[0.06em] text-[#666] transition-colors hover:text-[#1a1a1a]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="hidden items-center rounded-full border border-black/[0.08] bg-white px-5 py-2 text-[13px] font-medium text-[#555] transition-all hover:bg-[#f5f5f5] hover:text-[#1a1a1a] active:scale-[0.98] sm:inline-flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-5 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#333] active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Sign up</span>
              <span className="sm:hidden">Sign up</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#666] hover:bg-black/[0.04] md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={20} weight="bold" />
              ) : (
                <List size={20} weight="bold" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="border-t border-black/[0.04] bg-[#fafafa] px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[14px] font-medium text-[#555] transition-colors hover:text-[#1a1a1a] py-1"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-[14px] font-medium text-[#555] transition-colors hover:text-[#1a1a1a] sm:hidden"
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Animated mesh gradient orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Main warm sun orb */}
          <div className="mesh-orb-1 absolute left-1/2 top-[-100px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-radial from-orange-300/60 via-amber-200/30 to-transparent blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.4) 0%, rgba(251,146,60,0.25) 35%, rgba(254,215,170,0.1) 60%, transparent 80%)' }}
          />
          {/* Secondary warm orb - right */}
          <div className="mesh-orb-2 absolute right-[10%] top-[60px] h-[400px] w-[400px] rounded-full blur-[90px]"
            style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.3) 0%, rgba(253,186,116,0.15) 50%, transparent 80%)' }}
          />
          {/* Tertiary warm orb - left */}
          <div className="mesh-orb-3 absolute left-[5%] top-[120px] h-[350px] w-[350px] rounded-full blur-[80px]"
            style={{ background: 'radial-gradient(circle, rgba(254,215,170,0.35) 0%, rgba(251,191,36,0.15) 50%, transparent 80%)' }}
          />
          {/* Subtle peach accent */}
          <div className="mesh-orb-4 absolute left-[40%] top-[200px] h-[250px] w-[250px] rounded-full blur-[70px]"
            style={{ background: 'radial-gradient(circle, rgba(253,164,100,0.3) 0%, rgba(251,191,36,0.1) 60%, transparent 85%)' }}
          />
        </div>

        <div className="mx-auto max-w-[1200px] px-6 pb-24 pt-24 md:pb-32 md:pt-36">
          <div className="mx-auto max-w-[700px] text-center">
            {/* Badge */}
            <div className="animate-fade-up mb-8 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#888] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e67e22]" />
              School Management Platform
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up-delay-1 text-[42px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#1a1a1a] sm:text-[52px] md:text-[64px]">
              Student Information
              <br />
              System
            </h1>

            {/* Subtext */}
            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-[480px] text-[16px] leading-[1.7] text-[#888] md:text-[18px]">
              Built for modern schools. Powered by real-time data.
              <br className="hidden sm:block" />
              Delivering complete institutional oversight.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-7 py-3 text-[14px] font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all hover:bg-[#333] hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] active:scale-[0.98] sm:w-auto"
              >
                Create Account
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/login"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-black/[0.08] bg-white px-7 py-3 text-[14px] font-medium text-[#555] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:border-black/[0.12] hover:bg-[#f5f5f5] hover:text-[#1a1a1a] active:scale-[0.98] sm:w-auto"
              >
                Log in
              </Link>
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
              scalability. From enrollment to fee collection.
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
            {/* Warm animated glow in CTA */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="mesh-orb-1 absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]"
                style={{ background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, rgba(251,191,36,0.08) 50%, transparent 80%)' }}
              />
              <div className="mesh-orb-3 absolute bottom-0 right-1/4 h-[200px] w-[300px] rounded-full blur-[80px]"
                style={{ background: 'radial-gradient(circle, rgba(253,186,116,0.1) 0%, transparent 70%)' }}
              />
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
                  href="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-[14px] font-medium text-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all hover:bg-[#f0f0f0] active:scale-[0.98] sm:w-auto"
                >
                  Create Account
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
            <BrandLogo size="xs" textClassName="text-[13px]" />
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
