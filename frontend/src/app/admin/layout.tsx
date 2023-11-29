'use client';
import '@/src/app/globals.css';

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
// import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { Toaster } from "react-hot-toast";
import Sidebar from '../components/Sidebar';

// export const metadata = {
//   title: 'Wizeprompt',
//   description: 'Wizeprompt App',
// }

/**
 * RootLayout component.
 * @function
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The children nodes.
 * @returns {JSX.Element} Rendered component.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user, error, isLoading } = useUser();

    if (isLoading) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    if (error) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    return (
        // Wrap the component in a UserProvider
        <UserProvider>
            {/* If the user is logged in, render the Sidebar and children components */}
            {user ? (
                <Sidebar user={user}>
                    {children}
                    {/* Render a Toaster component at the bottom center of the screen */}
                    <Toaster position="bottom-center" />
                </Sidebar>
                // If the user is not logged in, redirect to the login page
            ) : (
                redirect('/login')
            )}

        </UserProvider>
    );
}
