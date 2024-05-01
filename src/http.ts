const BASE_URL = 'https://smoothcomp.com/en/profile';

export async function getMatchesForCompetitor(competitorId: string) {
    return getMatches(`${BASE_URL}/${competitorId}/events?page=1`);
}

async function getMatches(input: string): Promise<any[]> {
    const data = await fetch(input).then(resp => resp.json());
    const matches = parseMatches(data);
    console.log(matches);
    return data.next_page_url
        ? parseMatches(data).concat(await getMatches(data.next_page_url))
        : parseMatches(data);
}

function parseMatches(data) {
    let rarr: Object[] = [];
    for (let i in data.data) {
        for (let j in data.data[i].registrations) {
            for (let k in data.data[i].registrations[j].matches) {
                rarr.push({
                    name: data.data[i].registrations[j].matches[k].opponents[0]
                        .name,
                    id: data.data[i].registrations[j].matches[k].opponents[0].id,
                    isWinner: data.data[i].registrations[j].matches[k].is_winner,
                });
            }
        }
    }
    return rarr;
}

