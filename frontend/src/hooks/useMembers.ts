"use client";

import { useEffect, useState } from "react";
import { getAllTeamMembers } from "../services/team";
import { Member } from "../types";

/**
 * Custom hook to fetch and manage all members for a specific team.
 * @param {string} teamId - The ID of the team.
 * @returns {Array} Array containing members, updateMembers function, loading state, and error state.
 */
export default function useMembers(teamId: string) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch members from API and update state.
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await getAllTeamMembers(teamId);
                if (response.success && response.data && response.data.members) {
                    const membersFromAPI = response.data.members;
                    setMembers(membersFromAPI);
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
        fetchMembers();
    }, [teamId]);

    /**
     * Update members state.
     * @param {Member[]} members - New members state.
     */
    const updateMembers = (members: Member[]) => {
        setMembers(members);
    };

    /**
     * Delete a member from the members state.
     * @param {string} memberId - The ID of the member to delete.
     */
    const deleteMember = (memberId: string) => {
        setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    };

    return [members, updateMembers, loading, error, deleteMember] as const;
}
