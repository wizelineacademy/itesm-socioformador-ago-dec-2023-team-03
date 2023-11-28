"use client"

import { useEffect, useState } from "react";
import { getAllTeams } from "../services/team";
import { Team } from "../types";


/**
 * Custom Hook for fetching ALL teams from the API.
 * @returns {Array} Array containing teams, updateTeams function, loading state, and error state.
 */
export default function useTeams() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch teams from API and update state
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

    /**
     * Update teams state.
     * @param {Team[]} teams - New teams state.
     */
    const updateTeams = (teams: Team[]) => {
        setTeams(teams);
    };

    return [teams, updateTeams, loading] as const;
}
