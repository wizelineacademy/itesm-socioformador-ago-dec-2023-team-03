'use client';

import React from 'react';

import services from '../../services';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function HomePage() {
  const { user } = useUser();
  const router = useRouter();
  const [teams, setTeams] = React.useState([]);

  async function _login() {
    const body = { email: user.email };
    const res = await services.member.login(body);
    if (!res.success && res.error) {
      router.push('/login');
    }
    const teamsResponse = await services.me.getMyTeams();
    if (teamsResponse.success) {
      setTeams(teamsResponse.data.teams);
    }
  }

  React.useEffect(() => {
    if (user) {
      _login();
    }
  }, [user]);

  async function click() {
    const res = await services.me.getMe();
  }

  return (
    <div className='flex flex-col h-full'>
      <button onClick={click}>
        me
      </button>

      <h1 className=' text-4xl font-semibold m-5'>My Teams</h1>

      {
        teams.length > 0
          ? (
            <ul className='flex flex-col gap-y-1 h-full'>
              {teams.map((team, idx) => (
                <li key={`${idx}-${team.id}`}>
                  <Link href={`/teams/${team.id}`} className='font-medium w-full flex flex-col p-5 bg-regal-blue-dark hover:bg-regal-blue-light'>
                    {team.name}
                    <span className='mt-1 font-normal text-xs text-brand-primary'>43 members</span>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : <h1>You still do not have assigned teams</h1>
      }
    </div>
  )
}

export default HomePage;
