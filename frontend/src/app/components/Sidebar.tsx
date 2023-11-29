import Link from "next/link";
import chat_history from "../data/chat_history.json";
import AdminNavButtons from "./AdminNavButtons";
import UserCard from "./UserCard";

/**
 * Interface for SidebarProps.
 * @interface
 * @property {string} [reference] - The reference for the item.
 * @property {React.ReactNode} children - The children nodes.
 * @property {any} [user] - The user.
 */
interface SidebarProps {
    reference?: string;
    children: React.ReactNode;
    user?: any;
}

/**
 * The sidebar component for admin layout.
 * @component
 * @param {SidebarProps} props - The props.
 * @param {string} [props.reference] - The reference.
 * @param {React.ReactNode} props.children - The children nodes.
 * @param {any} [props.user] - The user.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar: React.FC<SidebarProps> = ({
    reference,
    children,
    user
}) => {
    // Store chat history in local variable
    const chatHistory = chat_history;
    return (
        <div data-theme="wizeline" className="flex flex-row h-screen w-screen">
            <div className="flex flex-col justify-between w-64">
                <div className="flex flex-col gap-5 px-4 py-5 items-center justify-center">
                    <Link className="text-3xl text-white" href={'/admin'}>
                        Wizeprompt
                    </Link>
                </div>
                <div className="flex flex-col flex-grow h-full p-3">
                    {/* Items for navbar navigation */}
                    <AdminNavButtons />
                </div>
                <div className="p-3 text-white">
                    {/* The logged user info (Name an google's profile photo) */}
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
