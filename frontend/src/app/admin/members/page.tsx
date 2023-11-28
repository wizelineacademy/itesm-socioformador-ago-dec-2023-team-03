"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import CreateMember from "@/src/components/modals/CreateMember";
import useAllMembers from "@/src/hooks/useAllMembers";
import { createMember } from "@/src/services/member";
import { Member } from "@/src/types";
import { useEffect, useRef, useState } from "react";

/**
 * MembersPage component.
 * @function
 * @returns {JSX.Element} Rendered component.
 */
export default function MembersPage() {
  // State variables for members, search term, and filtered members
  const [members, setMembers, loadingMembers] = useAllMembers();
  const [search, setSearch] = useState<string>("");
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);
  // Reference to the modal
  const modal = useRef<null | HTMLDialogElement>(null);

  // Effect hook for filtering members based on the search term.
  useEffect(() => {
    const filteredMembers = members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return fullName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredMembers(filteredMembers);
  }, [search, members.length]);

  console.log(members);

  // Opens the modal
  const openModal = () => {
    if (modal.current) {
      modal.current.showModal();
    }
  }

  // Closes the modal
  const closeModal = () => {
    if (modal.current) {
      modal.current.close();
    }
  }

  /**
   * Handles the create member event.
   * @param {React.FormEvent} event - The event.
   * @param {Member} member - The member.
   */
  function handleCreateMember(event: React.FormEvent, member: Member): void {
    // Create the member and add it to the list of members with the useAllMembers custom hook.
    createMember(member.firstName, member.lastName, member.email, member.roleId).then((res) => {
      const newMember: Member = {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        roleId: member.roleId,
        picture: "",
      }
      setMembers([...members, newMember]);
      closeModal();
    });
  }

  // If the members are loading, display a loading spinner.
  if (loadingMembers) return (
    <div className="flex flex-col w-full h-full items-center justify-center align-middle">
      <span className="loading loading-spinner loading-lg text-accent "></span>
    </div>
  );

  return (
    <div className="flex flex-col overflow-auto h-full">
      <div className="flex flex-row flex-none justify-between items-center space-x-4 p-2">
        <input type="text" className="px-3 py-2 text-black bg-gray-100 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="flex btn btn-neutral text-white" onClick={() => openModal()}>
          Create Member
        </button>
      </div>
      <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4">
        <CreateMember close={closeModal} onSubmit={handleCreateMember} />
      </dialog>
      <div className="flex flex-col flex-grow h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal">
        {/* map filteredMembers with the AdminMembersList component */}
        {filteredMembers.map((member) => (
          <AdminMembersList key={member.id} member={member} groupId={""} />
        ))}
      </div>
    </div>
  )
}
