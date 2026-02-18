/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/chat', destination: '/', permanent: true },
      { source: '/profile/:path*', destination: '/', permanent: true },
      { source: '/articles/:path*', destination: '/', permanent: true },
      { source: '/scrape/:path*', destination: '/', permanent: true },
    ]
  }
};

export default nextConfig;
