"use client";

import { getAllMembers } from "@/src/services/member";
import { Member } from "@/src/types";
import { useEffect, useState } from "react";

/**
 * Custom hook to fetch and manage all members
 * @returns {Array} Array containing members, updateMembers function, loading state, and error state
 */
export default function useAllMembers() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        /* Fetch members from API and update state */
        const fetchMembers = async () => {
            try {
                const response = await getAllMembers();
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
    }, [members.length]);

    /**
     * Update members state.
     * @param {Member[]} members - New members state.
     */
    const updateMembers = (members: Member[]) => {
        setMembers(members);
    };

    return [members, updateMembers, loading, error] as const;
}
