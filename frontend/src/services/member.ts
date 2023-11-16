const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/members`;

async function login(body: any) {
  const routeUrl = `${baseUrl}/login`;
  const requestBody = body ? JSON.stringify({ email: body.email }) : JSON.stringify({});
  const res = await fetch(routeUrl, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBody
  });
  const data = await res.json();
  return data;
}

export default {
  login
};

export async function getAllMembers() {
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

