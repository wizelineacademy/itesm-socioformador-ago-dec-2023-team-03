"use client";

import Box from "@/app/components/Box";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
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

        const existingGroups = [
            { id: 1, name: "Group 1" },
            { id: 2, name: "Group 2" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
          ];



    return (
      <div className="h-full">
        <Sidebar reference={pathname}>
            <Header>
                <div className="h-full">
                    <Box className="h-full bg-white">
                        <div className= "flex justify-end items-center p-10"> 
                        <input type="text" className="px-3 py-2 m-3 bg-gray-400 rounded-xl w-1/3" placeholder="Search..."/>
                                <button className="create-group-button px-3 py-2 m-3 bg-blue-500 rounded-xl w-1/6" onClick={handleCreateGroup}>
                              + Create Group
                            </button>
                        </div>
                    <div  className="existing-groups">
                            {existingGroups.map((group) => (
                                <div key={group.id} style={{ backgroundColor: 'rgb(34, 37, 41)' }} className="group-item flex items-center px-10 py-2 m-3 rounded-xl ">
                                   <div className="ml-10 ">
                                    {group.name}
                                    </div>
                                    <button style={{ backgroundColor: 'rgb(233, 61, 68)' }} className="delete-group-button rounded-2xl px-4 py-2  w-20 ml-auto" onClick={() => handleDeleteGroup(group.id)}>
                                        X
                                        </button>
                                </div>
                             ))} 
                        </div>                      
                    </Box>
                </div>
            </Header>
        </Sidebar>
      </div>
    )
    }


  }function handleCreateGroup() {
    // logic for groups 
  }