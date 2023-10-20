interface SidebarItemProps {
    chat: Chat;
}

type Chat = {
    id: number,
    name: string,
    date: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    chat,
}) => {
    // TODO: bring chats from database, better styling

    return (
        <div className="flex flex-row w-full pt-4 pl-2 justify-between no-scrollbar">
            <a href="/" className="flex text-white text-md">
                {chat.name}
            </a>
            <p className="flex text-white text-xs">
                {chat.date}
            </p>
        </div>
    );
};

export default SidebarItem;