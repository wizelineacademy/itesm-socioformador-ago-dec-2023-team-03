const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/members`;

async function login(body) {
  const routeUrl = `${baseUrl}/login`;
  const requestBody = body ? JSON.stringify({ email: body.email }) : JSON.stringify({});

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: requestBody
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default {
  login
};
