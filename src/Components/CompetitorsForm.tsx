import { FormEvent } from "react";
import { getMatchesForCompetitor } from "../http";

type CompetitorsFormProps = {
  setCompetitor1: Function;
  setCompetitor2: Function;
};

type CompetitorsFormEvent = FormEvent<HTMLFormElement> & {
  target: {
    competitor1: { value: string };
    competitor2: { value: string };
  };
};

export const CompetitorsForm = ({
  setCompetitor1,
  setCompetitor2,
}: CompetitorsFormProps) => {
  const handleFormSubmit = (e: CompetitorsFormEvent) => {
    e.preventDefault();
    const { competitor1, competitor2 } = e.target;
    if (!competitor1.value || !competitor2.value) {
      // TODO: disallow empty id
    }
    getMatchesForCompetitor(competitor1.value)
      .then(opps => setCompetitor1({ name: "", id: competitor1.value, opps: opps }));
    getMatchesForCompetitor(competitor2.value)
      .then(opps => setCompetitor2({ name: "", id: competitor2.value, opps: opps }));
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="competitor1-input">competitor 1</label>
        <input type="text" id="competitor1" />
        <label htmlFor="competitor2-input">competitor 2</label>
        <input type="text" id="competitor2" />
        <input type="submit" value="Compare!" />
      </form>
    </>
  );
};
