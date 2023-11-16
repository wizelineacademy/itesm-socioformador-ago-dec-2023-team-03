"use client";

import { useState, useEffect } from "react";
import { LLM } from "../types";
import { getAllLLM } from "@/src/services/llm";

export default function useLLM(teamId: string) {
    const [llms, setLLMs] = useState<LLM[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

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

    // Update LLms
    const updateLLMs = (llms: LLM[]) => {
        setLLMs(llms);
    };

    return [llms, updateLLMs, loading, error] as const;
}