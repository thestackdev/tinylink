import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { LOGIN_AUTH_ROUTE } from 'utils/constants'

const secret = process.env.NEXTAUTH_SECRET

export default withAuth({
  callbacks: {
    authorized: async ({ req }) => {
      const token = await getToken({ req, secret })
      if (!token) return false
      return true
    },
  },
  pages: {
    error: '/error',
    signIn: LOGIN_AUTH_ROUTE,
  },
})

export const config = { matcher: ['/dashboard'] }
