'use client';

import { useEffect, useRef, useState } from 'react';

import chatContext from '../../_context';

import { MdSend } from 'react-icons/md';
import { RiCopperCoinFill } from 'react-icons/ri';

import services from '@/src/services';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import img from '/public/images/chat-gpt-logo.svg.png';
import toast from 'react-hot-toast';

/**
 * The Chat component itself.
 * @component
 * @param {Object} props - The props.
 * @param {number} props.tokens - The tokens.
 * @param {string} props.selectedChatId - The selected chat ID.
 * @param {Function} props.setTokens - The function to set tokens.
 * @param {Object} props.llm - The LLM.
 * @param {Function} props.setChats - The function to set chats.
 * @returns {JSX.Element} The rendered Chat component.
 */
function Chat({ tokens, selectedChatId, setTokens, llm, setChats }) {
  const _chatContext = chatContext.use();
  const chatState = _chatContext.state;
  const chatActions = _chatContext.actions;
  const [prompts, setPrompts] = useState([]);
  const user = useUser();
  const [promptIsLoading, setPromptIsLoading] = useState(false);

  const promptsRef = useRef();

  const searchParams = useSearchParams();

  /**
   * Sends a prompt.
   * @async
   * @param {Event} e - The event.
   */
  async function sendPrompt(e) {
    e.preventDefault();

    const teamId = searchParams.get('team-id');
    const llmId = searchParams.get('llm-id');

    setPromptIsLoading(true);
    
    const res = await services.chat.createPrompt(selectedChatId, {
      llmId, teamId, message: chatState.prompt
    });
    
    setPromptIsLoading(false);

    if (!res.success) {
      chatActions.setPrompt('');
      return toast.error(res.message, { position: 'top-center' });
    }

    const totalTokens = res.data?.totalTokens;
    if (totalTokens) {
      setTokens((currTokens) => currTokens - totalTokens);
    }

    // If the prompts request is successful, set the prompts state with the received data
    const promptsRes = await services.chat.getPrompts(selectedChatId);
    if (promptsRes.success) {
      setPrompts(promptsRes.data.prompts);
    }

    // Make a request to get the user's chats
    const myChats = await services.me.getMyChats({
      query: {
        'team-id': teamId,
        'llm-id': llmId
      }
    });

    // Set the chats state with the received data
    const chats = myChats.data.chats;
    setChats(chats);

    chatActions.setPrompt('');
  }

  // Use effect hook to fetch prompts when the selected chat ID changes
  useEffect(() => {
    (async () => {
      if (selectedChatId) {
        const res = await services.chat.getPrompts(selectedChatId);
        if (res.success) {
          setPrompts(res.data.prompts);
        }
      }
    })();
  }, [selectedChatId]);

  // Use effect hook to scroll to the bottom of the prompts list when it updates
  useEffect(() => {
    promptsRef.current.scrollTo({
      top: promptsRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [selectedChatId, prompts, promptIsLoading]);

  return (
    <div className='w-full flex flex-col'>
      {/* Display current LLM and their tokens in the header */}
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
            <span className='font-semibold'>{llm?.name}</span>
          </div>
          <div className='inline-flex items-center gap-x-1'>
            <RiCopperCoinFill className='inline' size={24} color='#E5B43C' />
            <span className=' font-semibold'>{tokens}</span>
          </div>
        </div>
      </header>

      {/* Messages container */}
      <div className='h-full overflow-y-scroll' ref={promptsRef}>
        {
          prompts && prompts.length ?
            prompts.map((prompt, idx) => (
              <div key={prompt.id}>
                <div className='p-6 bg-regal-blue-light'>
                  <div className='max-w-2xl mx-auto flex gap-x-5'>
                    <div className='shrink-0'>
                      {user?.user && <img className=' rounded-md' src={user.user?.picture || ''} width={36} height={36} alt='avatar' />}
                    </div >
                    <div className='max-w-2xl flex gap-x-3 relative'>
                      <p className='text-base/7 text-gray-200 font-light'>{prompt.message}</p>
                      {/* <BiLike size={18} className='flex-shrink-0 absolute -right-5' /> */}
                    </div>
                  </div>
                </div>
                <div style={{ borderColor: '#434957' }} className={`${idx !== 0 ? 'border-t' : ''} border-b p-6 bg-regal-blue-normal`}>
                  <div className='max-w-2xl mx-auto flex gap-x-5'>
                    <div className=' shrink-0'>
                      <Image
                        width={36}
                        height={36}
                        alt='ChatGPT logo'
                        src={img}
                      />
                    </div>
                    <div>
                      <p className='text-base/7 text-gray-300 font-light'>{prompt.responses[0]?.message}</p>
                    </div>
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
        {/* When the prompt is loading show this */}
        {promptIsLoading && <p>Generando respuesta...</p>}
      </div>

      {/* Input bar container */}
      <div className={('bg-regal-blue-normal w-full h-24 flex-shrink-0 px-5 flex items-center border-t border-t-gray-600' +
        `${selectedChatId !== null ? ' opacity-1' : ' opacity-50'}` +
        `${promptIsLoading ? ' opacity-50' : ' opacity-1'}`
      )}>
        <form className='w-full flex' onSubmit={sendPrompt}>
          <textarea
            disabled={selectedChatId === null}
            onChange={(e) => chatActions.setPrompt(e.target.value)}
            value={chatState.prompt}
            className='w-full resize-none block rounded-tl-md rounded-bl-md p-3 h-12 outline-none bg-regal-blue-light'
            placeholder='Send a message'
          />
          <button
            disabled={selectedChatId === null || promptIsLoading || chatState.prompt.length <= 0}
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
