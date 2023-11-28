'use client';

import React from 'react';

// Services
import services from '@/src/services';

// Hooks
import hooks from '../../hooks';

// Import chat context
import chatContext from './_context';

// Import Chat and Sidebar components
import Chat from './_components/chat';
import Sidebar from './_components/sidebar';

import { useSearchParams } from 'next/navigation';

/**
 * ChatPageLayout component.
 * @component
 * @returns {JSX.Element} The rendered ChatPageLayout component.
 */
function ChatPageLayout() {
  // State variables for chats, tokens, team name, llm, selected chat ID and selected chat
  const [chats, setChats] = React.useState([]);
  const [tokens, setTokens] = React.useState(null);
  const [teamName, setTeamName] = React.useState('');
  const [llm, setLlm] = React.useState(null);
  const [selectedChatId, setSelectedChatId] = React.useState(null);
  const [selectedChat, setSelectedChat] = React.useState({});

  // Get search parameters from the URL
  const searchParams = useSearchParams();

  // Get the current session using the useSession hook
  const session = hooks.useSession();

  /**
   * Fetches initial data.
   * @async
   */
  async function initialFetch() {
    // Get team ID and llm ID from the search parameters
    const teamId = searchParams.get('team-id');
    const llmId = searchParams.get('llm-id');

    // Fetch the current user's chats
    const myChats = await services.me.getMyChats({
      query: {
        'team-id': teamId,
        'llm-id': llmId
      }
    });

    // Set the chats state variable with the chats from the response
    const chats = myChats.data.chats;
    setChats(chats);

    // Fetch the LLM data
    const llmRes = await services.llm.find(llmId);
    if (llmRes.success) {
      // If the fetch was successful, set the LLM state variable
      setLlm(llmRes.data.llm);
    }

    // If there are any chats, set the selected chat ID to the first chat's ID
    if (chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }

    // Fetch the tokens for the current user
    const getTokensResponse = await services.tokens.getTokens({
      'team-id': teamId,
      'llm-id': llmId,
      'member-id': session.me.id
    })

    // Set the tokens state variable with the quantity of tokens from the response
    const tokensQty = getTokensResponse.data.tokens[0]?.quantity || 0;
    setTokens(tokensQty);

    // Fetch the team data
    const teamResponse = await services.team.findTeamById(teamId);
    // Set the team name state variable with the team name from the response
    const teamName = teamResponse.data.team.name;
    setTeamName(teamName);
  }

  // Use effect hook to fetch initial data when the session changes
  React.useEffect(() => {
    if (session.me) {
      initialFetch();
    }
  }, [session.me]);

  // If the session is loading, return a loader. Is an error with the session thrown, return null
  if (session.isLoading) return <div className='loader'></div>;
  if (session.error) return null;

  return (
    <chatContext.Provider>
      <div className='relative z-0 flex h-full w-full overflow-hidden'>
        <main className='flex w-full h-full'>
          <Sidebar
            chats={chats}
            setChats={setChats}
            teamName={teamName}
            setSelectedChatId={setSelectedChatId}
            selectedChatId={selectedChatId}
          />
          <Chat
            tokens={tokens}
            setChats={setChats}
            llm={llm}
            selectedChatId={selectedChatId}
            setTokens={setTokens}
          />
        </main>
      </div>
    </chatContext.Provider>
  );
}

export default ChatPageLayout;
