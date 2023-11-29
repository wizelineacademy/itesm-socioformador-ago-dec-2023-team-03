import './globals.css';

import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: 'Wizeprompt',
  description: 'Wizeprompt App',
}

/**
 * RootLayout component.
 * @component
 * @param {Object} props - The props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({
  children,
}) {
  return (
    <html data-theme="wizeline" lang="en">
      {/* UserProvider component wraps all children to provide user context */}
      <UserProvider>
        <body>
          {children}
          {/* Toaster component from react-hot-toast library for displaying toast notifications, positioned at the bottom center of the screen */}
          <Toaster position="bottom-center" />
        </body>
      </UserProvider>
    </html>
  );
}
