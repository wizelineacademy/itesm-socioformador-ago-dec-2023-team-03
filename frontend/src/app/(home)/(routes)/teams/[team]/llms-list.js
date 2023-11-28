'use client';

import hooks from '@/src/hooks';
import services from '@/src/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RiCopperCoinFill } from 'react-icons/ri';

/**
 * LlmsList component. This components list all LLMs of a team.
 * @function
 * @param {object} props - Component props.
 * @param {Array} props.llms - The llms array.
 * @param {string} props.teamId - The team ID.
 * @returns {JSX.Element|null} Rendered component.
 */
function LlmsList({ llms, teamId }) {
  // State variable for tokens
  const [tokens, setTokens] = useState([]);

  // Use the useSession hook to get the current session
  const session = hooks.useSession();

  // Get the tokens of the user
  useEffect(() => {
    if (session.me) {
      (async () => {
        for (const llm of llms) {
          const getTokensResponse = await services.tokens.getTokens({
            'team-id': teamId,
            'llm-id': llm.id,
            'member-id': session.me.id
          });
          // Add the tokens to the state (including the previous state), if there are no tokens add null
          setTokens((prev) => [...prev, getTokensResponse.data.tokens[0] || null]);
          console.log(getTokensResponse);
        }
      })();
    }
  }, [session.me]);

  if (tokens.length === 0) {
    return null;
  }

  return (
    <ul>
      {/* map llms if the length is greather than 0, if not shows a legend */}
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
                      <span className=' font-semibold'>{tokens[idx]?.quantity || 0}</span>
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
