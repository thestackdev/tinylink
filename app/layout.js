import 'styles/globals.css'
import { Inter } from '@next/font/google'
import Navbar from 'components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body>
        <div>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
