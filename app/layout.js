import 'styles/globals.css'
import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'
import Providers from 'components/Providers'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
