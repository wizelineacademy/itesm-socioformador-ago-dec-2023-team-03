'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Spinner from '@/src/app/components/Spinner';
import TeamsList from '@/src/app/components/TeamsList';

// Services
import services from '@/src/services';
import useSession from '@/src/hooks/useSession';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

/**
 * TeamsPage component. Where the user can see all the teams he is part of, of if he is not part of any team as well.
 * @function
 * @returns {JSX.Element} Rendered component.
 */
function TeamsPage() {
  // State variables for teams and loading status
  const [teamsAreLoading, setTeamsAreLoading] = React.useState(true);
  const [teams, setTeams] = React.useState([]);
  const [llms, setLlms] = useState([]);

  const user = useSession();

  const router = useRouter()

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

  React.useEffect(() => {
    if (teams && teams.length > 0) {
      (async () => {
        const llms = [];
        for (const team of teams) {
          const llm = await services.team.getTeamLLMs(team.id);
          llms.push(llm.data.llms);
        }
        setLlms(llms);
      })();
    }
    console.log(teams);
  }, [teams]);

  if (!user.isLoading && !user.me) {
    toast.error('You have to log in');
    return router.push('/login');
  }

  if (user.isLoading) return <div className='loader'></div>

  return (
    <div className='flex flex-col h-full p-5'>
      {teamsAreLoading
        ? <Spinner />
        : <TeamsList teams={teams} llms={llms} />
      }
    </div>
  );
}

export default TeamsPage;
