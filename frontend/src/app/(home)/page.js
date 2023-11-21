'use client';

import React, { useState } from 'react';

import services from '../../services';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'react-hot-toast';

function HomePage() {
  const { user, isLoading, error } = useUser();
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  async function login() {
    const body = { email: user.email };
    const res = await services.member.login(body);
    if (!res.success && res.error) {
      toast.error(res.error.message);
      router.push('/login');
    } else if (res.success) {
      router.push('/teams');
    }
  }

  React.useEffect(() => {
    if (user) {
      (async () => {
        let getMeResponse;
        try {
          getMeResponse = await services.me.getMe();
        } catch (err) {
          setServerError(err);
          console.error(err);
        }
        console.log(getMeResponse);
        if (getMeResponse.success) {
          console.log('User is already logged in');
          return router.push('/teams');
        } else {
          console.log('User has to login');
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
