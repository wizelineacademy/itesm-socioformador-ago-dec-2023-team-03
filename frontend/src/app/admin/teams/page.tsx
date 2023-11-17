"use client";

import AdminListDeleteButton from "@/src/app/components/AdminListDeleteButton";
import Header from "@/src/app/components/Header";
import Sidebar from "@/src/app/components/Sidebar";
import NewGroup from "@/src/components/modals/NewGroup";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";
import { useRef } from "react";

export default function Home() {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
  const modal = useRef<null | HTMLDialogElement>(null);

  if (error) { console.log(error) }
  if (isLoading) { return <div className="loader"></div> }

  if (!user) {
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

    const openModal = () => {
      if (modal.current) {
        modal.current.showModal();
      }
    }

    const closeModal = () => {
      if (modal.current) {
        modal.current.close();
      }
    }

    return (
      <div className="h-screen w-screen">
        <Sidebar reference={pathname}>
          <Header>
            <header className="flex justify-end items-center space-x-4 p-1">
              <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..." />
              <button className="create-group-button px-3 py-2 bg-blue-500 rounded-xl w-1/6" onClick={openModal}>
                + Create Group
              </button>


            </header>
            <ul className="space-y-3 h-full p-5 overflow-y-scroll bg-regal-blue-normal">
              {existingGroups.map((group) => (
                <div key={group.id} className="flex w-full rounded-md px-2 py-3 justify-between items-center gap-3 bg-regal-blue hover:bg-regal-blue-light">
                  <div className="ml-10">
                    {group.name}
                  </div>
                  <AdminListDeleteButton />
                </div>
              ))}
            </ul>
          </Header>
        </Sidebar>
        <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4">
          <NewGroup close={closeModal} />
        </dialog>
      </div>
    )
  }


} function handleDeleteGroup() {
  //logic for groups
}
