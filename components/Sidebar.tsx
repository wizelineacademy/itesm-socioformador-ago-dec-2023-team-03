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
                gap-y-2
                bg-black
                h-full
                w-[300px]
                p-2
            ">
                <Box className="text-white">
                    <div className = "cursor-pointer py-3 text-3xl text-center">
                        <Link href={'/'}>
                            Wizeprompt
                        </Link>
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full text-white ">
                    Chat History
                </Box>
                <Box className="text-white">
                    <UserCard />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;