'use client';

import Link from "next/link";
import Dropdown from './Dropdown';

function TeamsList({ teams = [], llms = [] }) {
  return (
      <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-regal-blue-dark dark:border-transparent">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-3xl font-bold leading-none text-gray-900 dark:text-white">Teams</h5>
      </div>
      <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {teams.map((team, i) => (
                <li key={team.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                      <div className="flex-1 min-w-0">
                          <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                            {team.name}
                          </p>
                          <p className="text-brand-primary text-sm font-medium truncate">
                            50 members
                          </p>
                      </div>
                      <div className=" text-brand-primary inline-flex items-center text-base font-semibold">
                        {llms && llms.length > 0
                          ? (
                            <Dropdown items={
                              llms[i].map((llm, i) => ({ href: `/chat/?team-id=${team.id}&llm-id=${llm.id}`, name: `${llm.name}(${llm.model})` }))
                            }/>
                          ) : null
                        }
                      </div>
                  </div>
                </li>
              ))}
            </ul>
      </div>
    </div>
  );
}

export default TeamsList;
