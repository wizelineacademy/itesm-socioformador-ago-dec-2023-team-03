/**
 * @module me
 */

/**
 * Base URL for me API.
 * @type {string}
 */
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/me`;

/**
 * Fetches the logged in user's data.
 * @returns {Promise<Object>} The user's data if found, otherwise an error.
 */
async function getMe() {
  try {
    const routeUrl = baseUrl;
    const res = await fetch(routeUrl, {
      cache: 'no-store',
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Fetches the logged in user's teams.
 * @returns {Promise<Object>} The user's teams if found, otherwise an error.
 */
async function getMyTeams() {
  const routeUrl = `${baseUrl}/teams`;
  const res = await fetch(routeUrl, {
    cache: 'no-store',
    credentials: 'include'
  });
  const data = await res.json();
  return data;
}

/**
 * Fetches the logged in user's chats.
 * @param {Object} options - The options for the request.
 * @returns {Promise<Object>} The user's chats if found, otherwise an error.
 */
async function getMyChats(options) {
  const routeUrl = `${baseUrl}/chats`;
  let queryString = '';
  if (options && options.query) {
    const searchParams = new URLSearchParams();
    const llmId = options.query['llm-id'];
    const teamId = options.query['team-id'];
    if (llmId) {
      searchParams.set('llm-id', llmId);
    }
    if (teamId) {
      searchParams.set('teamd-id', teamId);
    }
    queryString = `?${searchParams.toString()}`;
  }
  const res = await fetch(`${routeUrl}${queryString}`, {
    cache: 'no-store',
    credentials: 'include'
  });
  const data = await res.json();
  return data;
}

export default {
  getMe,
  getMyTeams,
  getMyChats
};
