/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: {
    allowedOrigins: ['localhost:3000', 'your-vercel-domain.vercel.app'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('encoding');
    return config;
  },
};

module.exports = nextConfig;
