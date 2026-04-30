import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: {
    default: "SIS — Student Information System",
    template: "%s | SIS",
  },
  description:
    "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees.",
  keywords: [
    "student information system",
    "school management",
    "attendance tracking",
    "fee management",
    "exam management",
    "education software",
  ],
  authors: [{ name: "SIS Team" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SIS — Student Information System",
    title: "SIS — Student Information System",
    description:
      "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SIS — Student Information System",
    description:
      "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
