const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    BASE_URL: process.env.BASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/auth/:path*',
  //       destination: `${process.env.NEXTAUTH_URL}/api/auth/:path*`,
  //     },
  //   ]
  // },
  // async redirects() {
  //   return [
  //     {
  //       source: '/login',
  //       destination: `${process.env.NEXTAUTH_URL}/login`,
  //       permanent: true,
  //     },
  //   ]
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
