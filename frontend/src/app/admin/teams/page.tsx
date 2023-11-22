"use client";

import Sidebar from "@/src/app/components/Sidebar";
import NewGroup from "@/src/components/modals/NewGroup";
import useTeams from "@/src/hooks/useTeams";
import { Team } from "@/src/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [teams, setTeams, teamsLoading] = useTeams();
  const [search, setSearch] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<Team[]>(teams);
  const modal = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    const filteredTeams = teams.filter((team) => {
      return team.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTeams(filteredTeams);
  }, [search, teams]);

  function handleCreateGroup(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const openModal = () => {
      if (modal.current) {
        modal.current.showModal();
      }
    }
    openModal();
  }

  if (teamsLoading) return <div>Teams loading!...</div>

  function handleTeamDetails(event: React.MouseEvent<HTMLDivElement, MouseEvent>, teamId: string): void {
    router.push(`/admin/teams/${teamId}`)
  }

  const closeModal = () => {
    if (modal.current) {
      modal.current.close();
    }
  }

  return (
    <Sidebar>
      <div className="flex justify-between items-center space-x-4 p-2">
        <input type="text" className="px-3 py-2 bg-gray-400 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="flex w-fit text-sm px-3 py-2 bg-blue-500 rounded-xl hover:bg-blue-700" onClick={handleCreateGroup}>
          + Create Group
        </button>
      </div>
      <dialog ref={modal} className="py-3 px-14 rounded-2xl space-y-4">
        <NewGroup close={closeModal} />
      </dialog>
      <ul className="space-y-3 h-full p-5 overflow-y-scroll bg-regal-blue-normal">
        {filteredTeams && filteredTeams.map((team: Team) => (
          <div key={team.id} onClick={(event) => handleTeamDetails(event, team.id)} className="flex w-full rounded-md px-2 py-3 justify-between cursor-pointer items-center gap-3 bg-regal-blue hover:bg-regal-blue-light">
            <div className="ml-10">
              {team.name}
            </div>
          </div>
        ))}
      </ul>
    </Sidebar>
  );

}
