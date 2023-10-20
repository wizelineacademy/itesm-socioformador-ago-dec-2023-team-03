"use client";

import ChatBox from "@/app/components/ChatBox";
import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname} from "next/navigation";
import Box from "../components/Box";

export default function Home() {
    const { user, error, isLoading } = useUser();
    const pathname = usePathname();

    if (error) { console.log(error) }
    if (isLoading) { return <div className="loader"></div> }

    if(!user) {
        return (
            <>
                {redirect("/login")}
            </>
        )
    } else {
    return (
            <Sidebar reference={pathname}>
                <Header>
                        <ChatBox />
                </Header>
            </Sidebar>
    )
    }
}
