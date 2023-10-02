"use client";

import Box from "@/app/components/Box";
import Sidebar from '@/app/components/Sidebar'
import Header from '@/app/components/Header'
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
    const { user, error, isLoading } = useUser();

    if(error) { console.log(error) }
    if(isLoading) { return <div className="loader"></div> }
    
    return (
        <Sidebar>
            <Header>
                <div className="h-full w-full bg-black">
                    <Box className="h-full w-full bg-black">
                        Chat Box
                    </Box>
                </div>
            </Header>
        </Sidebar>
    )
  }