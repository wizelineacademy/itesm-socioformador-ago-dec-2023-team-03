"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import Header from "@/src/app/components/Header";
import Sidebar from "@/src/app/components/Sidebar";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";


export default function Home() {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();

  if (error) { console.log(error) }
  if (isLoading) { return <div className="loader"></div> }

  if (!user) {
    return (
      <>
        {redirect("/login")}
      </>
    )
  } else {
    return (
      <Sidebar reference={pathname}>
        <Header>
          <header className="flex justify-end items-center space-x-4 p-1">
            <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..." />
            <button className="px-3 py-2 bg-blue-500 rounded-xl w-1/6" onClick={handleCreateMember}>
              + Add Member
            </button>
          </header>
          <AdminMembersList />
        </Header>
      </Sidebar>
    )
  }
}

function handleCreateMember() {
  //logic for members
}
