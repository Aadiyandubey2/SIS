"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, List, X } from "@phosphor-icons/react";

import { BrandLogo } from "@/components/brand-logo";

const navLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#experience", label: "Experience" },
  { href: "#modules", label: "Resources" },
  { href: "#company", label: "Company" },
];

const workflowMarks = [
  "Admissions",
  "Attendance",
  "Courses",
  "Exams",
  "Fees",
  "Parents",
  "Reports",
];

const experiences = [
  {
    title: "Cart Recovery",
    label: "Start speaking",
    id: "cart",
    colors: ["#c45c9b", "#c8d3ff", "#8d86e8"],
    glow: "#a9b7ff",
  },
  {
    title: "Appointment Booking",
    label: "Start speaking",
    id: "booking",
    colors: ["#e96b1f", "#ff9f32", "#ffc66e"],
    glow: "#ffbe68",
  },
  {
    title: "Payment follow-ups",
    label: "Start speaking",
    id: "payment",
    colors: ["#7fb542", "#bfd29a", "#e4c9cb"],
    glow: "#d9d5a6",
  },
];

const modules = [
  "Student records",
  "Course planning",
  "Daily attendance",
  "Exam results",
  "Fee tracking",
  "Live dashboards",
];

const metrics = [
  { value: "2,847", label: "Students managed" },
  { value: "94.2%", label: "Attendance visibility" },
  { value: "15+", label: "Active courses" },
  { value: "12.4L", label: "Fees tracked" },
];

