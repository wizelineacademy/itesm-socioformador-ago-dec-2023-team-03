"use client";

import { useEffect, useState } from "react";
import { Member } from "../types";
import { getAllTeamMembers } from "../services/team";

export default function useMembers(teamId: string) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

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

    // Update Members
    const updateMembers = (members: Member[]) => {
        setMembers(members);
    };

    // Función para eliminar un miembro
    const deleteMember = (memberId: string) => {
        setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
    };

    return [members, updateMembers, loading, error, deleteMember] as const;
}