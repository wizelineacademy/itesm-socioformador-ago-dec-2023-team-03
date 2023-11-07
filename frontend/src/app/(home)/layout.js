import Link from 'next/link'

import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

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

function HomePageLayout({ children }) {
  return (
    <div className='w-screen h-screen flex'>
      <aside className='bg-regal-blue-dark flex flex-col w-64 h-full shrink-0 border-r border-gray-600'>
        <ul className='overflow-y-scroll h-full px-4'>
          {categories.map((category, idx) => (
            <li key={`${category}-${idx}`}>
              <Link
                href={`/${category.slug}`}
                className='flex w-full rounded-md px-2 py-3 items-center gap-x-2 hover:bg-regal-blue-light'
              >
                {<category.Icon size={24} color='#FFFFFF' />}
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link href='/api/auth/logout'>Logout</Link>
      </aside>
      <main className='w-full bg-regal-blue-normal'>
        { children }
      </main>
    </div>
  )
}

export default HomePageLayout;
