'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

// Services import
import services from '../services';

/**
 * Custom hook for user session management and handles any error.
 * @returns {Object} The loading state, user session, and any session errors.
 */
export default function useSession() {
  const router = useRouter();

  // State variables initialization
  const [loading, setLoading] = React.useState(true);
  const [sessionError, setSessionError] = React.useState(null);
  const [userSession, setUserSession] = React.useState(null);

  // Fetch the user session and updates state.
  React.useEffect(() => {
    async function fetchUserSession() {
      try {
        const response = await services.me.getMe();
        setLoading(false);

        if (!response.success) {
          setSessionError(response.error);
        } else {
          setUserSession(response.data.me);
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        setSessionError(error);
      }
    }

    fetchUserSession();
  }, []);

  /**
   * Handles session errors.
   * If the error status code is 401, redirects to the login page.
   * Otherwise, throws an internal server error.
   */
  React.useEffect(() => {
    if (sessionError) {
      if (sessionError.httpStatusCode === 401) {
        return router.push('/login');
      } else {
        throw new Error('Internal server error');
      }
    }
  }, [sessionError]);

  // Return state and functions
  return {
    isLoading: loading,
    me: userSession,
    error: sessionError
  };
}
