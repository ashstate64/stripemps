/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Redirects removed - handled by _redirects file for static export compatibility

  // Optimize images and performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Enable strict mode for better error detection
  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
