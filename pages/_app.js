import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'
import Providers from 'components/Providers'
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Providers>
        <Navbar />
        <Component {...pageProps} />
      </Providers>
    </main>
  )
}
