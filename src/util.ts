import { CompetitorInfo } from "./types";

export function getOpps(competitorInfo: CompetitorInfo) {
    return competitorInfo.matches.map(match => match.opponent.id);
}