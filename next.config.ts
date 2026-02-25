import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Output standalone for Docker deployment
  output: 'standalone',

  // Image optimization configuration
  images: {
    // Disable default image optimization for local images if needed
    unoptimized: false,
    // Allow local images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ntechcolab.com',
      },
      {
        protocol: 'https',
        hostname: 'www.glassdoor.com.br',
      },
    ],
    // Supported formats
    formats: ['image/webp', 'image/avif'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default withNextIntl(nextConfig);
