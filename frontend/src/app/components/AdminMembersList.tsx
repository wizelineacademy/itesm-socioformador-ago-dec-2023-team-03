import img from '/public/images/chat-gpt-logo.svg.png';
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';
import AdminListDeleteButton from './AdminListDeleteButton';
import { Member } from '@/src/types';

interface AdminMemberListProps {
    member?: Member;
}

const AdminMemberList: React.FC<AdminMemberListProps> = ({
    member,
}) => {
    return (
        <div className="flex flex-row h-fit p-2 rounded-lg w-full bg-regal-blue-normal items-center justify-between">
            <div className="flex flex-row items-center space-x-2">
                <div className="avatar">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-600">
                        <img src={member?.picture ?? ""} alt="AA" />
                    </div>
                </div>
                <p>{member?.firstName ?? "First Name"}</p>
                <p>{member?.lastName ?? "Last Name"}</p>
            </div>
            <div>
                <AdminListDeleteButton />
            </div>
        </div>
    )
}

export default AdminMemberList;