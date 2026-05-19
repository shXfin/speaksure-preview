import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/speaksure-preview",
  images: { unoptimized: true },
};

export default nextConfig;
