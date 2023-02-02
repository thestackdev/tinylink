const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
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
        destination: `${process.env.NEXTAUTH_URL}/login?callbackUrl=${process.env.BASE_URL}/dashboard`,
        permanent: true,
      },
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
