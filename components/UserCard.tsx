"use client";

import { useState } from "react";
import { Avatar, Button, ConfigProvider } from 'antd'
import { DollarTwoTone } from '@ant-design/icons';
import Link from "next/link";

const UserCard: React.FC = () => {
    // Hook to toggle the menu
    const [showMenu, toggleShowMenu] = useState(false);
    // Hook for hover over the avatar
    const [hover, setHover] = useState(false);
    // TODO: Get username from database
    const userName = 'User Name';

    // Debug for hover
    // if(hover) {
    //     console.log('hovering')
    // }

    // If menu is not shown, show the avatar and username
    if (showMenu == false && hover == false) {
        return (
            <div className='flex flex-row items-center gap-x-2 py-2'>
                <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                    <Avatar size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }} onClick={() => toggleShowMenu(!showMenu)}>
                        UN
                    </Avatar>
                </div>
                <div>
                    <p className="truncate w-fill text-md">Username</p>
                    <div className='flex flex-row gap-x-1'>
                        <DollarTwoTone twoToneColor="#fcc203" />
                        <p className="truncate w-fill text-md">Tokens</p>
                    </div>
                </div>
            </div>
        );
        // Show menu after clicking on the avatar
    } else {
        return (
            <div onMouseLeave={() => setHover(false)}>
                <div>
                    <div className="flex flex-col items-center py-1">
                        <div className="flex flex-col">
                            <button className="bg-gray-300 text-gray-800 font-bold py-2 px-10 rounded-full py-2.1 opacity-50 cursor-not-allowed">
                                Dashboard
                            </button>
                            <Link href='/login' className='flex flex-col items-center'>
                                <button className="pt-1 hover:text-gray-400">
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-row items-center gap-x-2 py-2'>
                        <div className='cursor-pointer' onMouseEnter={() => setHover(true)}>
                            <Avatar size={{ xs: 24, sm:32, md: 40, lg: 64, xl: 80, xxl: 100 }} onClick={() => toggleShowMenu(!showMenu)}>
                                UN
                            </Avatar>
                        </div>
                        <div>
                            <p className="truncate w-fill text-md">Username</p>
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