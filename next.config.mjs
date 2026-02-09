/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/prompt-editor',
    assetPrefix: '/prompt-editor',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
};

export default nextConfig;