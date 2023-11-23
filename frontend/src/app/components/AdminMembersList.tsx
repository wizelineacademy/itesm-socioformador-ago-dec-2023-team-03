import Modal from "@/src/components/modals/Modal";
import RemoveMember from "@/src/components/modals/RemoveMember";
import { Member } from '@/src/types';
import { usePathname } from "next/navigation";
import { useRef } from "react";

interface AdminMemberListProps {
    member?: Member;
    groupId?: string;
}

const AdminMemberList: React.FC<AdminMemberListProps> = ({
    member,
    groupId
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

    const openSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.showModal();
        }
    }

    const closeSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.close();
        }
    }

    return (
        <div className="flex flex-row h-fit p-2 rounded-lg w-full btn pointer-events-none btn-primary items-center justify-between">
            <div className="flex flex-row items-center space-x-2">
                <div className="avatar">
                    <div className="w-8 rounded-full items-center align-middle justify-center ">
                        {member?.picture ? (
                            <img src={member?.picture} alt="" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        )}
                    </div>
                </div>
                <p>{member?.firstName ?? "First Name"}</p>
                <p>{member?.lastName ?? "Last Name"}</p>
            </div>
            <button onClick={(event) => { event.stopPropagation(); openModalMember(); }} className="btn btn-circle btn-sm pointer-events-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <dialog ref={modalMember} className="py-3 px-14 rounded-2xl space-y-4">
                <RemoveMember pathname={pathname} openMemberModal={openSubModal} close={closeModalMember} />
            </dialog>
            <dialog ref={modalConfirm} className="py-3 px-14 rounded-2xl space-y-4">
                {
                    pathname !== `/admin/teams/${groupId}` ?
                        <Modal title="Message" message="The member has been deleted" close={closeSubModal} /> :
                        <Modal title="Message" message="The member has been removed from the team" close={closeSubModal} />
                }
            </dialog>
        </div>
    )
}

export default AdminMemberList;
