import './globals.css'
import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Wizeprompt',
  description: 'Wizeprompt App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <Sidebar>
            <Header>
              {children}
            </Header>
          </Sidebar>
        </body>
    </html>
  )
}
