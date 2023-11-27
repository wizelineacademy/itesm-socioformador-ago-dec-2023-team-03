const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/teams`;
const baseUrl2 = `${process.env.NEXT_PUBLIC_API_URL}/llms`;

import { LLM } from '../types';

async function find(id) {
  const routeURl = `${process.env.NEXT_PUBLIC_API_URL}/llms/${id}`;

  try {
    const res = await fetch(routeURl, {
        cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export async function getAllLLM(teamId) {
    const routeURl = `${baseUrl}/${teamId}/llms`;

    try {
        const res = await fetch(routeURl, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export async function getLLM() {
    const routeURl = `${baseUrl2}`;

    try {
        const res = await fetch(routeURl, {
            cache: 'no-store'
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}

/**
 * Filtra los LLMs que no están en un equipo en particular.
 *
 * @param {LLM[]} allLLMs - Todos los LLMs registrados.
 * @param {LLM[]} teamLLMs - Los LLMs que tiene un equipo en particular.
 * @returns {LLM[]} Un array de LLMs que no están en el equipo.
 */
export function filterLLMsNotInTeam(allLLMs, teamLLMs) {
  return allLLMs.filter(llm => 
      !teamLLMs.some(teamLLM => teamLLM.id === llm.id)
  );
}

export default {
  find
};
