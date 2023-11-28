"use client";

import useAllMembers from "@/src/hooks/useAllMembers";
import useMembers from "@/src/hooks/useMembers";
import { Member } from "@/src/types";
import { useEffect, useState } from "react";

interface AddMemberProps {
  close: () => void;
  teamId: string;
  onSubmit: (event: React.FormEvent, member: Member) => void;
}

/**
 * This component is a modal to add a member to a specific team.
 * @param {AddMemberProps} props - The props of the component.
 * @param {function} props.close - Function to close the modal.
 * @param {string} props.teamId - ID of the team to add the member.
 * @param {function} props.onSubmit - Function to handle the submit event.
 * @returns {JSX.Element} JSX Element for the modal.
 */

export default function AddMember({
  close,
  teamId,
  onSubmit,
}: AddMemberProps) {
  const [allMembers, setAllMembers, loadingAllMembers] = useAllMembers();
  const [teamMembers, setTeamMembers, loadingTeamMembers] = useMembers(teamId);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [input, setInput] = useState<string>("");

  /* Filtered and excluded members from the team */
  const filteredAndExcludedMembers = filteredMembers.filter(member => !teamMembers.map(m => m.id).includes(member.id));

  /* Effect hook to filter members based on the input */
  useEffect(() => {
    const filteredMembers = allMembers.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return fullName.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredMembers(filteredMembers);
  }, [input, allMembers.length]);

  /* Function to handle closing the modal */
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
      <input type="search" className="w-full px-3 py-2 bg-gray-100 rounded-xl text-black" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)} />
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 bg-regal-blue-normal rounded-xl min-w-[20rem] max-h-[12.5rem] overflow-y-auto">
        {filteredAndExcludedMembers.length > 0 ? (
          filteredAndExcludedMembers.map((member) => (
            <div key={member.id} className="flex flex-row items-center justify-between p-2 bg-regal-blue-dark rounded-xl">
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{member.firstName} {member.lastName}</span>
                <span className="text-sm">{member.email}</span>
              </div>
              <button onClick={(event) => { onSubmit(event, member); console.log(member.lastName); console.log(member.firstName) }} className="btn-sm btn btn-neutral text-white">Add</button>
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
