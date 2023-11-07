'use client';

import React from 'react';

import { BiMessageAlt } from 'react-icons/bi';
import { CgMathPlus } from 'react-icons/cg';

import Link from 'next/link';

import chatContext from '../../_context';

function Sidebar(props) {
  const _chatContext = chatContext.use();
  const chatActions = _chatContext.actions;
  const chatState = _chatContext.state;
  let chats = chatState.chats.length > 0
    ? chatState.chats
    : props.chats
  
  React.useEffect(() => {
    chatActions.setChats(chats);
  }, []);

  function createChat() {
    chatActions.createChat({
      id: '8edc3c96-837d-4d31-9988-58465e3ea6e8',
      title: 'My Chat 4',
      createdAt: '2023-10-25T23:37:05.056Z',
      updatedAt: '2023-10-25T23:37:05.056Z',
      memberId: '264cd451-05ef-45d8-9528-3307fc538d2f',
      teamId: '5fc21cc8-14d6-4e32-8c4a-86a4762814ab',
      llmId: '3a8f9893-1435-48f5-bd34-1cc0a5b6dfac'
    });
  }

  return (
    <aside className='flex flex-col bg-regal-blue-dark w-64 shrink-0 border-r border-gray-600 p-4'>
      <p className='mb-4'>
        <span className='font-semibold text-brand-primary'>Team: </span>Equipo el nuevo 1
      </p>
      <button
          onClick={() => createChat()}
          className='border border-gray-600 w-full py-2 px-4 rounded-md flex justify-center items-center gap-x-3 mb-2'
        >
          <CgMathPlus size={20} />
          <span>New chat</span>
      </button>
      <ul className='overflow-y-auto grow'>
        {chats.map((chat, idx) => (
          <li key={`${idx}-${chat.id}`}>
            <Link
              href={`/chat/${chat.id}`}
              className='flex w-full rounded-md px-2 py-3 items-center gap-x-2 hover:bg-regal-blue-light'
            >
              <BiMessageAlt />
              {chat.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
