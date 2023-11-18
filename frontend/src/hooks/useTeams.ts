"use client"

import { useEffect, useState } from "react";
import { Team } from "../types";
import { getAllTeams } from "../services/team";


// Custom Hook for fetching ALL teams from the API
export default function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

useEffect(() => {
    const fetchTeams = async () => {
        try {
            const response = await getAllTeams();
            if (response.success && response.data && response.data.teams) {
                const teamsFromAPI = response.data.teams;
                setTeams(teamsFromAPI);
                setLoading(false);
            } else {
                setError(new Error("Invalid response format"));
                setLoading(false);
            }
        } catch (err: any) {
            setError(err);
            setLoading(false);
        }
    };
    fetchTeams();
}, []);

// Update Teams
const updateTeams = (teams: Team[]) => {
    setTeams(teams);
};

    return [teams, updateTeams, loading] as const;
}
