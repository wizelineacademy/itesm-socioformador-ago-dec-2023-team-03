/**
 * @module index
 */

import useSession from './useSession';
import useTeams from './useTeams';

/**
 * Default export object containing hooks.
 * @property {function} useSession - Hook for managing session.
 * @property {function} useTeams - Hook for managing teams.
 */
export default {
  useSession,
  useTeams,
};
