'use client';

import React from 'react';

// Services
import services from '@/src/services';

// Hooks
import hooks from '../../hooks';

import chatContext from './_context';
import Sidebar from './_components/sidebar';
import Chat from './_components/chat';

import { useSearchParams } from 'next/navigation';

function ChatPageLayout() {
  const [chats, setChats] = React.useState([]);
  const [tokens, setTokens] = React.useState(null);
  const [teamName, setTeamName] = React.useState('');
  const [llm, setLlm] = React.useState(null);
  const [selectedChatId, setSelectedChatId] = React.useState(null);
  const [selectedChat, setSelectedChat] = React.useState({});
  const searchParams = useSearchParams();

  const session = hooks.useSession();

  async function initialFetch() {
    const teamId = searchParams.get('team-id');
    const llmId = searchParams.get('llm-id');
    const myChats = await services.me.getMyChats({
      query: {
        'team-id': teamId,
        'llm-id': llmId
      }
    });

    const chats = myChats.data.chats;
    setChats(chats);

    const llmRes = await services.llm.find(llmId);
    if (llmRes.success) {
      setLlm(llmRes.data.llm);
    }

    if (chats.length > 0) {
      setSelectedChatId(chats[0].id);
    }

    const getTokensResponse = await services.tokens.getTokens({
      'team-id': teamId,
      'llm-id': llmId,
      'member-id': session.me.id
    })

    const tokensQty = getTokensResponse.data.tokens[0]?.quantity || 0;
    setTokens(tokensQty);

    const teamResponse = await services.team.findTeamById(teamId);
    const teamName = teamResponse.data.team.name;
    setTeamName(teamName);
  }

  React.useEffect(() => {
    if (session.me) {
      initialFetch();
    }
  }, [session.me]);

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
