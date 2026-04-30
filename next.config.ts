import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel auto-detects the output mode, but we can be explicit
  // about image optimization domains if needed
  images: {
    unoptimized: false,
  },
  // Enable strict mode for better dev experience
  reactStrictMode: true,
};

export default nextConfig;
