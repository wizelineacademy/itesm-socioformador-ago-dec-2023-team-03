"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

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
        <div>
            {children}
        </div>
    );
}

export default Sidebar;