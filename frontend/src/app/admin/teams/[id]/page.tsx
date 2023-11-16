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

    if (membersLoading) return <div>Members loading!...</div>

    function handleAddLLM(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        throw new Error("Function not implemented.");
    }

    return (

        <Sidebar>
            <div className="flex flex-col h-full w-full overflow-auto">
                <div className="flex flex-row flex-none p-2 items-center justify-between w-full bg-regal-blue-normal">
                    <div className="w-fit">
                        <Link href='/admin/teams' >
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 align-middle">
                                <CgArrowLeft size={35} />
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col h-full space-y-2 p-5 overflow-y-auto">
                    {/* Map through all members */}
                    {members && members.map((member) => (
                        <AdminMembersList key={member.id} member={member} />
                    ))}
                </div>
                <div className="flex p-2 flex-row bg-regal-blue-normal w-full items-center justify-between">
                    <p className=" text-lg">Active LLMs:</p>
                    <button onClick={handleAddLLM} className="flex rounded-lg p-2 w-fit bg-transparent text-sm bg-green-500 hover:bg-green-800 outline outline-1 outline-green-700 font-semibold">ADD LLM</button>
                </div>
                <div className="flex flex-row h-fit space-x-6 p-2 overflow-x-auto mb-2">
                    {/* Map through all LLMs */}
                    {llm && llm.map((llm) => (
                        <AdminTeamLLMsList key={llm.id} llm={llm} />
                    ))}
                </div>
            </div>
        </Sidebar>
    )
}