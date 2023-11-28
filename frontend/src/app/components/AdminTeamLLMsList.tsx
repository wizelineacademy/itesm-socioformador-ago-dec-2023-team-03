import LLLDetails from '@/src/components/modals/LLMDetails';
import { LLM, Member } from '@/src/types';
import Image from 'next/image';
import { useRef } from 'react';
import img from '/public/images/chat-gpt-logo.svg.png';

interface AdminTeamLLMsListProps {
    llm?: LLM;
    addTokensToLLM?: (event: any, llmId: string, quantity: number) => void;
}

const AdminTeamLLMsList: React.FC<AdminTeamLLMsListProps> = ({
    llm,
    addTokensToLLM,
}) => {
    const modalLLMDetails = useRef<null | HTMLDialogElement>(null);

    const openModal = () => {
        if (modalLLMDetails.current) {
            modalLLMDetails.current.showModal();
        }
    }

    const handleCloseLLM = () => {
        if (modalLLMDetails.current) {
            modalLLMDetails.current.close();
        }
    }

    return (
        <>
            <div onClick={openModal} className="mb-5 btn btn-lg btn-neutral flex flex-row space-x-3 items-center justify-center">
                <Image src={img} width={40} height={40} alt="" />
                <div className="flex flex-col">
                    <h2 className="card-title text-md">{llm?.name}</h2>
                    <div className="card-actions justify-end">
                        <p className="text-sm">{llm?.model}</p>
                    </div>
                </div>
            </div>
            <dialog ref={modalLLMDetails} style={{
                position: 'fixed',
                top: '0%',
                left: '50%',
                transform: 'translate(-50%, -0%)'
            }} className="py-3 px-14 rounded-2xl space-y-4">
                <LLLDetails llm={llm} close={handleCloseLLM} addTokensToLLM={addTokensToLLM as (event: any, llmId: string, quantity: number) => void} />
            </dialog>
        </>
    )
}

export default AdminTeamLLMsList;
