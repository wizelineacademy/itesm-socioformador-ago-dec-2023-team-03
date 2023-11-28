/**
 * @module chat
 */

/**
 * Base URL for chat API.
 * @type {string}
 */
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/chats`;

/**
 * Fetches a chat by its ID.
 * @param {string} chatId - The ID of the chat to find.
 * @returns {Promise<Object>} The chat object if found, otherwise an error.
 */
async function findChatById(chatId) {
  const routeUrl = `${baseUrl}/${chatId}`;
  const res = await fetch(routeUrl, {
    cache: 'no-store',
    credentials: 'include',
  });
  const data = await res.json();
  return data;
}

/**
 * Creates a new chat.
 * @param {Object} body - The body of the request.
 * @returns {Promise<Object>} The created chat object.
 */
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

/**
 * Creates a new prompt for a chat.
 * @param {string} chatId - The ID of the chat to add a prompt to.
 * @param {Object} body - The body of the request.
 * @returns {Promise<Object>} The created prompt object.
 */
async function createPrompt(chatId, body) {
  const routeUrl = `${baseUrl}/${chatId}/prompts`;
  const res = await fetch(routeUrl, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data;
}

/**
 * Removes a chat by its ID.
 * @param {string} chatId - The ID of the chat to remove.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
async function remove(chatId) {
  const routeUrl = `${baseUrl}/${chatId}`;
  const res = await fetch(routeUrl, {
    method: 'DELETE',
    cache: 'no-store',
    credentials: 'include'
  });
  const data = await res.json();
  return data;
}

/**
 * Fetches all prompts for a chat.
 * @param {string} chatId - The ID of the chat to fetch prompts for.
 * @returns {Promise<Object>} The prompts object if found, otherwise an error.
 */
async function getPrompts(chatId) {
  const routeUrl = `${baseUrl}/${chatId}/prompts`;
  const res = await fetch(routeUrl, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });
  const data = await res.json();
  return data;
}

export default {
  findChatById,
  create,
  createPrompt,
  getPrompts,
  remove
};
