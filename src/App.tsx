import { useEffect, useState } from "react";
import "./App.css";
import { CompetitorsForm } from "./Components/CompetitorsForm";
import { CompetitorInfo } from "./types";
import { CompareCard } from "./Components/CompareCard";



function App() {
  const [competitor1, setCompetitor1] = useState<CompetitorInfo>();
  const [competitor2, setCompetitor2] = useState<CompetitorInfo>();
  

  

  return (
    <>
      <CompetitorsForm
        setCompetitor1={setCompetitor1}
        setCompetitor2={setCompetitor2}
      />
      <br />
      {competitor1 && competitor2 && (
        <CompareCard competitors={[competitor1, competitor2]} />
      )}
    </>
  );
}

export default App;
