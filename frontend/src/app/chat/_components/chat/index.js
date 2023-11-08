'use client';

import React from 'react';

import chatContext from '../../_context';

import { MdSend } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { RiCopperCoinFill } from 'react-icons/ri';

import Image from 'next/image';
import img from '/public/images/chat-gpt-logo.svg.png';

function Chat({ chat }) {
  const _chatContext = chatContext.use();
  const chatState = _chatContext.state;
  const chatActions = _chatContext.actions;

  function sendPrompt(e) {
    e.preventDefault();
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
            <span className=' font-semibold'>12.000</span>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <div className='h-full overflow-y-scroll'>
        {
          chat ?
            new Array(10).fill(1).map((item, idx) => (
              idx % 2 !== 0
                ? (
                  <div className='p-6 bg-regal-blue-light'>
                    <div className='max-w-2xl mx-auto flex gap-x-3 relative'>
                      <p className='text-base/7 text-gray-200 font-light'>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
                      <BiLike size={18} className='flex-shrink-0 absolute -right-5' />
                    </div>
                  </div>
                ) : (
                  <div style={{ borderColor: '#434957' }} className={`${idx !== 0 ? 'border-t' : ''} border-b p-6 bg-regal-blue-normal`}>
                    <div className='max-w-2xl mx-auto'>
                      <p className='text-base/7 text-gray-300 font-light'>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
                    </div>
                  </div>
                )
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
