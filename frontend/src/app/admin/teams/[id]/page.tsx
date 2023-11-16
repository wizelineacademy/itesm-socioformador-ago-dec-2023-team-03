"use client";

import AdminMembersList from "@/src/app/components/AdminMembersList";
import Sidebar from "@/src/app/components/Sidebar";
import Link from "next/link";
import { CgArrowLeft } from "react-icons/cg";
import AdminTeamLLMsList from "@/src/app/components/AdminTeamLLMsList";
import useMembers from "@/src/hooks/useMembers";


export default function Home({ params }: { params: { id: string } }) {
    const [members, setMembers, membersLoading] = useMembers(params.id);

    function handleClick(event: boolean) {
    }

    if (membersLoading) return <div>Members loading!...</div>

    console.log(members)

    return (

        <Sidebar>
            <div className="flex flex-col h-full w-full overflow-auto">
                <div className="flex flex-row flex-none px-4 gap-5 items-center justify-between w-full bg-regal-blue-normal">
                    <div className="w-fit">
                        <Link href='/admin/teams' >
                            <button className="bg-blue-500 rounded-xl hover:bg-blue-700 align-middle">
                                <CgArrowLeft size={35} />
                            </button>
                        </Link>
                    </div>
                    <div className="flex flex-row space-x-3">
                        <button onClick={() => handleClick(true)} className="text-sm font-semibold p-2 bg-blue-500 rounded-xl w-fit hover:bg-blue-700">
                            MEMBERS
                        </button>
                        <button onClick={() => handleClick(false)} className="text-sm font-semibold p-2 bg-blue-500 rounded-xl w-fit hover:bg-blue-700">
                            LLMs
                        </button>
                    </div>
                </div>
                <div className="flex flex-col h-full space-y-2 p-5">
                    {/* Map through all members */}
                    {members && members.map((member) => (
                        <AdminMembersList key={member.id} member={member} />
                    ))}
                </div>
            </div>
        </Sidebar>
    )
}