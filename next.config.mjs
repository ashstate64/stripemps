/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Add redirects to handle common 404s
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/invest',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/investment',
        destination: '/apply',
        permanent: true,
      },
      {
        source: '/openai',
        destination: '/',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/#opportunity',
        permanent: false,
      },
      {
        source: '/contact',
        destination: '/#investors',
        permanent: false,
      },
    ];
  },

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
