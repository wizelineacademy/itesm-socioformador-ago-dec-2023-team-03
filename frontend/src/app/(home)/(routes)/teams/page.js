'use client';

import Link from 'next/link';
import React from 'react';

// Services
import services from '@/src/services';

/**
 * TeamsPage component. Where the user can see all the teams he is part of, of if he is not part of any team as well.
 * @function
 * @returns {JSX.Element} Rendered component.
 */
function TeamsPage() {
  // State variables for teams and loading status
  const [teamsAreLoading, setTeamsAreLoading] = React.useState(true);
  const [teams, setTeams] = React.useState([]);

  // Get the teams of the user trough the services
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
      {/* if teams are loading display loading teams, otherwise map it if teams length are longer than 0 */}
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
          /* if you don't have any teams shows legend down below */
          : <h1>You still do not have assigned teams</h1>
      }
    </div>
  );
}

export default TeamsPage;
