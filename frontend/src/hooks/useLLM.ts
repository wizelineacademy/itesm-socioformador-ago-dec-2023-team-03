"use client";

import { getAllLLM } from "@/src/services/llm";
import { useEffect, useState } from "react";
import { LLM } from "../types";

/**
 * Custom hook to fetch and manage all LLMs for a specific team.
 * @param {string} teamId - The ID of the team.
 * @returns {Array} Array containing LLMs, updateLLMs function, loading state, and error state.
 */
export default function useLLM(teamId: string) {
    const [llms, setLLMs] = useState<LLM[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    // Fetch LLMs from API and update state
    useEffect(() => {
        const fetchLLMs = async () => {
            try {
                const response = await getAllLLM(teamId);
                if (response.success && response.data && response.data.llms) {
                    const llmsFromAPI = response.data.llms;
                    setLLMs(llmsFromAPI);
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
        fetchLLMs();
    }, []);

    /**
     * Update LLMs state.
     * @param {LLM[]} llms - New LLMs state.
     */
    const updateLLMs = (llms: LLM[]) => {
        setLLMs(llms);
    };

    return [llms, updateLLMs, loading, error] as const;
}
