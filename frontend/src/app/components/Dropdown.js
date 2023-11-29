'use client';

import Image from 'next/image';
import { useState } from 'react';

function Dropdown({ items = [] }) {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className='relative'>
      <button id='dropdownUsersButton' onClick={() => setIsActive(!isActive)} data-dropdown-toggle='dropdownUsers' data-dropdown-placement='bottom' className='text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-brand-primary' type='button'>Chat <svg className='w-2.5 h-2.5 ms-3' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
        <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4'/>
        </svg>
      </button>

      {isActive
        ? (
          <div id='dropdownUsers' className='z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 absolute right-0'>
          <ul className='h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200' aria-labelledby='dropdownUsersButton'>
            {items.map((item, i) => (
              <li key={`${item}-${i}`}>
                <a href={item.href} className='flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                  <Image width={24} height={24} className='w-6 h-6 me-2 rounded-full' src='/docs/images/people/profile-picture-1.jpg' alt='Jese image' />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        ) : null
      }
    </div>
  );
}

export default Dropdown;
