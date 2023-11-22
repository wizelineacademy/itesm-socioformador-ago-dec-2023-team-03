"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import Sidebar from "@/src/app/components/Sidebar";
import AddMember from "@/src/components/modals/AddMemberInGroup";
import useAllMembers from "@/src/hooks/useAllMembers";
import { Member } from "@/src/types";
import { useUser } from "@auth0/nextjs-auth0/client";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [members, setMembers, loadingMembers] = useAllMembers();
  const [search, setSearch] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
  const modal = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const filteredMembers = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredMembers(filteredMembers);
  }, [search, members]);

  if (error) { console.log(error) }
  if (isLoading) { return <div className="loader"></div> }

  if (loadingMembers) return <div>Loading Members...</div>;

  if (!user) {
    return (
      <>
        {redirect("/login")}
      </>
    )
  } else {
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
      <Sidebar >
        <header className="flex justify-between items-center space-x-4 p-1">
          <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <button className="flex px-3 py-2 bg-blue-500 rounded-xl w-fit hover:bg-blue-700" onClick={openModal}>
            + Add Member
          </button>
        </header>
        <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4">
          <AddMember close={closeModal} />
        </dialog>
        <div className="flex flex-col h-full space-y-2 p-5">
          {filteredMembers.map((member) => (
            <AdminMembersList key={member.id} member={member} />
          ))}
        </div>
      </Sidebar>
    )
  }
}
