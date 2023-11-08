'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// Services import
import services from '../services';

// Custom hook for session management
export default function useSession() {
  const router = useRouter();

  // State variables initialization
  const [loading, setLoading] = React.useState(true);
  const [sessionError, setSessionError] = React.useState(null);
  const [userSession, setUserSession] = React.useState(null);

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
        console.log(response);
      } catch (error) {
        console.error('Error fetching user session:', error);
        setSessionError(error);
      }
    }

    fetchUserSession();
  }, []);

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
