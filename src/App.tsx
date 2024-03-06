import { useState } from "react";
import "./App.css";
import { CompetitorsForm } from "./Components/CompetitorsForm";

export type Competitor = {
  id: number;
  name: string;
  opps: Opponent[];
};

export type Opponent = {
  id: number;
  name: string;
  isWinner: boolean;
};

function App() {
  const [competitor1, setCompetitor1] = useState<Competitor>();
  const [competitor2, setCompetitor2] = useState<Competitor>();

  return (
    <>
      <CompetitorsForm
        setCompetitor1={setCompetitor1}
        setCompetitor2={setCompetitor2}
      />
      {competitor1 && (
        <ul>
          {competitor1.opps.map((opp) => (
            <li>
              Name: {opp.name}
              <br />
              ID: {opp.id}
              <br />
              Outcome: {opp.isWinner ? "competitor1" : opp.name} won the match
              <br />
            </li>
          ))}
        </ul>
      )}
      <hr />
      {competitor2 && (
        <ul>
          {competitor2.opps.map((opp) => (
            <li>
              Name: {opp.name}
              <br />
              ID: {opp.id}
              <br />
              Outcome: {opp.isWinner ? "competitor2" : opp.name} won the match
              <br />
            </li>
          ))}
        </ul>
      )}
      <CompareCard />
    </>
  );
}

export default App;
