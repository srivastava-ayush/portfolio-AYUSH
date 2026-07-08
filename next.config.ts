import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
};

export default nextConfig;
