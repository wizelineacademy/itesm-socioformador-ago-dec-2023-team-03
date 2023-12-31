import LLMDetails from '@/src/components/modals/LLMDetails';
import { LLM, Member } from '@/src/types';
import Image from 'next/image';
import { useRef } from 'react';
import img from '/public/images/chat-gpt-logo.svg.png';

interface AdminTeamLLMsListProps {
    groupId: string;
    llm?: LLM;
    addTokensToLLM?: (event: any, llmId: string, quantity: number) => void;
}

/**
 * AdminTeamLLMsList component.
 * @component
 * @param {AdminTeamLLMsListProps} props - The props.
 * @param {LLM} props.llm - The LLM.
 * @returns {JSX.Element} The rendered AdminTeamLLMsList component.
 */
const AdminTeamLLMsList: React.FC<AdminTeamLLMsListProps> = ({
    groupId,
    llm,
    addTokensToLLM,
}) => {
    const modalLLMDetails = useRef<null | HTMLDialogElement>(null);
    const openModal = () => {
        if (modalLLMDetails.current) {
            modalLLMDetails.current.showModal();
        }
    }

    // Handles the closing of the LLM modal.
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
            {/* The modal for the llm detail such as name, or even add tokens */}
            <dialog ref={modalLLMDetails} style={{
                position: 'fixed',
                top: '0%',
                left: '50%',
                transform: 'translate(-50%, -0%)'
            }} className="py-3 px-14 rounded-2xl space-y-4">
                <LLMDetails groupId={groupId} llm={llm} close={handleCloseLLM} addTokensToLLM={addTokensToLLM as (event: any, llmId: string, quantity: number) => void} />
            </dialog>
        </>
    )
}

export default AdminTeamLLMsList;
