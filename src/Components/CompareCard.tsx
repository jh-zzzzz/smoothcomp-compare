import { useEffect, useState } from "react";
import { CompetitorInfo } from "../types";

export const CompareCard = ({ competitors }: { competitors: CompetitorInfo[] }) => {
  const [oppsInCommon, setOppsInCommon] = useState<Set<number>>();

  useEffect(() => {
    const oppsForCompetitor1: number[] = [];
    const oppsForCompetitor2: number[] = [];

    competitors[0].matches.forEach(match => oppsForCompetitor1.push(match.opponent.id));
    competitors[1].matches.forEach(match => oppsForCompetitor2.push(match.opponent.id));

    setOppsInCommon(new Set(oppsForCompetitor1.filter(opp => oppsForCompetitor2.includes(opp))));

  }, competitors);

  function timestampToDate(timestamp: number) {
    return new Date(timestamp)
      .toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }
      );
  }

  return (
    <ul>
      {oppsInCommon && [...oppsInCommon].map(opp => (
        <>
          <li key={opp}>
            {opp}
            {competitors.map(competitor => (
              <ul key={competitor.id}>
                {competitor.matches.filter(match => match.opponent.id === opp).map(match => (
                  <li key={match.opponent.id}>
                    {competitor.name} {match.isWinner ? "won" : "lost"} against {match.opponent.name} on {timestampToDate(match.timestamp)}
                  </li>
                ))}
              </ul>
            ))}
          </li>
        </>
      ))}
    </ul>
  );
};
