import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

import bundleAnalyzer from '@next/bundle-analyzer';
import type { RemotePattern } from 'next/dist/shared/lib/image-config';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

// Parse image remote patterns from environment variable or use defaults
const getImageRemotePatterns = (): RemotePattern[] => {
  const envDomains = process.env.NEXT_PUBLIC_IMAGE_DOMAINS;
  const domains = envDomains
    ? envDomains
        .split(',')
        .map(domain => domain.trim())
        .filter(Boolean)
    : // Default domains
      ['api.example.com', 'i.pravatar.cc', 'cous-dev.fra1.digitaloceanspaces.com'];

  // Convert domains to remote patterns
  return domains.map(
    (hostname): RemotePattern => ({
      protocol: 'https',
      hostname,
    })
  );
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimize package imports for better tree-shaking
  // This only loads the modules you actually use from packages with many exports
  experimental: {
    optimizePackageImports: [
      'lucide-react', // Icon library with many exports
      'recharts', // Chart library with many components
      '@radix-ui/react-icons', // If using Radix icons
      'date-fns', // Date utility library
    ],
  },
  // Opt specific packages out of bundling (useful for server-only packages)
  // Packages imported in Server Components are automatically bundled
  // Use this if you need to exclude specific packages from bundling
  serverExternalPackages: [],
  images: {
    remotePatterns: getImageRemotePatterns(),
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    // Only use NEXT_PUBLIC_API_BASE_URL (Next.js convention for client-side env variables)
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Only add rewrites if NEXT_PUBLIC_API_BASE_URL is configured
    if (!apiBaseUrl) {
      // Only log in development to avoid noise in production
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[next.config.mjs] No NEXT_PUBLIC_API_BASE_URL configured, skipping rewrites'
        );
      }
      return [];
    }

    // Validate URL format
    try {
      new URL(apiBaseUrl);
    } catch {
      throw new Error(
        `Invalid NEXT_PUBLIC_API_BASE_URL: ${apiBaseUrl}. Must be a valid URL.`
      );
    }

    // Normalize API base URL (remove trailing slash)
    const normalizedBase = apiBaseUrl.trim().replace(/\/+$/, '');

    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[next.config.mjs] Configuring API rewrite: /api/v1/* -> ${normalizedBase}/api/v1/*`
      );
    }

    return [
      {
        source: '/api/v1/:path*',
        destination: `${normalizedBase}/api/v1/:path*`,
      },
    ];
  },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
