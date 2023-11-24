import Modal from "@/src/components/modals/Modal";
import RemoveMember from "@/src/components/modals/RemoveMember";
import { Member } from '@/src/types';
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { removeTeamMember } from "@/src/services/team";

interface AdminMemberListProps {
    member: Member;
    groupId: string;
}

const AdminMemberList: React.FC<AdminMemberListProps> = ({
    member,
    groupId,
}) => {
    const modalMember = useRef<null | HTMLDialogElement>(null);
    const modalConfirm = useRef<null | HTMLDialogElement>(null);
    const pathname = usePathname();

    const openModalMember = () => {

        if (modalMember.current) {
            modalMember.current.showModal();
        }
    }

    const closeModalMember = () => {
        if (modalMember.current) {
            modalMember.current.close();
        }
    }

    const closeSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.close();
        }
    }

    function handleSubmit(event: React.FormEvent<Element>): void {
        removeTeamMember(groupId, member.id!);
        closeModalMember();
    }

    return (
        <>
            <div className="flex flex-row flex-none w-full items-center">
                <div className="flex flex-row w-full pointer-events-none btn btn-primary justify-start" style={{ width: 'calc(100% - 40px)' }}>
                    <div className="flex flex-row items-center space-x-3">
                        <div className="avatar w-8 rounded-full items-center align-middle justify-center ">
                            {member?.picture ? (
                                <img src={member?.picture} alt="" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row space-x-1">
                        <p>{member?.firstName ?? "First Name"}</p>
                        <p>{member?.lastName ?? "Last Name"}</p>
                    </div>
                </div>
                <div className="flex flex-row flex-none">
                    <button onClick={(event) => { event.stopPropagation(); openModalMember(); }} className="btn btn-circle btn-sm pointer-events-auto ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <dialog ref={modalMember} className="py-3 px-14 rounded-2xl space-y-4">
                    <RemoveMember pathname={pathname} close={closeModalMember} onSubmit={handleSubmit} />
                </dialog>
                <dialog ref={modalConfirm} className="py-3 px-14 rounded-2xl space-y-4">
                    {
                        pathname !== `/admin/teams/${groupId}` ?
                            <Modal title="Message" message="The member has been deleted" close={closeSubModal} /> :
                            <Modal title="Message" message="The member has been removed from the team" close={closeSubModal} />
                    }
                </dialog>
            </div>
        </>
    )
}

export default AdminMemberList;
