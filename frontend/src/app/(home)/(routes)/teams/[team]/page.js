import services from '../../../../../services';
import LlmsList from './llms-list';

export default async function TeamPage(props) {
  const teamId = props.params.team;
  const llmsResponse = await services.team.getTeamLLMs(teamId);
  const llms = llmsResponse.data.llms;

  return (
    <div className='w-full flex flex-col h-full'>
      <h1 className=' text-4xl font-semibold m-5'>Team models</h1>
      <LlmsList llms={llms} teamId={teamId} />
      {/* {
        llms.length > 0
          ? (
            <ul className='flex flex-col gap-y-1 h-full'>
              {llms.map((llm, idx) => (
                <li key={`${idx}-${llm.id}`}>
                  <Link href={`/chat?team-id=${teamId}&llm-id=${llm.id}`} className='font-medium w-full flex flex-col p-5 bg-regal-blue-dark hover:bg-regal-blue-light'>
                    {llm.name}
                    <span className=' text-xs font-light'>{llm.model}</span>
                    <span className='mt-1 font-normal text-xs text-yellow-500'>50 tokens</span>
                  </Link>
                </li>
              ))}
            </ul>
          )
          : <h1>Team does not have access to any LLM</h1>
      } */}
    </div>
  );
}
