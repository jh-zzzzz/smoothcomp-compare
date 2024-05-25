import { CompetitorInfo } from "./types";

export function getOpps(competitorInfo: CompetitorInfo) {
    return [...new Set(competitorInfo.matches.map(match => match.opponent.id))];
}

export function getOppsInCommon(competitorsInfo: CompetitorInfo[]): Map<number, number[]> {
    const competitorsPerOpp = new Map<number, number[]>();
    let opps: number[] = [];
    for (const c of competitorsInfo) {
        opps.push(...getOpps(c));
    }
    for (let opp of [...new Set(opps)]) {
        const competitorsForOpp = competitorsInfo
            .filter(c => c.matches.some(m => m.opponent.id === opp))
            .map(c => c.id);
        if (competitorsForOpp.length > 1) {
            competitorsPerOpp.set(opp, competitorsForOpp);
        }
    }
    return competitorsPerOpp;
}