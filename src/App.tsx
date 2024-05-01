import { useState } from "react";
import "./App.css";
import { CompetitorsForm } from "./Components/CompetitorsForm";
import { CompetitorInfo } from "./types";



function App() {
  const [competitor1, setCompetitor1] = useState<CompetitorInfo>();
  const [competitor2, setCompetitor2] = useState<CompetitorInfo>();

  return (
    <>
      <CompetitorsForm
        setCompetitor1={setCompetitor1}
        setCompetitor2={setCompetitor2}
      />
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
