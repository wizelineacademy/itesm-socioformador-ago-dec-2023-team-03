import '@/src/app/globals.css'

import { UserProvider } from '@auth0/nextjs-auth0/client'
import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { Toaster } from "react-hot-toast";
import Sidebar from '../components/Sidebar';

// export const metadata = {
//   title: 'Wizeprompt',
//   description: 'Wizeprompt App',
// }

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getSession();
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