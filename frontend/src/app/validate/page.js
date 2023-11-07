'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { redirect } from 'next/navigation';

export default function Validate() {
  const { user, error, isLoading } = useUser();

  console.log(user);

  return <h1>Validate</h1>
}
