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


// CHECK THIS...
export async function removeMember(memberId: string) {
  const routeUrl = `${baseUrl}/${memberId}`;

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

export async function createMember(firstName: string, lastName: string, email: string, roleId: string) {
  const routeUrl = `${baseUrl}/register`;

  try {
    const res = await fetch(routeUrl, {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, roleId }),
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

