const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/teams`;

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