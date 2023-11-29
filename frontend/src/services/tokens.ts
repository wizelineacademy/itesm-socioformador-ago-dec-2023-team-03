/**
 * @module tokens
 */

import createQueryString from '../utils/createQueryString';

/**
 * Base URL for tokens API.
 * @type {string}
 */
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens`;

/**
 * Fetches tokens with optional filters.
 * @param {Object} filters - The filters to apply.
 * @returns {Promise<Array>} The array of tokens if found, otherwise null.
 */
async function getTokens(filters:any) {
  const routeUrl = `${baseUrl}`;

  let qs;
  if (filters) {
    qs = createQueryString(filters);
  }

  try {
    const res = await fetch(`${routeUrl}/${qs}`, {
      cache: 'no-store',
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function addTokensToLLM(memberId : string, teamId : string , llmId : string, quantity : number ) {

  const routeUrl = `${baseUrl}`

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        memberId,
        teamId,
        llmId,
        quantity
      }),
      credentials: 'include'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }

}

export default {
  getTokens
};
