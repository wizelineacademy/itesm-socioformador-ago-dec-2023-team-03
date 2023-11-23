// import './globals.css'

// import type { Metadata } from 'next'
// import { UserProvider } from '@auth0/nextjs-auth0/client'

// export const metadata: Metadata = {
//   title: 'Wizeprompt',
//   description: 'Wizeprompt App',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <UserProvider>
//         <body>{children}</body>
//       </UserProvider>
//     </html>
//   )
// }

'use client';
import './globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'

import { Toaster } from "react-hot-toast";

// export const metadata = {
//   title: 'Wizeprompt',
//   description: 'Wizeprompt App',
// }

export default function RootLayout({
  children,
}) {
  return (
    <html data-theme="wizeline" lang="en">
      <UserProvider>
        <body>
          {children}
          <Toaster position="bottom-center " />  
        </body>
      </UserProvider>
    </html>
  );
}
