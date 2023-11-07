import Sidebar from '../_components/sidebar';
import Chat from '../_components/chat';
import { redirect } from 'next/navigation';

async function getMe() {
  const res = await fetch(`http://localhost:8080/members/m`, { cache:'no-store' });
  return res.json();
}

async function getUserChats(memberId, options) {
  let queryStr = ''
  if (options && options.queryParams) {
    queryStr = '?';
    const queryParams = options.queryParams;
    const validQueryParams = ['team-id', 'llm-id'];
    validQueryParams.forEach((validQueryParam, idx) => {
      if (queryParams[validQueryParam]) {
        queryStr += `${validQueryParam}=${queryParams[validQueryParam]}`;
        if (idx !== validQueryParams.length - 1) {
          queryStr += '&';
        }
      }
    })
  }
  console.log(queryStr);
  const res = await fetch(`http://localhost:8080/members/${memberId}/chats${queryStr}`, { cache:'no-store' });
  return res.json();
}

async function getChat(chatId) {
  const res = await fetch(`http://localhost:8080/chats/${chatId}`, { cache: 'no-store' });
  return res.json();
}

async function ChatPage(props) {
  // const res = await getMe();

  // console.log(res);
  // if (!res.success && res.error.httpStatusCode === 404) {
  //   return redirect('/login', 'replace');
  // }

  // const response = await getUserChats('264cd451-05ef-45d8-9528-3307fc538d2f', {
  //   queryParams: {
  //     'team-id': '5fc21cc8-14d6-4e32-8c4a-86a4762814ab',
  //     'llm-id': '3a8f9893-1435-48f5-bd34-1cc0a5b6dfac'
  //   }
  // });
  // const chats = response.chats;

  // const params = props.params;
  // const chatId = params['chat-id'];

  // let chat;
  // if (chatId) {
  //   chat = await getChat(chatId);
  //   console.log(chat);
  // }

  return (
    <>
      <div className='relative z-0 flex h-full w-full overflow-hidden'>
        <main className='flex w-full h-full'>
          <Sidebar chats={[]} />
          <Chat  />
        </main>
      </div>
    </>
  )
}

export default ChatPage;
