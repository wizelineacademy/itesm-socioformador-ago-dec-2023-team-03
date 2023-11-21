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

async function create(body) {
  const routeUrl = `${baseUrl}`;
  const res = await fetch(routeUrl, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
}

async function createPrompt(chatId) {
  const routeUrl = `${baseUrl}/${chatId}/prompts`;
  const res = await fetch(routeUrl, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

export default {
  findChatById,
  create,
  createPrompt
};
