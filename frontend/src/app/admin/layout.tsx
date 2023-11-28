'use client';
import '@/src/app/globals.css'

import { UserProvider, useUser } from '@auth0/nextjs-auth0/client'
// import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { Toaster } from "react-hot-toast";
import Sidebar from '../components/Sidebar';

// export const metadata = {
//   title: 'Wizeprompt',
//   description: 'Wizeprompt App',
// }

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
        <UserProvider>
            {user ? (

                <Sidebar user={user}>
                    {children}
                    <Toaster position="bottom-center" />
                </Sidebar>

            ) : (
                redirect('/login')
            )}

        </UserProvider>
    );
}