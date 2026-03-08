import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["postgres"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
