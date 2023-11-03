"use client";

import Box from "@/app/components/Box";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import AdminMembersList from "@/app/components/AdminMembersList";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";


export default function Home() {
    const pathname = usePathname();
    const { user, error, isLoading } = useUser();

    if(error) { console.log(error) }
    if(isLoading) { return <div className="loader"></div> }

    if(!user) {
        return (
            <>
                {redirect("/login")}
            </>
        )
    } else {
    return (
      <div className="h-full">
        <Sidebar reference={pathname}>
            <Header>
                <div className="h-full">
                    <Box className="h-full bg-white">
                        {/* Admin Dashboard */}
                        <AdminMembersList />
                    </Box>
                </div>
            </Header>
        </Sidebar>
      </div>
    )
    }
  }