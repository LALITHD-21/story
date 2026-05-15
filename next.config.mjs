/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize images and add headers for caching
  images: {
    unoptimized: true, // Since we are using a manual canvas sequence loader
  },
  async headers() {
    return [
      {
        source: '/sequence/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
