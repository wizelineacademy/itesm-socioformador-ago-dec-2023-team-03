/**
 * @module team
 */

/**
 * Base URL for team API.
 * @type {string}
 */
const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/teams`;

/**
 * Fetches all LLMs for a team.
 * @param {string} team - The ID of the team to fetch LLMs for.
 * @returns {Promise<Array>} The array of LLMs if found, otherwise null.
 */
async function getTeamLLMs(team: string) {
  const routeUrl = `${baseUrl}/${team}/llms`;

  try {
    const res = await fetch(routeUrl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Fetches a team by its ID.
 * @param {string} teamId - The ID of the team to find.
 * @returns {Promise<Object>} The team object if found, otherwise null.
 */
async function findTeamById(teamId: string) {
  const routeUrl = `${baseUrl}/${teamId}`;

  try {
    const res = await fetch(routeUrl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Fetches all teams.
 * @returns {Promise<Array>} The array of teams if found, otherwise an error.
 */
export async function getAllTeams() {
  const routeUrl = `${baseUrl}`;

  try {
    const res = await fetch(routeUrl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Fetches all members of a team.
 * @param {string} teamId - The ID of the team to fetch members for.
 * @returns {Promise<Array>} The array of members if found, otherwise an error.
 */
export async function getAllTeamMembers(teamId: string) {
  const routeUrl = `${baseUrl}/${teamId}/members`;

  try {
    const res = await fetch(routeUrl, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/**
 * Creates a new team.
 * @param {Object} body - The body of the request.
 * @returns {Promise<Object>} The created team object.
 */
export async function createTeam(name: string) {
  const routeUrl = `${baseUrl}`;

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Removes a member from a team.
 * @param {string} teamId - The ID of the team to remove a member from.
 * @param {string} memberId - The ID of the member to remove.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
export async function removeTeamMember(teamId: string, memberId: string) {
  const routeUrl = `${baseUrl}-members`;

  try {
    const res = await fetch(routeUrl, {
      method: 'DELETE',
      body: JSON.stringify({ teamId, memberId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Adds a member to a team.
 * @param {string} teamId - The ID of the team to add a member to.
 * @param {string} memberId - The ID of the member to add.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
export async function addTeamMember(teamId: string, memberId: string) {
  const routeUrl = `${baseUrl}-members`;

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      body: JSON.stringify({ teamId, memberId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Removes a team by its ID.
 * @param {string} teamId - The ID of the team to remove.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
export async function removeTeam(teamId: string) {
  const routeUrl = `${baseUrl}/${teamId}`;

  try {
    const res = await fetch(routeUrl, {
      method: 'DELETE',
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function addLlmToTeam(teamId: string, llmId: string) {
  const routeUrl = `${baseUrl}-llms`;

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      body: JSON.stringify({ teamId, llmId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function removeLlmFromTeam(teamId: string, llmId: string) {
  const routeUrl = `${baseUrl}-llms`;

  try {
    const res = await fetch(routeUrl, {
      method: 'DELETE',
      body: JSON.stringify({ teamId, llmId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default {
  getTeamLLMs,
  findTeamById,
};
