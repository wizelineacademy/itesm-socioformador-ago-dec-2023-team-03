'use client';

import React from 'react';

// Components
import Sidebar from './_components/sidebar';
import Chat from './_components/chat';

// Services
import services from '@/src/services';

// Hooks
import hooks from '../../hooks'

function ChatPage(props) {
  const [chats, setChats] = React.useState([]);
  const searchParams = props.searchParams;

  const session = hooks.useSession();

  async function initialFetch() {
    const myChats = await services.me.getMyChats({
      query: {
        'team-id': searchParams['team-id'],
        'llm-id': searchParams['llm-id']
      }
    });

    setChats(myChats.data.chats);
  }

  React.useEffect(() => {
    if (session.me) {
      initialFetch();
    }
  }, [session.me]);

  if (session.isLoading) return <div className='loader'></div>;
  if (session.error) return null;

  return (
    <div className='relative z-0 flex h-full w-full overflow-hidden'>
      <main className='flex w-full h-full'>
        <Sidebar chats={chats} />
        <Chat />
      </main>
    </div>
  )
}

export default ChatPage;
