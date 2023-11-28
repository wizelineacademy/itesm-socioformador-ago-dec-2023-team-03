/**
 * @module member
 */

/**
 * Base URL for member API.
 * @type {string}
 */
const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/members`;

/**
 * Logs in a member.
 * @param {Object} body - The body of the request.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
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

/**
 * Fetches all members.
 * @returns {Promise<Array>} The array of members if found, otherwise an empty array.
 */
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

/**
 * Removes a member by its ID.
 * @param {string} memberId - The ID of the member to remove.
 * @returns {Promise<Object>} The response object if successful, otherwise an error.
 */
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

/**
 * Creates a new member.
 * @param {Object} body - The body of the request.
 * @returns {Promise<Object>} The created member object.
 */
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
