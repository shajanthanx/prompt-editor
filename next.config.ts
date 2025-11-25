import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/prompt-editor',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
