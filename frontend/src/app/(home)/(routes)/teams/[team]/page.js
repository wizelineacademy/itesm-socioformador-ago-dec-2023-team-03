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
    </div>
  );
}
