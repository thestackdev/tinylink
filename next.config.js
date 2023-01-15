const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: `${process.env.NEXTAUTH_URL}/api/auth/:path*`,
      },
      {
        source: '/login/:path*',
        destination: `${process.env.NEXTAUTH_URL}/login/:path*`,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
