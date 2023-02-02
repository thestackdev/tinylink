import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'
import NoAccess from 'components/NoAccess'
import Spinner from 'components/Spinner'
import { SessionProvider, useSession } from 'next-auth/react'
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <main className={inter.className}>
      <SessionProvider session={session}>
        <Navbar />
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </SessionProvider>
    </main>
  )
}

function Auth({ children }) {
  const { data: session, status } = useSession({ required: true })

  if (status === 'loading') return <Spinner />

  if (!session) return <NoAccess />
  return children
}
