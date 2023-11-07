import Link from 'next/link';
import services from '../../../../services';

export default async function TeamPage(props) {
  const teamId = props.params.team;
  const llmsResponse = await services.team.getTeamLLMs(teamId);
  const llms = llmsResponse.data.llms;

  return (
    <div className='flex flex-col h-full'>
      {
        llms.length > 0
          ? (
            <ul className='flex flex-col gap-y-1 h-full'>
              {llms.map((llm, idx) => (
                <li key={`${idx}-${llm.id}`}>
                  <Link href={`/chat?team=${teamId}&llm=${llm.id}`} className='font-medium w-full flex flex-col p-5 bg-regal-blue-dark hover:bg-regal-blue-light'>
                    {llm.name}
                    <span className='mt-1 font-normal text-xs text-yellow-500'>50 tokens</span>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : <h1>Team does not have access to any LLM</h1>
      }
    </div>
  );
}
