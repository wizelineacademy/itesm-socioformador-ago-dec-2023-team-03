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

    setChats(myChats.data.chats);

    const getTokensResponse = await services.tokens.getTokens({
      'team-id': teamId,
      'llm-id': llmId,
      'member-id': session.me.id
    })

    const tokensQty = getTokensResponse.data.tokens[0].quantity;
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

  React.useEffect(() => {
    if (selectedChatId) {
      async function findChat() {
        const chatResponse = await services.chat.findChatById(selectedChatId);
        console.log(chatResponse);
        if (chatResponse.success && chatResponse.data && chatResponse.data.chat) {
          setSelectedChat(chatResponse.data.chat);
        }
      }
      findChat();
    }
  }, [selectedChatId]);

  if (session.isLoading) return <div className='loader'></div>;
  if (session.error) return null;

  return (
    <chatContext.Provider>
      <div className='relative z-0 flex h-full w-full overflow-hidden'>
        <main className='flex w-full h-full'>
          <Sidebar
            chats={chats}
            teamName={teamName}
            setSelectedChatId={setSelectedChatId}
            selectedChatId={selectedChatId}
          />
          <Chat chat={selectedChat} tokens={tokens} />
        </main>
      </div>
    </chatContext.Provider>
  );
}

export default ChatPageLayout;
