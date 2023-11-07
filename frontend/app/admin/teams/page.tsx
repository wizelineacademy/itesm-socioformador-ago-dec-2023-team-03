"use client";

import AdminListDeleteButton from "@/app/components/AdminListDeleteButton";
import Box from "@/app/components/Box";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";
import { CgClose } from "react-icons/cg";


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
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "Equipo alfa buena onda maravilla hombre lobo" },
            { id: 3, name: "FIN" },
          ];



    return (
      <div className="h-screen w-screen">
        <Sidebar reference={pathname}>
            <Header>
              <header className= "flex justify-end items-center space-x-4 p-1"> 
                <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..."/>
                <button className="create-group-button px-3 py-2 bg-blue-500 rounded-xl w-1/6" onClick={handleCreateGroup}>
                  + Create Group
                </button>
              </header>
              <ul  className="space-y-3 h-full p-5 overflow-y-scroll bg-regal-blue-normal">
                {existingGroups.map((group) => (
                  <div key={group.id} className="flex w-full rounded-md px-2 py-3 justify-between items-center gap-3 bg-regal-blue hover:bg-regal-blue-light">
                    <div className="ml-10">
                      {group.name}
                    </div>
                    <AdminListDeleteButton/>
                  </div>
                ))}
              </ul>
            </Header>
        </Sidebar>
      </div>
    )
    }


  }function handleCreateGroup() {
    // logic for groups 
  }function handleDeleteGroup() {
    //logic for groups
  }