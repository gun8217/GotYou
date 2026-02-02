import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,

  basePath: isProd ? "/vtc-enforcement" : "",

  assetPrefix: isProd ? "/vtc-enforcement/" : undefined,
};

export default nextConfig;
