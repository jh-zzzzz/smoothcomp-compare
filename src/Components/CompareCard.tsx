import { useEffect, useState } from "react";
import { CompetitorInfo } from "../types";
import { getOppsInCommon } from "../util";

export const CompareCard = ({ competitors }: { competitors: CompetitorInfo[] }) => {
  const [oppsInCommon, setOppsInCommon] = useState<Array<number>>();

  useEffect(() => {
    setOppsInCommon(Array.from(getOppsInCommon(competitors).keys()));
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
      {oppsInCommon && oppsInCommon.map(opp => (
          <li key={opp}>
            {opp}
            <ul>
            {competitors.map(competitor => (competitor.matches.filter(match => match.opponent.id === opp)
              .map(match => (
                <li key={match.opponent.id.toString() + match.timestamp.toString() + competitor.id.toString()}>
                  {competitor.name} {match.isWinner ? "won" : "lost"} against {match.opponent.name} on {timestampToDate(match.timestamp)}
                </li>
              ))
            ))}
            </ul>
          </li>
      ))}
    </ul>
  );
};
