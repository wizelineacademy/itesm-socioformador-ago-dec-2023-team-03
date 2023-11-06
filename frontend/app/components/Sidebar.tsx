"use client";

import Box from "./Box";
import UserCard from "./UserCard";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import chat_history from "../data/chat_history.json";
import Filter from "./Filter";
import AdminNavButtons from "./AdminNavButtons";
import { usePathname } from "next/navigation";

interface SidebarProps {
    reference?: string;
    children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({
    reference,
    children
}) => {
    // Store chat history in local variable
    const chatHistory = chat_history;
    const pathname = usePathname();
    const adminRoute = pathname.split("/")[1];

    // sidebar for /home
    if(reference == "/home"){
        return (
            <div className="flex h-full w-full">
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
                    <Box className="h-full overflow-y-auto text-white no-scrollbar">
                            {chatHistory.map((chat) => (
                                <SidebarItem key={chat.id} chat={chat} />
                            ))}
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
        //sidebar for admin page
    } else if(adminRoute == "admin"){
        return (
            <div className="flex h-full w-full">
                <div className="hidden md:flex flex-col h-full w-[300px] p-2 ">
                    <div className = "flex flex-col gap-5 px-4 py-5 text-3xl text-center text-white bg-regal-blue-normal">
                        <Link href={'/admin'}>
                            Wizeprompt
                        </Link>
                        <AdminNavButtons />
                    </div>
                    <Box className="h-full">
                        <Filter />
                    </Box>
                    <Box className="bg-regal-blue-normal text-white">
                        <UserCard reference={reference} />
                    </Box>
                </div>
                <main className="h-full w-full">
                    {children}
                </main>
            </div>
        );
    }

}

export default Sidebar;