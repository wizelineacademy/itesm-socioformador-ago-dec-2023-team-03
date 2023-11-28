// Import handleAuth from Auth0 Next.js SDK
import { handleAuth } from '@auth0/nextjs-auth0';

/**
 * GET method for Auth0 authentication.
 * @type {import('@auth0/nextjs-auth0').NextApiHandler}
 */
export const GET = handleAuth();
