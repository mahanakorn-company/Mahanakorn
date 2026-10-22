/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920]
  },
  // Old page addresses from the first version keep working.
  async redirects() {
    return [
      { source: '/stations', destination: '/menu', permanent: true },
      { source: '/weddings', destination: '/services#weddings', permanent: true },
      { source: '/indian-weddings', destination: '/services#weddings', permanent: true },
      { source: '/events', destination: '/services#parties', permanent: true },
      // Past Events (and the older Bali story pages) were removed: send visitors to Our Services.
      { source: '/past-events/:path*', destination: '/services', permanent: true },
      { source: '/celebrations/:path*', destination: '/services', permanent: true },
      { source: '/past-weddings/:path*', destination: '/services', permanent: true },
      // The For Planners page was removed.
      { source: '/planners', destination: '/services', permanent: true },
      { source: '/plan-your-menu', destination: '/get-a-quote', permanent: true }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ]
      }
    ];
  }
};

export default nextConfig;
