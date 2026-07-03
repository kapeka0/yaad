import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yaad/db", "@yaad/queue"],
  serverExternalPackages: ["postgres"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
