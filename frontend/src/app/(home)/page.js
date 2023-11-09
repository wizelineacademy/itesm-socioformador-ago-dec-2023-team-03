'use client';

import React from 'react';

import services from '../../services';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';

function HomePage() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();

  async function login() {
    const body = { email: user.email };
    const res = await services.member.login(body);
    if (!res.success && res.error) {
      router.push('/login');
    } else if (res.success) {
      router.push('/teams');
    }
  }

  React.useEffect(() => {
    if (user) {
      (async () => {
        const getMeResponse = await services.me.getMe();
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

  return (
    <div className='w-screen h-screen flex'>
      <h1>Autenticando. Validando credenciales</h1>
    </div>
  )
}

export default HomePage;
