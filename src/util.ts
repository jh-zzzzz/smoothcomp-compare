import { CompetitorInfo } from "./types";

export function getOpps(competitorInfo: CompetitorInfo) {
    return [...new Set(competitorInfo.matches.map(match => match.opponent.id))];
}