"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Box from "./Box";
import UserCard from "./UserCard";
import Link from "next/link";

interface SidebarProps {
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            label: 'Home',
            active: pathname === '/',
            href: '/',
        },
        {
            label: 'Admin',
            active: pathname === '/admin',
            href: '/admin',
        }
    ], [pathname]);  

    return (
        <div className="flex h-full">
            <div className="
                hidden
                md:flex
                flex-col
                gap-y-1
                bg-black
                h-full
                w-[300px]
                p-2
            ">
                <Box className = "cursor-pointer py-3 text-3xl text-center">
                    <Link href={'/'}>
                        Wizeprompt
                    </Link>
                </Box>
                <Box className="h-full overflow-y-auto text-white ">
                    Chat History
                </Box>
                <Box className="text-white">
                    <UserCard />
                </Box>
            </div>
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;