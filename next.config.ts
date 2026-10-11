import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects',
        destination: '/side-quests#projects',
        permanent: true,
      },
      {
        source: '/orange',
        destination: '/side-quests',
        permanent: true,
      },
      {
        source: '/slices',
        destination: 'https://slices-ui.vercel.app/slices',
        permanent: true,
      },
      {
        source: '/slices/:path*',
        destination: 'https://slices-ui.vercel.app/slices/:path*',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { hostname: 'content.pexels.com' },
      { hostname: 'unsplash.com' },
      { hostname: 'plus.unsplash.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'www.toptal.com' },
      { hostname: 'texturelabs.org' },
    ],
  },
  experimental: {
    optimizePackageImports: ['motion', 'lucide-react', '@phosphor-icons/react'],
  },
  turbopack: {},
};

export default nextConfig;
