"use client"

import {useEffect, useState } from "react";
import { Token } from "../types";
import TokenService from "../services/tokens";

export default function useTokens(teamId: string, memberId: string) {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        TokenService.getTokens({
            'team-id': teamId,
            'member-id': memberId
        })
            .then((tokens) => {
                //setTokens(tokens.data.tokens);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [teamId, memberId]);

    return [ tokens, loading, error ] as const;
}