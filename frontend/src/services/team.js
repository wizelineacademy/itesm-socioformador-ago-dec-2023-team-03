const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/teams`;

async function getTeamLLMs(team) {
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

export default {
  getTeamLLMs
};
