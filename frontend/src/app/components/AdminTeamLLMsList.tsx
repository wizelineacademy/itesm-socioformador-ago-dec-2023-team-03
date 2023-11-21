import img from '/public/images/chat-gpt-logo.svg.png';
import Image from 'next/image';
import { CgClose, CgMathPlus } from 'react-icons/cg';
import AdminListDeleteButton from './AdminListDeleteButton';
import { LLM } from '@/src/types';

interface AdminTeamLLMsListProps {
    llm?: LLM;
}

const AdminTeamLLMsList: React.FC<AdminTeamLLMsListProps> = ({
    llm,
}) => {
    return (
        <div className="flex flex-row p-4 space-x-3 items-center justify-center">
            <figure><Image src={img} width={50} height={50} alt="Movie" /></figure>
            <div className="flex flex-col">
                <h2 className="card-title">{llm?.name}</h2>
                <div className="card-actions justify-end">
                    <p>{llm?.model}</p>
                </div>
            </div>
            <div>
                <AdminListDeleteButton />
            </div>
        </div>
    )
}

export default AdminTeamLLMsList;