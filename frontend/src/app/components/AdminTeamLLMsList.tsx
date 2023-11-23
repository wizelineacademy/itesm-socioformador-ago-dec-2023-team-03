import { LLM } from '@/src/types';
import Image from 'next/image';
import img from '/public/images/chat-gpt-logo.svg.png';

interface AdminTeamLLMsListProps {
    llm?: LLM;
}

const AdminTeamLLMsList: React.FC<AdminTeamLLMsListProps> = ({
    llm,
}) => {

    function handleOpenLLM(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div onClick={handleOpenLLM} className="mb-5 btn btn-lg btn-neutral flex flex-row space-x-3 items-center justify-center">
            <Image src={img} width={40} height={40} alt="" />
            <div className="flex flex-col">
                <h2 className="card-title text-md">{llm?.name}</h2>
                <div className="card-actions justify-end">
                    <p className="text-sm">{llm?.model}</p>
                </div>
            </div>
        </div>
    )
}

export default AdminTeamLLMsList;