function OrnamentCard({
  colors,
  glow,
  id,
  label,
  title,
}: {
  colors: string[];
  glow: string;
  id: string;
  label: string;
  title: string;
}) {
  const gradientId = `ornament-gradient-${id}`;
  const glowId = `ornament-glow-${id}`;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[342px] w-[360px] max-w-full sm:h-[360px] sm:w-[380px]">
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 380 360"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="52%" stopColor={colors[1]} />
              <stop offset="100%" stopColor={colors[2]} />
            </linearGradient>
            <radialGradient id={glowId} cx="50%" cy="51%" r="48%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.54" />
              <stop offset="52%" stopColor={glow} stopOpacity="0.36" />
              <stop offset="100%" stopColor={colors[0]} stopOpacity="0" />
            </radialGradient>
            <filter
              colorInterpolationFilters="sRGB"
              height="130%"
              id={`shadow-${id}`}
              width="130%"
              x="-15%"
              y="-12%"
            >
              <feDropShadow
                dx="0"
                dy="16"
                floodColor="#000000"
                floodOpacity="0.13"
                stdDeviation="14"
              />
              <feDropShadow
                dx="0"
                dy="0"
                floodColor={colors[0]}
                floodOpacity="0.28"
                stdDeviation="1"
              />
            </filter>
          </defs>
          <path
            d="M190 8C195 54 222 45 251 45C295 45 322 72 322 116C356 116 373 139 373 174C373 207 356 232 322 232V259C322 303 295 330 251 330C222 330 195 321 190 354C185 321 158 330 129 330C85 330 58 303 58 259V232C24 232 7 207 7 174C7 139 24 116 58 116C58 72 85 45 129 45C158 45 185 54 190 8Z"
            fill={`url(#${gradientId})`}
            filter={`url(#shadow-${id})`}
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="2"
          />
          <path
            d="M190 8C195 54 222 45 251 45C295 45 322 72 322 116C356 116 373 139 373 174C373 207 356 232 322 232V259C322 303 295 330 251 330C222 330 195 321 190 354C185 321 158 330 129 330C85 330 58 303 58 259V232C24 232 7 207 7 174C7 139 24 116 58 116C58 72 85 45 129 45C158 45 185 54 190 8Z"
            fill={`url(#${glowId})`}
          />
        </svg>
        <button
          className="absolute left-1/2 top-[49%] inline-flex h-[62px] min-w-[192px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/22 px-8 text-[18px] font-semibold text-white shadow-[inset_0_0_18px_rgba(255,255,255,0.2),0_16px_34px_rgba(58,58,58,0.16)] backdrop-blur-md"
          type="button"
        >
          {label}
        </button>
      </div>
      <h3 className="-mt-1 text-center text-[24px] font-medium leading-tight text-[#3c3c3c] md:text-[25px]">
        {title}
      </h3>
    </div>
  );
}

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f5] text-[#242424]">
      <style jsx>{`
        .hero-field {
          background:
            linear-gradient(180deg, rgba(254, 235, 214, 0.96) 0%, rgba(224, 232, 255, 0.92) 33%, rgba(247, 247, 245, 0.98) 82%),
            radial-gradient(ellipse at top center, rgba(239, 117, 54, 0.54), transparent 38%),
            radial-gradient(ellipse at 50% 36%, rgba(125, 151, 255, 0.42), transparent 52%);
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50 px-2">
        <nav className="mx-auto flex h-[74px] max-w-[1660px] items-center justify-between rounded-b-[36px] border border-white/80 bg-white/82 px-5 shadow-[0_18px_48px_rgba(72,86,130,0.13)] backdrop-blur-xl md:px-9">
          <Link
            className="text-[36px] font-bold leading-none text-black"
            href="/"
          >
            SIS
          </Link>

          <div className="hidden items-center gap-12 lg:flex">
            {navLinks.map((link) => (
              <a
                className="text-sm font-semibold uppercase text-black transition-colors hover:text-[#2a3192]"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <Link
              className="inline-flex h-[60px] items-center justify-center rounded-full bg-[#202020] px-7 text-[18px] font-semibold text-white shadow-[inset_0_0_16px_rgba(255,255,255,0.26),0_8px_22px_rgba(0,0,0,0.17)] transition-transform active:scale-[0.98]"
              href="/signup"
            >
              Experience SIS
            </Link>
            <Link
              className="inline-flex h-[60px] items-center justify-center rounded-full border border-black/5 bg-white px-7 text-[18px] font-medium text-black shadow-[0_8px_22px_rgba(0,0,0,0.08)] transition-transform active:scale-[0.98]"
              href="/login"
            >
              Log in
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-black sm:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            type="button"
          >
            {mobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="mx-2 mt-2 rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:hidden">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  className="rounded-full px-4 py-3 text-sm font-semibold uppercase text-black hover:bg-[#f0f2ff]"
                  href={link.href}
                  key={link.label}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link
                className="rounded-full bg-[#202020] px-4 py-3 text-center text-sm font-semibold text-white"
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
              >
                Experience SIS
              </Link>
              <Link
                className="rounded-full border border-black/10 px-4 py-3 text-center text-sm font-semibold text-black"
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="hero-field relative min-h-[740px] overflow-hidden px-5 pb-20 pt-32 md:pt-[168px]">
          <Image
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-24 hidden -translate-x-1/2 select-none opacity-[0.13] blur-[2px] md:block"
            height={430}
            priority
            src="/icon.png"
            width={430}
          />

          <div className="relative mx-auto flex max-w-[980px] flex-col items-center text-center">
            <div className="mb-8 flex w-full max-w-[310px] items-center justify-center gap-4 text-white/90">
              <span className="h-px flex-1 bg-white/80" />
              <Image
                alt="SIS logo"
                className="rounded-full shadow-[0_0_36px_rgba(55,121,215,0.4)]"
                height={54}
                priority
                src="/icon.png"
                width={54}
              />
              <span className="h-px flex-1 bg-white/80" />
            </div>

            <p className="mb-12 rounded-full border border-[#2a3192]/10 bg-white/24 px-5 py-3 text-[20px] font-medium text-[#25319a] shadow-[0_18px_42px_rgba(75,97,180,0.12)] backdrop-blur-md">
              India-ready school management platform
            </p>

            <h1 className="font-[Georgia,serif] text-[48px] font-normal leading-[1.08] text-[#222] sm:text-[70px] md:text-[84px]">
              SIS for every school in India
            </h1>

            <p className="mt-7 max-w-[850px] text-[22px] leading-9 text-[#3f3f3f] md:text-[26px] md:leading-10">
              Built for modern schools. Powered by real-time Supabase data.
              Delivering complete institutional oversight.
            </p>

            <div className="mt-14 flex w-full max-w-[440px] flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                className="inline-flex h-16 w-full items-center justify-center gap-2 rounded-full bg-[#202020] px-8 text-lg font-semibold text-white shadow-[inset_0_0_16px_rgba(255,255,255,0.24),0_14px_34px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.98] sm:w-auto"
                href="/signup"
              >
                Experience SIS
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                className="inline-flex h-16 w-full items-center justify-center rounded-full border border-black/5 bg-white/82 px-8 text-lg font-medium text-black shadow-[0_14px_34px_rgba(0,0,0,0.08)] backdrop-blur-md transition-transform active:scale-[0.98] sm:w-auto"
                href="/login"
              >
                Log in
              </Link>
            </div>
          </div>
        </section>

        <section
          className="bg-[#f7f7f5] px-5 pb-20 pt-8 md:pb-28"
          id="platform"
        >
          <p className="text-center text-sm font-semibold uppercase text-[#7c7c7c]">
            Schools build with SIS
          </p>
          <div className="mx-auto mt-16 grid max-w-[1500px] grid-cols-2 gap-x-8 gap-y-10 text-center sm:grid-cols-3 lg:grid-cols-7">
            {workflowMarks.map((mark) => (
              <div
                className="text-[28px] font-semibold text-[#8c8c8c] opacity-55 grayscale"
                key={mark}
              >
                {mark}
              </div>
            ))}
          </div>

          <h2 className="mx-auto mt-32 max-w-[900px] text-center font-[Georgia,serif] text-[38px] font-normal leading-tight text-[#242424] md:text-[52px]">
            Powering India&apos;s student-first future
          </h2>
        </section>

        <section
          className="bg-[linear-gradient(180deg,#dfe5ff_0%,#f6f7fb_100%)] px-5 py-0 pb-16 md:pb-20"
          id="experience"
        >
          <div className="mx-auto max-w-[1424px] overflow-hidden rounded-[48px] bg-white shadow-[0_30px_80px_rgba(73,91,160,0.12)]">
            <div className="flex h-[118px] items-center justify-between border-b border-black/8 px-8 md:px-[50px]">
              <h2 className="text-[26px] font-medium text-[#3b3b3b] md:text-[30px]">
                Experience SIS
              </h2>
              <div className="flex items-center gap-3 text-sm font-semibold text-[#444]">
                <span className="h-3 w-3 rounded-full bg-[#08c35a]" />
                LIVE
              </div>
            </div>

            <div className="grid gap-9 px-5 pb-[82px] pt-[58px] md:grid-cols-3 md:px-[58px] md:pt-[58px]">
              {experiences.map((item) => (
                <OrnamentCard
                  colors={item.colors}
                  glow={item.glow}
                  id={item.id}
                  key={item.title}
                  label={item.label}
                  title={item.title}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f7f5] px-5 py-20 md:py-28" id="modules">
          <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-[#7c7c7c]">
                Resources
              </p>
              <h2 className="mt-5 font-[Georgia,serif] text-[38px] font-normal leading-tight text-[#242424] md:text-[54px]">
                Everything a school runs on, in one place.
              </h2>
              <p className="mt-7 max-w-[520px] text-lg leading-8 text-[#626262]">
                SIS connects academic, operational, and financial workflows so
                every team sees the same source of truth.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <div
                  className="rounded-lg border border-black/8 bg-white px-5 py-5 text-lg font-medium text-[#2f2f2f] shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
                  key={module}
                >
                  {module}
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-[1180px] gap-px overflow-hidden rounded-lg border border-black/8 bg-black/8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div className="bg-white p-8 text-center" key={metric.label}>
                <div className="font-[Georgia,serif] text-[42px] text-[#242424]">
                  {metric.value}
                </div>
                <p className="mt-2 text-sm font-medium text-[#777]">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/8 bg-white px-5 py-8" id="company">
        <div className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-5 sm:flex-row">
          <BrandLogo size="sm" />
          <p className="text-sm text-[#777]">
            Copyright 2026 Student Information System. Built with Next.js and
            Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
