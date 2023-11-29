'use client';

import UserCard from '@/src/app/components/UserCard';
import useSession from '@/src/hooks/useSession';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';
import { BiLogOut } from "react-icons/bi";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiAdminLine } from "react-icons/ri";


/**
 * Categories for the sidebar.
 * @type {Array.<{name: string, slug: string, Icon: React.ComponentType}>}
 */
const categories = [
  {
    name: 'Teams',
    slug: 'teams',
    Icon: HiOutlineUserGroup
  }
]

/**
 * Sidebar component.
 * @function
 * @returns {JSX.Element} Rendered sidebar component.
 */
function Sidebar() {
  // Get the current pathname
  const pathname = usePathname();
  // Get the selected category from the pathname
  const selectedCategory = pathname.split('/')[1];

  const { me } = useSession();
  const { user } = useUser();

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
        {me && me.roleName === 'admin'
          ? (
            <li>
              <Link
                href={`/admin`}
                className={('flex w-full rounded-md px-2 py-3 items-center gap-x-2 hover:bg-regal-blue-light')}
              >
                <RiAdminLine size={24} color='#FFFFFF' />
                Admin
              </Link>
            </li>
          ) : null
        }
      </ul>
      {user && <UserCard user={user} />}
    </aside>
  )
}

export default Sidebar;
