import { useState } from "react";
import { CompetitorsForm } from "./Components/CompetitorsForm";
import { CompetitorInfo } from "./types";
import { CompareCard } from "./Components/CompareCard";



function App() {
  const [competitors, setCompetitors] = useState<CompetitorInfo[]>();

  return (
    <>
      <CompetitorsForm
        setCompetitors={setCompetitors}
      />
      <br />
      {competitors && (
        <CompareCard competitors={competitors} />
      )}
    </>
  );
}

export default App;
