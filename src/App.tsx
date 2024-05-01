import { useEffect, useState } from "react";
import "./App.css";
import { CompetitorsForm } from "./Components/CompetitorsForm";
import { CompetitorInfo } from "./types";



function App() {
  const [competitor1, setCompetitor1] = useState<CompetitorInfo>();
  const [competitor2, setCompetitor2] = useState<CompetitorInfo>();
  const [oppsInCommon, setOppsInCommon] = useState<number[]>();

  useEffect(() => {

    if (competitor1 && competitor2) {
      const oppsForCompetitor1: number[] = [];
      const oppsForCompetitor2: number[] = [];
  
      competitor1!.matches.forEach(match => oppsForCompetitor1.push(match.opponent.id));
      competitor2!.matches.forEach(match => oppsForCompetitor2.push(match.opponent.id));
  
      setOppsInCommon(oppsForCompetitor1.filter(opp => oppsForCompetitor2.includes(opp)));
    }
  }, [competitor1, competitor2]);

  return (
    <>
      <CompetitorsForm
        setCompetitor1={setCompetitor1}
        setCompetitor2={setCompetitor2}
      />
      <br />
      {oppsInCommon && (
        <ul>
          {oppsInCommon.map(opp => (
            <li key={opp}>{opp}</li>
          ))}
        </ul>
      )}
      <br />
      <br />
      <br />
      <hr />
      {competitor1 && (
        <ul>
          {competitor1.matches.map((match) => (
            <li>
              Name: {match.opponent.name}
              <br />
              ID: {match.opponent.id}
              <br />
              Outcome: {match.isWinner ? "competitor1" : match.opponent.name} won the match
              <br />
            </li>
          ))}
        </ul>
      )}
      <hr />
      {competitor2 && (
        <ul>
          {competitor2.matches.map((match) => (
            <li>
              Name: {match.opponent.name}
              <br />
              ID: {match.opponent.id}
              <br />
              Outcome: {match.isWinner ? "competitor2" : match.opponent.name} won the match
              <br />
            </li>
          ))}
        </ul>
      )}
      {/* <CompareCard /> */}
    </>
  );
}

export default App;
