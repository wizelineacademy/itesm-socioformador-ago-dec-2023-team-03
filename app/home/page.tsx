"use client";

import Box from "@/components/Box";
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
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