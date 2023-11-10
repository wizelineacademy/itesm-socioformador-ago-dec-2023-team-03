const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/chats`;

async function findChatById(chatId) {
  const routeUrl = `${baseUrl}/${chatId}`;
  const res = await fetch(routeUrl, {
    cache: 'no-store',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export default {
  findChatById
};
