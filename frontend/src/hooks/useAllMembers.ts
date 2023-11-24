"use client";

import { useEffect, useState } from "react";
import { Member } from "@/src/types";
import { getAllMembers } from "@/src/services/member";

export default function useAllMembers() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
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

    // Update Members
    const updateMembers = (members: Member[]) => {
        setMembers(members);
    };

    return [members, updateMembers, loading, error] as const;
}