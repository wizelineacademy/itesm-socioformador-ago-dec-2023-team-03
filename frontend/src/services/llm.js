/**
 * @module llm
 */

/**
 * Base URL for team API.
 * @type {string}
 */
const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/teams`;

/**
 * Fetches an LLM by its ID.
 * @param {string} id - The ID of the LLM to find.
 * @returns {Promise<Object>} The LLM object if found, otherwise an empty object.
 */
async function find(id) {
  const routeURl = `${process.env.NEXT_PUBLIC_API_URL}/llms/${id}`;

  try {
    const res = await fetch(routeURl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

/**
 * Fetches all LLMs for a team.
 * @param {string} teamId - The ID of the team to fetch LLMs for.
 * @returns {Promise<Array>} The array of LLMs if found, otherwise an empty array.
 */
export async function getAllLLM(teamId) {
  const routeURl = `${baseUrl}/${teamId}/llms`;

  try {
    const res = await fetch(routeURl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default {
  find
};
