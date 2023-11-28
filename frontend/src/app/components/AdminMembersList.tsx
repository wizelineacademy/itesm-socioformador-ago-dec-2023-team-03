import Modal from "@/src/components/modals/Modal";
import RemoveMember from "@/src/components/modals/RemoveMember";
import { Member } from '@/src/types';
import { usePathname } from "next/navigation";
import { useRef } from "react";

/**
 * Interface for AdminMemberListProps.
 * @property {Member} member - The member.
 * @property {string} groupId - The ID of the group.
 * @property {(event: React.FormEvent) => void} onDeleteMember - The function to call when a member is deleted.
 */
interface AdminMemberListProps {
    member: Member;
    groupId: string;
    onDeleteMember?: (event: React.FormEvent) => void;
}

/**
 * AdminMemberList component. Used for see the members of a team and delete them.
 * @component
 * @param {AdminMemberListProps} props - The props.
 * @returns {JSX.Element} The rendered AdminMemberList component.
 */
const AdminMemberList: React.FC<AdminMemberListProps> = ({
    member,
    groupId,
    onDeleteMember
}) => {
    // References to the member modal and confirm modal elements.
    const modalMember = useRef<null | HTMLDialogElement>(null);
    const modalConfirm = useRef<null | HTMLDialogElement>(null);
    // Get the current pathname from the Next.js navigation.
    const pathname = usePathname();

    // Opens the member modal.
    const openModalMember = () => {

        if (modalMember.current) {
            modalMember.current.showModal();
        }
    }

    //  Closes the member modal.
    const closeModalMember = () => {
        if (modalMember.current) {
            modalMember.current.close();
        }
    }

    //  Closes the confirm modal.
    const closeSubModal = () => {
        if (modalConfirm.current) {
            modalConfirm.current.close();
        }
    }

    /**
     * Handles the click event for the remove button.
     * @param {React.FormEvent} event - The event.
     */
    const handleRemoveClick = (event: React.FormEvent) => {
        if (onDeleteMember) {
            onDeleteMember(event);
        }
    }

    // function handleSubmit(event: React.FormEvent<Element>): void {
    //     removeTeamMember(groupId, member.id!).then(() => {
    //         closeModalMember();
    //         deleteMember();
    //     });
    // }

    return (
        <>
            <div className="flex flex-row flex-none w-full items-center">
                <div className="flex flex-row w-full pointer-events-none btn btn-primary justify-between" style={{ width: 'calc(100% - 40px)' }}>
                    <div className="flex flex-row items-center space-x-3">
                        {/* if member has picture use it, otherwise use default image */}
                        <div className="avatar w-8 rounded-full items-center align-middle justify-center ">
                            {member?.picture ? (
                                <img src={member?.picture} alt="" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>
                            )}
                        </div>
                        <div className="flex flex-row space-x-1">
                            <p>{member?.firstName ?? "First Name"}</p>
                            <p>{member?.lastName ?? "Last Name"}</p>

                        </div>
                    </div>

                    <p>{member?.email ?? "Last Name"}</p>
                </div>
                <div className="flex flex-row flex-none">
                    <button onClick={(event) => { event.stopPropagation(); openModalMember(); }} className="btn btn-circle btn-sm pointer-events-auto ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <dialog ref={modalMember} className="py-3 px-14 rounded-2xl space-y-4">
                    <RemoveMember pathname={pathname} close={closeModalMember} onSubmit={handleRemoveClick} />
                </dialog>
                <dialog ref={modalConfirm} className="py-3 px-14 rounded-2xl space-y-4">
                    {/* if you are in '/admin/teams/groupId' tha modal display one message, otherwise it display other message  */}
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
