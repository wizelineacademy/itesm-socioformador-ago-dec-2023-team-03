"use client";

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
              <div className="h-full bg-white">
                <div className= "flex justify-end items-center space-x-4 p-1 bg-yellow-500"> 
                  <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..."/>
                  <button className="create-group-button px-3 py-2 bg-blue-500 rounded-xl w-1/6" onClick={handleCreateGroup}>
                    + Create Group
                  </button>
                </div>
                <ul  className="existing-groups h-full overflow-y-scroll">
                  {existingGroups.map((group) => (
                    <div key={group.id} style={{ backgroundColor: 'rgb(34, 37, 41)' }} className="group-item flex items-center px-10 py-2 m-3 rounded-xl ">
                      <div className="ml-10">
                        {group.name}
                      </div>
                      <button style={{ backgroundColor: 'rgb(233, 61, 68)' }} className="delete-group-button flex rounded-md h-10 ml-auto aspect-square justify-center items-center" onClick={() => handleDeleteGroup()}>
                        <CgClose size={25}/>
                      </button>
                    </div>
                  ))} 
                </ul>
              </div>
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