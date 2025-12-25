/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    allowedDevOrigins: ['192.168.0.13:3000'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.3:5001/api/:path*', // உங்கள் backend IP & port
      },
    ];
  },
};

module.exports = nextConfig;