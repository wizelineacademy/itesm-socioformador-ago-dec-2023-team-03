import createQueryString from '../utils/createQueryString';

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/tokens`;

async function getTokens(filters) {
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

export async function addTokensToLLM(memberId, teamId, llmId, quantity) {

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
