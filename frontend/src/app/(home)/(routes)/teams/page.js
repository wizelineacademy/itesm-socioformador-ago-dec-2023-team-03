'use client';

import React from 'react';
import Link from 'next/link';

// Services
import services from '@/src/services';

// Components
// import Sidebar from '../_components/sidebar';

function TeamsPage() {
  const [teamsAreLoading, setTeamsAreLoading] = React.useState(true);
  const [teams, setTeams] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      setTeamsAreLoading(true);
      const getMyTeamsResponse = await services.me.getMyTeams();
      setTeamsAreLoading(false)
      if (getMyTeamsResponse.success) {
        setTeams(getMyTeamsResponse.data.teams);
      } else {
        console.error(getMyTeamsResponse.error);
      }
    })();
  }, []);

  return (
    <div className='flex flex-col h-full'>
      <h1 className=' text-4xl font-semibold m-5'>My Teams</h1>
      {teamsAreLoading
        ? <h2>Cargando equipos</h2>
        : teams.length > 0
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
  );
}

export default TeamsPage;
