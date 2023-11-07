import Sidebar from './_components/sidebar';
import Chat from './_components/chat';

async function getUserChats(memberId, options) {
  let queryStr = ''
  if (options && options.queryParams) {
    queryStr = '?';
    const queryParams = options.queryParams;
    const validQueryParams = ['team', 'llm'];
    validQueryParams.forEach((validQueryParam, idx) => {
      if (queryParams[validQueryParam]) {
        queryStr += `${validQueryParam}=${queryParams[validQueryParam]}`;
        if (idx !== validQueryParams.length - 1) {
          queryStr += '&';
        }
      }
    })
  }
  const res = await fetch(`http://localhost:8080/members/${memberId}/chats${queryStr}`, { cache:'no-store' });
  return res.json();
}

async function getChat(chatId) {
  const res = await fetch(`http://localhost:8080/chats/${chatId}`, { cache: 'no-store' });
  return res.json();
}

async function ChatPage(props) {
  const myId = 'cb26c0d3-5b1d-4fc0-816e-43f2f01cecb6';
  const searchParams = props.searchParams;

  let chats = [];
  const chatsResponse = await getUserChats(myId, {
    queryParams: {
      team: searchParams.team,
      llm: searchParams.llm
    }
  })

  if (chatsResponse.success) {
    chats = chatsResponse.data.chats;
    console.log(chats);
  }

  return (
    <>
      <div className='relative z-0 flex h-full w-full overflow-hidden'>
        <main className='flex w-full h-full'>
          <Sidebar chats={chats} />
          <Chat />
        </main>
      </div>
    </>
  )
}

export default ChatPage;