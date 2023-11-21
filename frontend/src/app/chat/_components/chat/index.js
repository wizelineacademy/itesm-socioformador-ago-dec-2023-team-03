'use client';

import React, { useState } from 'react';

import chatContext from '../../_context';

import { MdSend } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { RiCopperCoinFill } from 'react-icons/ri';

import Image from 'next/image';
import img from '/public/images/chat-gpt-logo.svg.png';
import services from '@/src/services';
import { useSearchParams } from 'next/navigation';

function Chat({ chat, tokens }) {
  const _chatContext = chatContext.use();
  const chatState = _chatContext.state;
  const chatActions = _chatContext.actions;
  const [prompts, setPrompts] = useState(chat.prompts || []);

  const searchParams = useSearchParams();

  async function sendPrompt(e) {
    e.preventDefault();

    const teamId = searchParams.get('team-id');
    const llmId = searchParams.get('llm-id');
    const chatId = searchParams.get('chat-id');

    let chat;
    if (!chatId) {
      const res = await services.chat.create({
        teamId,
        llmId,
        title: ''
      });
      if (res.success) {
        chat = res.data.chat;
      }
    }

    let prompt;
    if (chat) {
      const res = await services.chat.createPrompt(chat.id);
      if (res.success) {
        console.log('success');
        // prompt = res.data.prompt;
        // setPrompts([...prompts, prompt]);
      }
    }


    console.log('CHAT', chat);
    console.log('PROMPT', prompt);
    return;

    services.chat.createPrompt()
    console.log(chatState);
    chatActions.setPrompt('');
  }

  console.log(chat);

  return (
    <div className='w-full flex flex-col'>
      <header className='h-14 bg-regal-blue-normal border-b border-b-gray-600 shrink-0'>
        <div className='flex justify-between items-center h-full px-4'>
          <div className='inline-flex items-center gap-x-3'>
            <Image
              className=' rounded-full'
              width={32}
              height={32}
              alt='ChatGPT logo'
              src={img}
            />
            <span className='font-semibold'>ChatGPT-4</span>
          </div>
          <div className='inline-flex items-center gap-x-1'>
            <RiCopperCoinFill className='inline' size={24} color='#E5B43C' />
            <span className=' font-semibold'>{tokens}</span>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <div className='h-full overflow-y-scroll'>
        {
          prompts && prompts.length ?
            prompts.map((prompt, idx) => (
              <div key={prompt.id}>
                <div className='p-6 bg-regal-blue-light'>
                  <div className='max-w-2xl mx-auto flex gap-x-3 relative'>
                    <p className='text-base/7 text-gray-200 font-light'>{prompt.message}</p>
                    <BiLike size={18} className='flex-shrink-0 absolute -right-5' />
                  </div>
                </div>
                <div style={{ borderColor: '#434957' }} className={`${idx !== 0 ? 'border-t' : ''} border-b p-6 bg-regal-blue-normal`}>
                  <div className='max-w-2xl mx-auto'>
                    <p className='text-base/7 text-gray-300 font-light'>{prompt.responses[0]?.message}</p>
                  </div>
                </div>
              </div>
            ))
            : (
              <div className='w-full h-full flex justify-center items-center flex-col'>
                <h1 className='text-brand-primary text-5xl font-semibold mb-3'>Wizeprompt</h1>
                <p className=' text-neutral-300 text-lg'>Start a conversation by writing whatever you want</p>
              </div>
            )
        }
      </div>

      {/* Input bar container */}
      <div className='bg-regal-blue-normal w-full h-24 flex-shrink-0 px-5 flex items-center border-t border-t-gray-600'>
        <form className='w-full flex' onSubmit={sendPrompt}>
          <textarea
            onChange={(e) => chatActions.setPrompt(e.target.value)}
            value={chatState.prompt}
            className='w-full resize-none block rounded-tl-md rounded-bl-md p-3 h-12 outline-none bg-regal-blue-light'
            placeholder='Send a message'
          />
          <button
            className='flex justify-center items-center aspect-square h-12 rounded-tr-md rounded-br-md'
            style={{ backgroundColor: '#E93D44' }}
            type='submit'
          >
              <MdSend size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
