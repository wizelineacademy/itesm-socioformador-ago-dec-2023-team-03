import LLLDetails from '@/src/components/modals/LLMDetails';
import { LLM } from '@/src/types';
import Image from 'next/image';
import { useRef } from 'react';
import img from '/public/images/chat-gpt-logo.svg.png';

interface AdminTeamLLMsListProps {
    llm?: LLM;
}

const AdminTeamLLMsList: React.FC<AdminTeamLLMsListProps> = ({
    llm,
}) => {
    const modalLLMDetails = useRef<null | HTMLDialogElement>(null);

    function handleOpenLLM(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
        const openModal = () => {
            if (modalLLMDetails.current) {
                modalLLMDetails.current.showModal();
            }
        }
        openModal();
    }

    const handleCloseLLM = () => {
        if (modalLLMDetails.current) {
            modalLLMDetails.current.close();
        }
    }

    return (
        <>
            <div onClick={handleOpenLLM} className="mb-5 btn btn-lg btn-neutral flex flex-row space-x-3 items-center justify-center">
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
                <LLLDetails llm={llm} close={handleCloseLLM} />
            </dialog>
        </>
    )
}

export default AdminTeamLLMsList;
