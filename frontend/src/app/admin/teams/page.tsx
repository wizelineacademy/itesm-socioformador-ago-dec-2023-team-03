"use client";

import Sidebar from "@/src/app/components/Sidebar";
import { useRouter } from "next/navigation";
import useTeams from "@/src/hooks/useTeams";
import { Team } from "@/src/types";
import { useEffect, useState } from "react";

export default function TeamsPage() {
  const router = useRouter();
  const [teams, setTeams, teamsLoading] = useTeams();
  const [search, setSearch] = useState<string>("");
  const [filteredTeams, setFilteredTeams] = useState<Team[]>(teams);

  useEffect(() => {
    const filteredTeams = teams.filter((team) => {
      return team.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredTeams(filteredTeams);
  }, [search, teams]);

  function handleCreateGroup(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error("Function not implemented.");
  }

  if (teamsLoading) return (
    <div className="flex flex-col w-full h-full items-center justify-center align-middle">
      <span className="loading loading-spinner loading-lg text-accent "></span>
    </div>
  );

  function handleTeamDetails(event: React.MouseEvent<HTMLDivElement, MouseEvent>, teamId: string): void {
    router.push(`/admin/teams/${teamId}`)
  }

  return (
    <div className="flex flex-col overflow-auto h-full">
      <div className="flex flex-row flex-none justify-between items-center space-x-4 p-2">
        <input type="text" className="px-3 py-2 text-black bg-gray-100 rounded-xl w-1/3" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="flex w-fit text-sm px-3 py-2 btn btn-neutral btn-md text-white" onClick={handleCreateGroup}>
          Create Team
        </button>
      </div>
      <div className="flex flex-col overflow-y-auto flex-grow h-full">
        <ul className="space-y-3 h-full p-5 overflow-y-scroll bg-regal-blue-normal">
          {filteredTeams && filteredTeams.map((team: Team) => (
            <div key={team.id} onClick={(event) => handleTeamDetails(event, team.id)} className="flex w-full rounded-md px-2 py-3 justify-between cursor-pointer items-center gap-3 btn btn-primary">
              <div className="ml-10">
                {team.name}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );

}
