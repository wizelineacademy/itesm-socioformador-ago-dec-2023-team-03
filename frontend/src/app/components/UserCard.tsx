"use client";

import { useState } from "react";
import { Avatar } from 'antd'
import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserCardProps {
    user?: any;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
}) => {
    const [hover, setHover] = useState(false);

    return (
        <div className="flex flex-col flex-none space-y-3 w-full" onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}>
            {hover ? (
                <div className="flex flex-col align-center items-center w-full space-y-2">
                    <Link href="/">
                        <p className="btn btn-secondary text-lg rounded-3xl p-2 pl-7 pr-7">Home</p>
                    </Link>
                    <Link href="/api/auth/logout">
                        <p className="text-sm rounded-xl p-1 hover:text-regal-blue-light">Sign Out</p>
                    </Link>
                </div>
            ) : null}

            <div className="flex flex-row align-middle items-center space-x-2">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        <img src={user.picture} alt="" />
                    </div>
                </div>
                <p>{user.given_name}</p>
            </div>
        </div>
    )
}

export default UserCard;