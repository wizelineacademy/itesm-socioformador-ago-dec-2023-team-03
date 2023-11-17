"use client";


import Sidebar from "@/src/app/components/Sidebar";
import AdminMembersList from "@/src/app/components/AdminMembersList";
import useAllMembers from "@/src/hooks/useAllMembers";
import { useEffect, useState } from "react";
import { Member } from "@/src/types";

export default function Home() {
  const [members, setMembers, loadingMembers] = useAllMembers();
  const [search, setSearch] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);

  useEffect(() => {
    const filteredMembers = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredMembers(filteredMembers);
  }, [search, members]);

  function handleCreateMember() {
    //logic for members
  }

  if (loadingMembers) return <div>Loading Members...</div>;

  return (
    <Sidebar >
      <header className="flex justify-between items-center space-x-4 p-1">
        <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="flex px-3 py-2 bg-blue-500 rounded-xl w-fit hover:bg-blue-700" onClick={handleCreateMember}>
          + Add Member
        </button>
      </header>
      <div className="flex flex-col h-full space-y-2 p-5">
        {filteredMembers.map((member) => (
          <AdminMembersList key={member.id} member={member} />
        ))}
      </div>
    </Sidebar>
  )
}


