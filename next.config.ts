import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/prompt-editor' : '',
  assetPrefix: isProd ? '/prompt-editor/' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
