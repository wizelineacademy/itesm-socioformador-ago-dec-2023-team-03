const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/me`;

async function getMe() {
  const routeUrl = baseUrl;
  try {
    const res = await fetch(routeUrl, {
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

async function getMyTeams() {
  const routeUrl = `${baseUrl}/teams`;
  try {
    const res = await fetch(routeUrl, {
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

export default {
  getMe,
  getMyTeams
};
