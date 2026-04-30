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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sis-dashboard.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  icons: {
    icon: [
      {
        url: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    shortcut: "/icon.png",
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SIS — Student Information System",
    title: "SIS — Student Information System",
    description:
      "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "SIS logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SIS — Student Information System",
    description:
      "Enterprise-grade Student Information System for managing students, courses, attendance, exams, and fees.",
    images: ["/icon.png"],
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
