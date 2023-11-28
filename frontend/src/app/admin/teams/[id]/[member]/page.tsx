"use client";

import useTokens from "@/src/hooks/useTokens";
import useAllLLM from "@/src/hooks/useAllLLM";
import Link from "next/link";
import { LLM, Token } from "@/src/types";
import Image from 'next/image';
import img from '/public/images/chat-gpt-logo.svg.png';
import { RiCopperCoinFill } from 'react-icons/ri';
import useLLM from "@/src/hooks/useLLM";

interface DisplayLLM {
    id: string;
    name: string;
    model: string;
    picture: string;
    tokens: number;
}

function createDisplayLLMArray(llms: LLM[], tokens: Token[]): DisplayLLM[] {
    const tokenCounts = tokens.reduce((acc, token) => {
        if (token.llmId) {
            acc[token.llmId] = (acc[token.llmId] || 0) + token.quantity;
        }
        return acc;
    }, {} as { [key: string]: number });

    const displayLLMs = llms.map((llm) => {
        const pictureUrl = 'default_picture_url';
        return {
            id: llm.id,
            name: llm.name,
            model: llm.model,
            picture: pictureUrl,
            tokens: tokenCounts[llm.id] || 0,
        };
    });

    return displayLLMs;
}

export default function Home({ params }: { params: { id: string, member: string } }) {

    const [tokens, tokensLoading, tokensError] = useTokens(params.id, params.member);
    const [llm, setLLm, allLLMLoading, allLLMError] = useLLM(params.id);

    if (tokensLoading && allLLMLoading) return (
        <div className="flex flex-col w-full h-full items-center justify-center align-middle">
            <span className="loading loading-spinner loading-lg text-accent "></span>
        </div>
    );

    const displayLLMs = createDisplayLLMArray(llm, tokens);
    console.log(displayLLMs);

    return (
        <div className="flex flex-col h-full w-full overflow-auto">
            <div className="flex flex-row flex-none p-2 align-middle justify-between w-full">
                <Link href={`/admin/teams/${params.id}`}>
                    <button className="btn btn-circle btn-sm text-white btn-neutral">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                        </svg>
                    </button>
                </Link>
            </div>
            <div className="flex flex-row p-2 space-x-4 bg-regal-blue-normal h-full overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {displayLLMs?.map((token) => (
                        <div className="card w-full h-fit bg-base-100 shadow-xl items-center p-2">
                            <Image src={img} width={150} alt="" />
                            <div className="card-body">
                                <h2 className="card-title">{token.name}</h2>
                                <h3 className="card-compact">{token.model}</h3>
                                <p><RiCopperCoinFill className='inline' size={24} color='#E5B43C' /> {token.tokens}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}