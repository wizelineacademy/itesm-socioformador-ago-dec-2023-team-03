"use client";

import Sidebar from "@/src/app/components/Sidebar";
import AdminMembersList from "@/src/app/components/AdminMembersList";
import useAllMembers from "@/src/hooks/useAllMembers";
import { useEffect, useState } from "react";
import { Member } from "@/src/types";

export default function MembersPage() {
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

  function handleCreateMember(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  if (loadingMembers) return (
    <div className="flex flex-col w-full h-full items-center justify-center align-middle">
      <span className="loading loading-spinner loading-lg text-accent "></span>
    </div>
  );

  return (
    <div className="flex flex-col overflow-auto h-full">
      <div className="flex flex-row flex-none justify-between items-center space-x-4 p-2">
        <input type="text" className="px-3 py-2 text-black bg-gray-100 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="flex btn btn-neutral text-white" onClick={handleCreateMember}>
          Create Member
        </button>
      </div>
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal">
        {filteredMembers.map((member) => (
          <AdminMembersList key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}


