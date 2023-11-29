"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Interface for UserCardProps.
 * @interface
 * @property {any} [user] - The user.
 */
interface UserCardProps {
    user?: any;
}

/**
 * UserCard component for user profile info used in the sidebar component (displayed at the bottom).
 * @component
 * @param {UserCardProps} props - The props.
 * @param {any} [props.user] - The user.
 * @returns {JSX.Element} The rendered UserCard component.
 */
const UserCard: React.FC<UserCardProps> = ({
    user,
}) => {
    // State for hover.
    const [hover, setHover] = useState(false);

    return (
        <div className="flex flex-col flex-none space-y-3 w-full" onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)}>
            {hover ? (
                <div className="flex flex-col align-center items-center w-full space-y-2">
                    <Link href="/">
                        <p className="btn btn-secondary text-lg rounded-3xl p-2 pl-7 pr-7">Home</p>
                    </Link>
                    <a href="/api/auth/logout">
                        <p className="text-sm rounded-xl p-1 hover:text-regal-blue-light">Sign Out</p>
                    </a>
                </div>
            ) : null}

            <div className="flex flex-row align-middle items-center space-x-2">
                <div className="avatar">
                    <div className="w-12 rounded-full">
                        {/* Photo from logged Google account */}
                        <img src={user.picture} alt="" />
                    </div>
                </div>
                {/* Name from logged Google account */}
                <p>{user.given_name}</p>
            </div>
        </div>
    )
}

export default UserCard;
