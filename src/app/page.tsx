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
    title: "Attendance Sync",
    label: "Start review",
    className: "from-[#ca7ab0] via-[#aeb9ff] to-[#8f8cec]",
  },
  {
    title: "Fee Follow-ups",
    label: "Start collection",
    className: "from-[#eb6a1f] via-[#ffb24e] to-[#ffd08a]",
  },
  {
    title: "Exam Insights",
    label: "Start analysis",
    className: "from-[#7ab842] via-[#c8d593] to-[#e2c9ce]",
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

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f7f5] text-[#242424]">
      <style jsx>{`
        .hero-field {
          background:
            linear-gradient(180deg, rgba(248, 224, 194, 0.88) 0%, rgba(224, 232, 255, 0.88) 34%, rgba(247, 247, 245, 0.96) 82%),
            radial-gradient(ellipse at top center, rgba(239, 117, 54, 0.48), transparent 38%),
            radial-gradient(ellipse at 50% 36%, rgba(119, 150, 255, 0.42), transparent 50%);
        }

        .soft-ornament {
          clip-path: polygon(
            50% 0%,
            58% 16%,
            76% 14%,
            84% 30%,
            84% 42%,
            100% 50%,
            84% 58%,
            84% 70%,
            76% 86%,
            58% 84%,
            50% 100%,
            42% 84%,
            24% 86%,
            16% 70%,
            16% 58%,
            0% 50%,
            16% 42%,
            16% 30%,
            24% 14%,
            42% 16%
          );
        }
      `}</style>

      <header className="fixed inset-x-0 top-0 z-50 px-2">
        <nav className="mx-auto flex h-[72px] max-w-[1660px] items-center justify-between rounded-b-[34px] border border-white/70 bg-white/78 px-5 shadow-[0_18px_48px_rgba(72,86,130,0.14)] backdrop-blur-xl md:px-9">
          <BrandLogo href="/" priority size="sm" textClassName="text-3xl" />

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
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#202020] px-7 text-base font-semibold text-white shadow-[inset_0_0_14px_rgba(255,255,255,0.24),0_8px_22px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.98]"
              href="/signup"
            >
              Experience SIS
            </Link>
            <Link
              className="inline-flex h-14 items-center justify-center rounded-full border border-black/5 bg-white px-7 text-base font-medium text-black shadow-[0_8px_22px_rgba(0,0,0,0.08)] transition-transform active:scale-[0.98]"
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
        <section className="hero-field relative min-h-[740px] overflow-hidden px-5 pb-20 pt-32 md:pt-40">
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

            <p className="mb-12 rounded-full border border-[#2a3192]/10 bg-white/24 px-5 py-3 text-base font-medium text-[#25319a] shadow-[0_18px_42px_rgba(75,97,180,0.12)] backdrop-blur-md">
              India-ready school management platform
            </p>

            <h1 className="font-[Georgia,serif] text-[46px] font-normal leading-[1.08] text-[#222] sm:text-[68px] md:text-[82px]">
              Student Information System
            </h1>

            <p className="mt-8 max-w-[760px] text-[20px] leading-8 text-[#3f3f3f] md:text-[24px] md:leading-10">
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
                className="text-[26px] font-semibold text-[#8c8c8c] opacity-70 grayscale"
                key={mark}
              >
                {mark}
              </div>
            ))}
          </div>

          <h2 className="mx-auto mt-32 max-w-[900px] text-center font-[Georgia,serif] text-[38px] font-normal leading-tight text-[#242424] md:text-[54px]">
            Powering India&apos;s student-first future
          </h2>
        </section>

        <section
          className="bg-[linear-gradient(180deg,#dfe5ff_0%,#f6f7fb_100%)] px-5 py-16 md:py-24"
          id="experience"
        >
          <div className="mx-auto max-w-[1420px] overflow-hidden rounded-[34px] bg-white shadow-[0_30px_80px_rgba(73,91,160,0.14)]">
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-8 md:px-12">
              <h2 className="text-[24px] font-medium text-[#3b3b3b] md:text-[30px]">
                Experience SIS
              </h2>
              <div className="flex items-center gap-3 text-sm font-semibold text-[#444]">
                <span className="h-3 w-3 rounded-full bg-[#08c35a]" />
                LIVE
              </div>
            </div>

            <div className="grid gap-12 px-6 py-16 md:grid-cols-3 md:px-12 md:py-24">
              {experiences.map((item) => (
                <div className="flex flex-col items-center" key={item.title}>
                  <div
                    className={`soft-ornament flex h-[230px] w-[260px] items-center justify-center bg-gradient-to-b ${item.className} p-8 shadow-[inset_0_0_44px_rgba(255,255,255,0.36),0_18px_42px_rgba(60,60,100,0.12)] sm:h-[270px] sm:w-[310px]`}
                  >
                    <span className="inline-flex h-14 min-w-[168px] items-center justify-center rounded-full border border-white/55 bg-white/24 px-7 text-base font-semibold text-white shadow-[0_16px_34px_rgba(0,0,0,0.14)] backdrop-blur-md">
                      {item.label}
                    </span>
                  </div>
                  <h3 className="mt-9 text-[22px] font-medium text-[#3d3d3d] md:text-[26px]">
                    {item.title}
                  </h3>
                </div>
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
