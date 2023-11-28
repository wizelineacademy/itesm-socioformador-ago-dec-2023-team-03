"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import AdminTeamLLMsList from "@/src/app/components/AdminTeamLLMsList";
import AddLLM from "@/src/components/modals/AddLLM";
import AddMember from "@/src/components/modals/AddMemberInGroup";
import DeleteTeam from "@/src/components/modals/DeleteTeam";
import Modal from "@/src/components/modals/Modal";
import useLLM from "@/src/hooks/useLLM";
import useMembers from "@/src/hooks/useMembers";
import { addTeamMember, removeTeam, removeTeamMember } from "@/src/services/team";
import { Member } from "@/src/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

/**
 * Teams members page.
 * @function
 * @param {object} props - Component props.
 * @param {object} props.params - The parameters for the component.
 * @param {string} props.params.id - The ID parameter.
 * @returns {JSX.Element} Rendered component.
 */
export default function Home({ params }: { params: { id: string } }) {
    // State variables for members, search term, and filtered members using the useMembers custom hook.
    const [members, setMembers, membersLoading, membersError, deleteMember] = useMembers(params.id);
    const [llm, setLLM, llmLoading] = useLLM(params.id);
    const modal = useRef<null | HTMLDialogElement>(null);
    const modalDeleteTeam = useRef<null | HTMLDialogElement>(null);
    const modalConfirm = useRef<null | HTMLDialogElement>(null);
    const modalLLM = useRef<null | HTMLDialogElement>(null);

    const router = useRouter();

    console.log(members)

    // If members are loading, display a loading spinner.
    if (membersLoading) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    // Closes the modal
    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
        }
    }

    // Opens the delete team modal
    const openDeleteTeamModal = () => {
        if (modalDeleteTeam.current) {
            modalDeleteTeam.current.showModal();
        }
    }

    // Closes the delete team modal
    const closeDeleteTeamModal = () => {
        if (modalDeleteTeam.current) {
            modalDeleteTeam.current.close();
        }
    }

    // Opens the confirmation modal
    const openSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.showModal();
        }
    }

    // Closes the confirmation modal
    const closeSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.close();
        }
    }

    // Opens the modal
    const openModal = () => {
        if (modal.current) {
            modal.current.showModal();
        }
    }

    // Closes the modal
    const closeLLMModal = () => {
        if (modalLLM.current) {
            modalLLM.current.close();
        }
    }

    function handleAddLLM(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const openLLMModal = () => {
            if (modalLLM.current) {
                modalLLM.current.showModal();
            }
        }
        openLLMModal();
    }

    /**
     * Handles the add member event.
     * @param {React.FormEvent}
     * @param {Member} member - The member.
     */
    function handleAddMember(event: React.FormEvent, member: Member): void {
        addTeamMember(params.id, member.id!).then(() => {
            setMembers([...members, member]);
            closeModal();
        });
    }

    /**
     * Handles the delete team event.
     * @param {React.FormEvent}
     */
    function handleDeleteTeam(event: React.FormEvent): void {
        removeTeam(params.id).then((res) => {
            closeDeleteTeamModal();
            router.push('/admin/teams');
        });
    }

    /**
     * Handles the delete member event.
     * @param {React.FormEvent}
     * @param {string} groupId - The group ID.
     * @param {string} memberId - The member ID.
     */
    function handleDeleteMember(event: React.FormEvent<Element>, groupId: string, memberId: string): void {
        removeTeamMember(groupId, memberId).then(() => {
            deleteMember(memberId);
        });
    }

    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <div className="flex flex-row flex-none p-2 align-middle justify-between w-full">
                <Link href='/admin/teams' >
                    <button className="btn btn-circle btn-sm text-white btn-neutral">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                    </button>
                </Link>
                <div className="space-x-4">
                    <button onClick={() => openModal()} className="btn btn-neutral btn-sm text-white">
                        Add Member
                    </button>
                    <button onClick={openDeleteTeamModal} className="btn btn-accent btn-sm text-white">
                        Delete Team
                    </button>
                </div>
            </div>
            {/* Display the modals with the dialog html tag and pass the props to the component */}
            <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4 overflow-hidden">
                <AddMember teamId={params.id} close={closeModal} onSubmit={handleAddMember} />
            </dialog>
            <dialog ref={modalDeleteTeam} className="py-3 px-14 rounded-2xl space-y-4">
                <DeleteTeam openSubModal={openSubModal} close={closeDeleteTeamModal} onSubmit={handleDeleteTeam} />
            </dialog>
            <dialog ref={modalConfirm} className="py-3 px-14 rounded-2xl space-y-4">
                <Modal title="Message" message="The team has been deleted" close={closeSubModal} />
            </dialog>

            <div className="flex flex-col h-full w-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal">
                {members && members.map((member) => (
                    <AdminMembersList key={member.id} member={member} groupId={params.id} onDeleteMember={(event) => handleDeleteMember(event, params.id, member.id!)} />
                ))}
            </div>
            <div className="flex p-2 flex-row w-full items-center justify-between">
                <p className=" text-lg">Active LLMs:</p>
                <button onClick={handleAddLLM} className="btn-sm btn btn-neutral text-white">ADD LLM</button>
            </div>
            <dialog ref={modalLLM} className="py-3 px-14 rounded-2xl space-y-4">
                <AddLLM groupId={params.id} close={closeLLMModal} />
            </dialog>
            <div className="flex flex-row h-fit space-x-6 p-2 overflow-x-auto overflow-y-hidden mb-2">
                {/* map llm with the AdminTeamLLMsList component */}
                {llm && llm.map((llm) => (
                    <AdminTeamLLMsList key={llm.id} llm={llm} />
                ))}
            </div>
        </div >
    )
}
