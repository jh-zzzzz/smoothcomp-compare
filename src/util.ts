import { CompetitorInfo } from "./types";

export function getOpps(competitorInfo: CompetitorInfo) {
    const opps = competitorInfo.matches.map(match => {
        return {id: match.opponent.id, name: match.opponent.name}
    });

    const seen = new Set<number>;
    return opps.filter(opp => {
        if (seen.has(opp.id)) {
            return false;
        } else {
            seen.add(opp.id);
            return true;
        }
    })
}

export function getOppsInCommon(competitorsInfo: CompetitorInfo[]): Map<{id:number;name:string}, number[]> {
    const competitorsPerOpp = new Map<{id:number;name:string}, number[]>();
    let opps: {id:number;name:string}[] = [];
    for (const c of competitorsInfo) {
        console.log(getOpps(c));
        getOpps(c).forEach(cOpp => {
            if (opps.every(opp => opp.id !== cOpp.id)) {
                opps.push(cOpp);
            }
        })
    }
    for (let opp of opps) {
        const competitorsForOpp = competitorsInfo
            .filter(c => c.matches.some(m => m.opponent.id === opp.id))
            .map(c => c.id);
        if (competitorsForOpp.length > 1) {
            competitorsPerOpp.set(opp, competitorsForOpp);
        }
    }
    return competitorsPerOpp;
}