"use client";

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
    return (
        <div className="flex flex-row h-screen w-screen">
            <div className="flex flex-col justify-between h-full w-64">
                <div className="flex flex-col gap-5 px-4 py-5 ">
                    <Link className="text-3xl text-white" href={'/admin'}>
                        Wizeprompt
                    </Link>
                    <AdminNavButtons />
                </div>
                <div className="bg-regal-blue-normal text-white">
                    <UserCard reference={reference} />
                </div>
            </div>
            <div className="flex flex-col h-screen w-full overflow-auto">
                {children}
            </div>
        </div>
    );


}

export default Sidebar;