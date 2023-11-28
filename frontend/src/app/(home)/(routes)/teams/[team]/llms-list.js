'use client';

import hooks from '@/src/hooks';
import services from '@/src/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiCopperCoinFill } from 'react-icons/ri';

function LlmsList({ llms, teamId }) {
  const [tokens, setTokens] = useState([]);

  const session = hooks.useSession();

  useEffect(() => {
    if (session.me) {
      (async() => {
        const getTokensResponse = await services.tokens.getTokens({
          'team-id': teamId,
          'member-id': session.me.id
        });
        setTokens(getTokensResponse.data.tokens);
      })();
    }
  }, [session.me]);

  function getLlmTokensQty(llmId) {
    if (tokens) {
      const llmTokens = tokens.find((token) => token.llmId === llmId);
      return llmTokens?.quantity || 0;
    } else {
      return null;
    }
  }

  if (tokens.length === 0) {
    return null;
  }

  return (
    <ul>
      {
        llms.length > 0
          ? (
            <ul className='flex flex-col gap-y-1 h-full'>
              {llms.map((llm, idx) => (
                <li key={`${idx}-${llm.id}`}>
                  <Link href={`/chat?team-id=${teamId}&llm-id=${llm.id}`} className='font-medium w-full flex p-5 justify-between bg-regal-blue-dark hover:bg-regal-blue-light'>
                    <div className='flex flex-col'>
                      {llm.name}
                      <span className=' text-xs font-light'>{llm.model}</span>
                    </div>
                    <div className='inline-flex items-center gap-x-1'>
                      <RiCopperCoinFill className='inline' size={24} color='#E5B43C' />
                      <span className=' font-semibold'>{getLlmTokensQty(llm.id)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : <h1>Team does not have access to any LLM</h1>
      }
    </ul>
  );
}

export default LlmsList;
