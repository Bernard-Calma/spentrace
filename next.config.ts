import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ⚠️ Ignores ESLint errors in production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Ignores TypeScript errors in production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
