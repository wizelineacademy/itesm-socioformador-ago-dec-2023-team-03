"use client";

import Box from "./Box";
import UserCard from "./UserCard";
import Link from "next/link";

interface SidebarProps {
    reference?: string;
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    reference,
    children
}) => {
    return (
        <div className="flex h-full">
            <div className="
                hidden
                md:flex
                flex-col
                h-full
                w-[300px]
                pb-2
                pt-2
                pl-2
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
                    <UserCard reference={reference} />
                </Box>
            </div>
            <main className="h-full w-full">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;