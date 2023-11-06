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
                        <div className= "flex justify-end items-center p-10"> 
                        <input type="text" className="px-3 py-2 m-3 bg-gray-400 rounded-xl w-1/3" placeholder="Search..."/>
                                <button className="create-group-button px-3 py-2 m-3 bg-blue-500 rounded-xl w-1/6" onClick={handleCreateMember}>
                              + Create Group
                            </button>
                        </div>
                        <AdminMembersList />
                    </Box>
                </div>
            </Header>
        </Sidebar>
      </div>
    )
    }
  }

  function handleCreateMember() {
    //logic for members
  }