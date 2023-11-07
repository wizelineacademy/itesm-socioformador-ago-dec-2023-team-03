"use client";

import AdminMembersList from "@/app/components/AdminMembersList";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import { useState } from "react";
import AdminTeamLLMsList from "@/app/components/AdminTeamLLMsList";


export default function Home() {
    const pathname = usePathname();
    const { user, error, isLoading } = useUser();
    const [showMembers , setShowMembers] = useState(true)

    function handleClick (event:boolean){
        setShowMembers(event)
    }

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
            
            <Sidebar reference={pathname}>
                <Header>
                    
                    <header className= "flex px-4 py-1 gap-5 justify-between w-full bg-regal-blue-normal">
                        <Link href='/admin/teams' className="flex w-10 justify-center items-center aspect-square">
                            <button className="flex justify-center items-center py-2 bg-blue-500 rounded-xl h-full aspect-square">
                                <CgArrowLeft size={25} />
                            </button> 
                        </Link>
                        <button onClick={() => handleClick(true)} className="flex-auto py-2 bg-blue-500 rounded-xl w-1/3">
                            members
                        </button>
                        <button onClick={() => handleClick(false)} className="flex-auto py-2 bg-blue-500 rounded-xl w-1/3">
                            LLMs
                        </button>
                    </header>
                    {showMembers ? (
                        <AdminMembersList />
                    ) : (
                        <AdminTeamLLMsList />
                    )}
                    
                </Header>
            </Sidebar>
            
        )
        }


}