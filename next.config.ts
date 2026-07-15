import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["mamas.13-49-187-127.sslip.io"],
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
