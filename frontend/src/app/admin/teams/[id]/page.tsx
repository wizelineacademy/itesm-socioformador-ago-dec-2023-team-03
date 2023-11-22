"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import Sidebar from "@/src/app/components/Sidebar";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import AdminTeamLLMsList from "@/src/app/components/AdminTeamLLMsList";
import useMembers from "@/src/hooks/useMembers";
import useLLM from "@/src/hooks/useLLM";


export default function Home({ params }: { params: { id: string } }) {
    const [members, setMembers, membersLoading] = useMembers(params.id);
    const [llm, setLLM, llmLoading] = useLLM(params.id);

    if (membersLoading) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    function handleAddLLM(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

    function handleAddMember(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
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
                    <button onClick={handleAddMember} className="btn btn-accent btn-sm text-white">
                        Delete Team
                    </button>
                </div>
            </div>
            <div className="flex flex-col h-full space-y-2 p-5 overflow-y-auto bg-regal-blue-normal">
                {/* Map through all members */}
                {members && members.map((member) => (
                    <AdminMembersList key={member.id} member={member} />
                ))}
            </div>
            <div className="flex p-2 flex-row w-full items-center justify-between">
                <p className=" text-lg">Active LLMs:</p>
                <button onClick={handleAddLLM} className="btn-sm btn btn-neutral text-white">ADD LLM</button>
            </div>
            <div className="flex flex-row h-fit space-x-6 p-2 overflow-x-auto overflow-y-hidden mb-2">
                {/* Map through all LLMs */}
                {llm && llm.map((llm) => (
                    <AdminTeamLLMsList key={llm.id} llm={llm} />
                ))}
            </div>
        </div >
    )
}