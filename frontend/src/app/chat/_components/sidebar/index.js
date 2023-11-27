'use client';

import React, { useState } from 'react';

import { BiMessageAlt } from 'react-icons/bi';
import { CgMathPlus } from 'react-icons/cg';

import { toast } from 'react-hot-toast';

import { useSearchParams } from 'next/navigation';
import services from '@/src/services';
import Link from 'next/link';
import { RiDeleteBin6Line } from "react-icons/ri";

function Sidebar({
  chats,
  setChats,
  teamName,
  setSelectedChatId,
  selectedChatId
}) {
  const searchParams = useSearchParams();
  const [hoveredChatIdx, setHoveredChatIdx] = useState(null);

  const teamId = searchParams.get('team-id');
  const llmId = searchParams.get('llm-id');

  async function deleteChat(chatId) {
    const res = await services.chat.remove(chatId);
    console.log(res);

    const myChats = await services.me.getMyChats({
      query: {
        'team-id': teamId,
        'llm-id': llmId
      }
    });

    setChats(myChats.data.chats);
  }

  async function createChat() {
    const chatId = searchParams.get('chat-id');

    let chat;
    if (!chatId) {
      const date = new Date();
      const day = date.getDay();
      const month = date.getMonth();
      const year = date.getFullYear();
      let minutes = date.getMinutes();
      let minutePrefix = '0';
      if (String(minutes).length === 1) {
        minutePrefix += minutes;
        minutes = minutePrefix;
      }
      const hour = date.getHours();
      const res = await services.chat.create({
        teamId,
        llmId,
        title: `${year}-${month}-${day} ${hour}:${minutes}`
      });
      if (res.success) {
        chat = res.data.chat;
        setChats((chats) => [chat, ...chats]);
        setSelectedChatId(chat.id);
      } else {
        toast.error(res.error.message, { position: 'top-center' });
      }
    }
  }

  return (
    <aside className='flex flex-col bg-regal-blue-dark w-64 shrink-0 border-r border-gray-600 p-4'>
      <p className='mb-4'>
        <span className='font-semibold text-brand-primary'>Team: </span>{teamName}
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
            <button
              onMouseEnter={() => setHoveredChatIdx(idx)}
              onMouseLeave={() => setHoveredChatIdx(null)}
              className={('flex w-full rounded-md px-2 py-3 pr-3 justify-between items-center hover:bg-regal-blue-light' +
                          (chat.id === selectedChatId ? ' bg-regal-blue-light' : ''))}
              onClick={() => setSelectedChatId(chat.id)}
            >
              <div className='flex items-center gap-x-2'>
                <BiMessageAlt />
                {chat.title}
              </div>
              {hoveredChatIdx === idx && (
                <div onClick={() => deleteChat(chat.id)}>
                  <RiDeleteBin6Line color={'#E93D44'} size={16} />
                </div>
                )
              }
            </button>
          </li>
        ))}
      </ul>
      <Link href='/teams'>
        <span className='font-semibold text-brand-primary'>Go Home </span>
      </Link>
    </aside>
  );
}

export default Sidebar;
