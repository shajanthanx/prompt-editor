/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/prompt-editor',
    assetPrefix: '/prompt-editor/',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
