import { FormEvent } from "react";
import { getMatchesForCompetitor, getNameForCompetitor } from "../http";

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
    Promise.all([
      getNameForCompetitor(competitor1.value),
      getMatchesForCompetitor(competitor1.value),
      getNameForCompetitor(competitor2.value),
      getMatchesForCompetitor(competitor2.value)
    ]).then(info => {
      setCompetitor1({ name: info[0], id: competitor1.value, matches: info[1] });
      setCompetitor2({ name: info[2], id: competitor2.value, matches: info[3] });
    });
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="competitor1">competitor 1</label>
        <input type="text" id="competitor1" />
        <label htmlFor="competitor2">competitor 2</label>
        <input type="text" id="competitor2" />
        <input type="submit" value="Compare!" />
      </form>
    </>
  );
};
