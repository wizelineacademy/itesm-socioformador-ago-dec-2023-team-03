import Link from 'next/link';

import { HiOutlineUserGroup } from 'react-icons/hi';
import { AiOutlineUser } from 'react-icons/ai';

const categories = [
  {
    name: 'Teams',
    slug: 'team',
    Icon: HiOutlineUserGroup
  },
  {
    name: 'Profile',
    slug: 'profile',
    Icon: AiOutlineUser
  }
]

function Page() {
  return (
    <aside className='bg-regal-blue-dark w-64 h-full shrink-0 border'>
      <ul className='overflow-y-scroll h-[calc(100vh-3.5rem)] px-4'>
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
    </aside> 
  )
}

export default Page;
