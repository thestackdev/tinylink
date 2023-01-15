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
    ]
  },
  async redirects() {
    return [
      {
        source: '/login',
        destination: `${process.env.NEXTAUTH_URL}/login`,
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
