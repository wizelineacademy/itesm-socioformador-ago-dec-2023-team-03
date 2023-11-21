'use client';

import Link from 'next/link'

import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { BiLogOut } from "react-icons/bi";

const categories = [
  {
    name: 'Teams',
    slug: 'teams',
    Icon: HiOutlineUserGroup
  },
  {
    name: 'Profile',
    slug: 'profile',
    Icon: AiOutlineUser
  }
]

function Sidebar() {
  const pathname = usePathname();
  const selectedCategory = pathname.split('/')[1];

  return (
    <aside className='bg-regal-blue-dark flex flex-col w-64 h-full shrink-0 border-r border-gray-600 p-4'>
      <ul className='overflow-y-scroll h-full'>
        {categories.map((category, idx) => (
          <li key={`${category}-${idx}`}>
            <Link
              href={`/${category.slug}`}
              className={('flex w-full rounded-md px-2 py-3 items-center gap-x-2 hover:bg-regal-blue-light' +
                `${selectedCategory === category.slug ? ' bg-regal-blue-light' : ' '}`
              )}
            >
              {<category.Icon size={24} color='#FFFFFF' />}
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <Link href='/api/auth/logout' className='text-brand-primary w-full text-lg font-medium flex items-center gap-x-3'>
        <BiLogOut color={'#E93D44'} size={28} />
        Logout
      </Link>
    </aside>
  )
}

export default Sidebar;
