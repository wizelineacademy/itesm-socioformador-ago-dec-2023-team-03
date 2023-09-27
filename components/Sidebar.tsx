"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Box from "./Box";
import UserCard from "./UserCard";

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
            active: pathname === '/home',
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
                    Wizeline logo
                </Box>
                <Box className="overflow-y-auto h-full text-white ">
                    Chat History
                </Box>
                <Box className="text-white">
                    <UserCard />
                </Box>
            </div>
            <main>
                {children}
            </main>
        </div>
    );
}

export default Sidebar;