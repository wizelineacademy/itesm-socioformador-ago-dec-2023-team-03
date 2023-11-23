"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import AdminTeamLLMsList from "@/src/app/components/AdminTeamLLMsList";
import AddLLM from "@/src/components/modals/AddLLM";
import AddMember from "@/src/components/modals/AddMemberInGroup";
import DeleteTeam from "@/src/components/modals/DeleteTeam";
import Modal from "@/src/components/modals/Modal";
import useLLM from "@/src/hooks/useLLM";
import useMembers from "@/src/hooks/useMembers";
import Link from "next/link";
import { useRef } from "react";

export default function Home({ params }: { params: { id: string } }) {
    const [members, setMembers, membersLoading] = useMembers(params.id);
    const [llm, setLLM, llmLoading] = useLLM(params.id);
    const modal = useRef<null | HTMLDialogElement>(null);
    const modalDeleteTeam = useRef<null | HTMLDialogElement>(null);
    const modalConfirm = useRef<null | HTMLDialogElement>(null);
    const modalLLM = useRef<null | HTMLDialogElement>(null);

    if (membersLoading) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    function handleAddMember(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        const openModal = () => {
            if (modal.current) {
                modal.current.showModal();
            }
        }
        openModal();
    }

    const closeModal = () => {
        if (modal.current) {
            modal.current.close();
        }
    }

    const openDeleteTeamModal = () => {
        if (modalDeleteTeam.current) {
            modalDeleteTeam.current.showModal();
        }
    }

    const closeDeleteTeamModal = () => {
        if (modalDeleteTeam.current) {
            modalDeleteTeam.current.close();
        }
    }

    const openSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.showModal();
        }
    }

    const closeSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.close();
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

    const closeLLMModal = () => {
        if (modalLLM.current) {
            modalLLM.current.close();
        }
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
                    <button onClick={handleAddMember} className="btn btn-neutral btn-sm text-white">
                        Add Member
                    </button>
                    <button onClick={openDeleteTeamModal} className="btn btn-accent btn-sm text-white">
                        Delete Team
                    </button>
                </div>
            </div>
            <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4">
                <AddMember teamId={params.id} close={closeModal} />
            </dialog>
            <dialog ref={modalDeleteTeam} className="py-3 px-14 rounded-2xl space-y-4">
                <DeleteTeam openSubModal={openSubModal} close={closeDeleteTeamModal} />
            </dialog>
            <dialog ref={modalConfirm} className="py-3 px-14 rounded-2xl space-y-4">
                <Modal title="Message" message="The team has been deleted" close={closeSubModal} />
            </dialog>

            <div className="flex flex-col h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal">
                {/* Map through all members */}
                {members && members.map((member) => (
                    <AdminMembersList key={member.id} member={member} groupId={params.id} />
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
                {/* Map through all LLMs */}
                {llm && llm.map((llm) => (
                    <AdminTeamLLMsList key={llm.id} llm={llm} />
                ))}
            </div>
        </div >
    )
}
