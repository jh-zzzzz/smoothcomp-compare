import { Match } from "./types";

const BASE_URL = 'https://smoothcomp.com/en/profile';

const NAME_INSIDE_TITLE_TAG_PATTERN: RegExp = /<title>\s+(.*?) - .*\/title>/s;
const sleep = (duration: number) => { return new Promise(resolve => setTimeout(resolve, duration)) };

export async function getNameForCompetitor(competitorId: string) {
    return fetch(`${BASE_URL}/${competitorId}`)
        .then(resp => resp.text())
        .then(html => {
            const name = html.match(NAME_INSIDE_TITLE_TAG_PATTERN);
            return name ? name[1] : "Name unknown";
        })
}

export async function getMatchesForCompetitor(competitorId: string) {
    return getMatches(`${BASE_URL}/${competitorId}/events?page=1`);
}

async function getMatches(input: string): Promise<Match[]> {
    let data;
    while (!data) {
        try {
            data = await fetch(input).then(resp => resp.json());
        } catch (_e) {
            await sleep(800);
        }
    }
    return data.next_page_url
        ? parseMatches(data).concat(await getMatches(data.next_page_url))
        : parseMatches(data);
}

function parseMatches(data: any) {
    const rarr: Match[] = [];
    for (let i in data.data) {
        for (let j in data.data[i].registrations) {
            for (let k in data.data[i].registrations[j].matches) {
                rarr.push({
                    timestamp: data.data[i].info.event_start,
                    opponent: {
                        name: data.data[i].registrations[j].matches[k].opponents[0]
                            .name,
                        id: data.data[i].registrations[j].matches[k].opponents[0].id
                    },
                    isWinner: data.data[i].registrations[j].matches[k].is_winner,
                });
            }
        }
    }
    return rarr;
}

