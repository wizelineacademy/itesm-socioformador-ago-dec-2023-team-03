"use client";

import useAllMembers from "@/src/hooks/useAllMembers";
import useMembers from "@/src/hooks/useMembers";
import { Member } from "@/src/types";
import { useEffect, useState } from "react";

interface AddMemberProps {
  close: () => void;
  teamId: string;
}

export default function AddMember({ close, teamId }: AddMemberProps) {
  const [allMembers, setAllMembers, loadingAllMembers] = useAllMembers();
  const [teamMembers, setTeamMembers, loadingTeamMembers] = useMembers(teamId);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(allMembers);
  const [input, setInput] = useState<string>("");

  const filteredAndExcludedMembers = filteredMembers.filter(member => !teamMembers.map(m => m.id).includes(member.id));

  useEffect(() => {
    const filteredMembers = allMembers.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return fullName.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredMembers(filteredMembers);
  }, [input, allMembers]);

  const handleClose = () => {
    setInput("");
    close();
  }

  if (loadingAllMembers) return (
    <div className="flex flex-col w-full h-full items-center justify-center align-middle">
      <span className="loading loading-spinner loading-lg text-accent "></span>
    </div>
  );

  return (
    <>
      <header>
        <h1 className="text-center text-lg font-semibold">Add member</h1>
      </header>
      <input type="search" className="w-full px-3 py-2 bg-gray-400 rounded-xl" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal rounded-xl min-w-[20rem]">
        {filteredAndExcludedMembers.length > 0 ? (
          filteredAndExcludedMembers.map((member) => (
            <div key={member.id} className="flex flex-row items-center justify-between p-2 bg-regal-blue-dark rounded-xl">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{member.firstName} {member.lastName}</span>
                <span className="text-sm">{member.email}</span>
              </div>
              <button className="btn-sm btn btn-neutral text-white">Add</button>
            </div>
          ))
        ) : (
          <span className="text-center text-white">No hay coincidencias</span>
        )}
      </div>
      <button onClick={handleClose} className="btn btn-neutral text-white w-full">Close</button>
    </>
  );
}
