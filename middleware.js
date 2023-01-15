import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (!token) return false
      return true
    },
  },
  pages: {
    error: '/error',
    signIn: `/login?redirectUrl=${process.env.BASE_URL}`,
  },
})

export const config = { matcher: ['/dashboard'] }
