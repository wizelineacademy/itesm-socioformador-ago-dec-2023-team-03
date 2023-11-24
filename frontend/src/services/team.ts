const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/teams`;

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

export default {
  getTeamLLMs,
  findTeamById,
};
