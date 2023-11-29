'use client';

import React, { useState } from 'react';

import services from '../../services';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

// Import toast notifications from react-hot-toast package
import { toast } from 'react-hot-toast';

/**
 * HomePage component.
 * @function
 * @returns {JSX.Element} Rendered component.
 */
function HomePage() {
  // Use the useUser hook to get the current user
  const { user, isLoading } = useUser();
  // State variable for server error
  const [serverError, setServerError] = useState('');
  // Use the useRouter hook to get the router instance
  const router = useRouter();

  /**
   * Handles the login process.
   * @async
   */
  async function login() {
    const body = { email: user.email };

    let res;

    try {
      res = await services.member.login(body);
    } catch (err) {
      console.error(err);
    }

    if (!res?.success && res.error) {
      toast.error(res.error.message);
      router.push('/login');
    } else if (res?.success) {
      router.push('/teams');
    }
  }

  // If the user is logged in, redirect to the teams page
  React.useEffect(() => {
    if (user) {
      (async () => {
        let getMeResponse;

        try {
          getMeResponse = await services.me.getMe();
        } catch (err) {
          console.error(err);
          return router.push('/login');
        }

        console.log(getMeResponse);

        if (getMeResponse.success) {
          const role = getMeResponse.data.me.roleName;
          if (role === 'admin') {
            return router.push('/admin');
          } else {
            return router.push('/teams');
          }
        } else {
          login();
        }
      })();
    } else if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading]);

  return <div className='loader'></div>
}

export default HomePage;
