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

  return (
    <ul>
      {oppsInCommon && [...oppsInCommon].map(opp => (
        <li key={opp}>{opp}</li>
      ))}
    </ul>
  );
};
