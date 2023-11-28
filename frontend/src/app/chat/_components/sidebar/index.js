'use client';

import { useState } from 'react';

import { BiMessageAlt } from 'react-icons/bi';
import { CgMathPlus } from 'react-icons/cg';

import services from '@/src/services';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { RiDeleteBin6Line } from "react-icons/ri";

/**
 * Sidebar component.
 * @component
 * @param {Object} props - The props.
 * @param {Array} props.chats - The chats.
 * @param {Function} props.setChats - The function to set chats.
 * @param {string} props.teamName - The team name.
 * @param {Function} props.setSelectedChatId - The function to set the selected chat ID.
 * @param {string} props.selectedChatId - The selected chat ID.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
function Sidebar({
  chats,
  setChats,
  teamName,
  setSelectedChatId,
  selectedChatId
}) {
  const searchParams = useSearchParams();
  const [hoveredChatIdx, setHoveredChatIdx] = useState(null);

  // Get the team ID and the LLM ID from the URL search parameters
  const teamId = searchParams.get('team-id');
  const llmId = searchParams.get('llm-id');

  /**
   * Deletes a chat.
   * @async
   * @param {string} chatId - The chat ID.
   */
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

  /**
   * Creates a new chat.
   * @async
   */
  async function createChat() {
    // Get the chat ID from the search parameters
    const chatId = searchParams.get('chat-id');

    let chat;
    // If there is no chat ID, create a new chat
    if (!chatId) {
      // Get the current date and format it
      const date = new Date();
      const day = date.getDay();
      const month = date.getMonth();
      const year = date.getFullYear();
      let minutes = date.getMinutes();
      let minutePrefix = '0';
      // If the minutes are a single digit, add a leading zero
      if (String(minutes).length === 1) {
        minutePrefix += minutes;
        minutes = minutePrefix;
      }
      const hour = date.getHours();
      // Make a request to create a new chat
      const res = await services.chat.create({
        teamId,
        llmId,
        title: `${year}-${month}-${day} ${hour}:${minutes}`
      });
      // If the request is successful, set the chat state with the new chat
      if (res.success) {
        chat = res.data.chat;
        setChats((chats) => [chat, ...chats]);
        setSelectedChatId(chat.id);
      }
    }
  }

  // Render the sidebar with the chat title and a list of chats
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
        {/* map the chats */}
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
                <button onClick={() => deleteChat(chat.id)}>
                  <RiDeleteBin6Line color={'#E93D44'} size={16} />
                </button>
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
