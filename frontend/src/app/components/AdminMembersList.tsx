import AdminListDeleteButton from './AdminListDeleteButton';
import { Member } from '@/src/types';

interface AdminMemberListProps {
    member?: Member;
}

const AdminMemberList: React.FC<AdminMemberListProps> = ({
    member,
}) => {
    return (
        <div className="flex flex-row h-fit p-2 rounded-lg w-full btn btn-primary items-center justify-between">
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
            <div>
                <AdminListDeleteButton />
            </div>
        </div>
    )
}

export default AdminMemberList;