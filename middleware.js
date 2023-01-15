import { withAuth } from 'next-auth/middleware'
import { LOGIN_AUTH_ROUTE } from 'utils/constants'

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      console.log(token)
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
