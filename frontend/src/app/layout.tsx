import './globals.css'

import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'

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
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  )
}
