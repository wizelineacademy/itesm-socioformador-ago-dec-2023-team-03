"use client";

import Header from '@/app/components/Header';
import Sidebar from '@/app/components/Sidebar';
import ChatBox from "@/components/ChatBox";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
    const { user, error, isLoading } = useUser();

    if (error) { console.log(error) }
    if (isLoading) { return <div className="loader"></div> }

    return (
        <Sidebar>
            <Header>
                <div className="h-full w-full bg-black">
                    <ChatBox />
                </div>
            </Header>
        </Sidebar>
}
