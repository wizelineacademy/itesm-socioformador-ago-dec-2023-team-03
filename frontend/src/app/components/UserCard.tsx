"use client";

import { useState } from "react";
import { Avatar } from 'antd'
import { DollarTwoTone } from '@ant-design/icons';
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import { usePathname } from "next/navigation";

interface UserCardProps {
    reference?: string;
}

const UserCard: React.FC<UserCardProps> = ({
        reference,
    }) => {
    
    const pathname = usePathname();
    const adminRoute = pathname.split("/")[1];
    
    const { user, error, isLoading } = useUser();

    // Hook for hover over the avatar
    const [hover, setHover] = useState(false);

    // Get the username from the user object given by Auth0
    const userName = user?.given_name

    console.log(user)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    // If menu is not shown, show the avatar and username on Home page
    if (hover == false && reference == "/home") {
        return (
            <div className='flex flex-row items-center gap-x-2 py-2'>
                <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                    <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={user?.picture || ""}>
                    </Avatar>
                </div>
                <div>
                    <p className="truncate w-fill text-md"> { userName ? userName : 'Username' }  </p>
                    <div className='flex flex-row gap-x-1'>
                        <DollarTwoTone twoToneColor="#fcc203" />
                        <p className="truncate w-fill text-md">Tokens</p>
                    </div>
                </div>
            </div>
        );
        // If menu is not shown, show the avatar and username on Admin page
    } else if (adminRoute == "admin" && hover == false) {
        return (
            <div className='flex flex-row items-center gap-x-2 py-2'>
            <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={user?.picture || ""}>
                </Avatar>
            </div>
            <div>
                <p className="truncate w-fill text-md"> { userName ? userName : 'Username' }  </p>
                <div className='flex flex-row gap-x-1'>
                    <DollarTwoTone twoToneColor="#fcc203" />
                    <p className="truncate w-fill text-md">Tokens</p>
                </div>
            </div>
        </div>
    );
    // Show menu after hovering on the avatar on Admin page
    } else if (adminRoute == "admin" && hover == true) {
        return (
            <div onMouseLeave={() => setHover(false)}>
                <div>
                    <div className="flex flex-col items-center py-1">
                        <div className="flex flex-col">
                            <Link href='/'>
                                <button className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-10 rounded-full py-2.1 opacity-50">
                                    Home
                                </button>                                
                            </Link>
                            <Link href="/api/auth/logout" className='flex flex-col items-center'>
                                <button className="pt-1 hover:text-gray-400">
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 py-2'>
                        <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                            <Avatar size={{ xs: 24, sm:32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={user?.picture || ""}>
                            
                            </Avatar>
                        </div>
                        <div>
                            <p className="truncate w-fill text-md"> 
                                { userName ? userName : 'Username' } 
                            </p>
                            <div className='flex flex-row gap-x-1'>
                                <DollarTwoTone twoToneColor="#fcc203" />
                                <p className="truncate w-fill text-md">Tokens</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // Show menu after hovering on the avatar on Home page
        return (
            <div onMouseLeave={() => setHover(false)}>
                <div>
                    <div className="flex flex-col items-center py-1">
                        <div className="flex flex-col">
                            <Link href='/admin'>
                                <button className="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-10 rounded-full py-2.1 opacity-50">
                                    Dashboard
                                </button>                                
                            </Link>
                            <Link href="/api/auth/logout" className='flex flex-col items-center'>
                                <button className="pt-1 hover:text-gray-400">
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 py-2'>
                        <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                            <Avatar size={{ xs: 24, sm:32, md: 40, lg: 64, xl: 80, xxl: 100 }} src={user?.picture || ""}>
                            </Avatar>
                        </div>
                        <div>
                            <p className="truncate w-fill text-md">{ userName ? userName : 'Username' } </p>
                            <div className='flex flex-row gap-x-1'>
                                <DollarTwoTone twoToneColor="#fcc203" />
                                <p className="truncate w-fill text-md">Tokens</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default UserCard;