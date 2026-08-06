import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@yaad/db", "@yaad/queue", "@yaad/types"],
  serverExternalPackages: ["postgres"],
};

export default nextConfig;
