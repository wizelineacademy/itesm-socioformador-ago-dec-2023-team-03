import UserCard from "./UserCard";
import Link from "next/link";
import chat_history from "../data/chat_history.json";
import AdminNavButtons from "./AdminNavButtons";

interface SidebarProps {
    reference?: string;
    children: React.ReactNode;
    user?: any;
}

const Sidebar: React.FC<SidebarProps> = ({
    reference,
    children,
    user
}) => {
    // Store chat history in local variable
    const chatHistory = chat_history;
    return (
        <div data-theme="wizeline" className="flex flex-row h-screen w-screen">
            <div className="flex flex-col justify-between h-full w-64">
                <div className="flex flex-col gap-5 px-4 py-5 ">
                    <Link className="text-3xl text-white" href={'/admin'}>
                        Wizeprompt
                    </Link>
                    <AdminNavButtons />
                </div>
                <div className="p-3 text-white">
                    <UserCard user={user} />
                </div>
            </div>
            <div className="flex flex-col h-screen w-full overflow-auto">
                {children}
            </div>
        </div>
    );

}

export default Sidebar;