"use client";

import Box from "@/src/app/components/Box";
import Header from "@/src/app/components/Header";
import Sidebar from "@/src/app/components/Sidebar";
import AdminMembersList from "../components/AdminMembersList";
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
      <>
        {redirect("/admin/members")}
      </>
    //   <div className="h-full">
    //     <Sidebar reference={pathname}>
    //         <Header>
    //             <div className="h-full">
    //                 <Box className="h-full bg-white">
    //                     {/* Admin Dashboard */}
    //                     <AdminMembersList />
    //                 </Box>
    //             </div>
    //         </Header>
    //     </Sidebar>
    //   </div>
    )
    }
  }