import { FormEvent } from "react";
import { Opponent } from "../App";

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
    let oppsFor1: Opponent[] = [];
    fetch(
      "https://smoothcomp.com/en/profile/"
        .concat(competitor1.value)
        .concat("/events"),
    )
      .then((resp) => resp.json())
      .then((json) => {
        for (let i in json.data) {
          for (let j in json.data[i].registrations) {
            for (let k in json.data[i].registrations[j].matches) {
              oppsFor1.push({
                name: json.data[i].registrations[j].matches[k].opponents[0]
                  .name,
                id: json.data[i].registrations[j].matches[k].opponents[0].id,
                isWinner: json.data[i].registrations[j].matches[k].is_winner,
              });
            }
          }
        }
        setCompetitor1({ name: "", id: competitor1.value, opps: oppsFor1 });
      });

    let oppsFor2: Opponent[] = [];
    fetch(
      "https://smoothcomp.com/en/profile/"
        .concat(competitor2.value)
        .concat("/events"),
    )
      .then((resp) => resp.json())
      .then((json) => {
        for (let i in json.data) {
          for (let j in json.data[i].registrations) {
            for (let k in json.data[i].registrations[j].matches) {
              oppsFor2.push({
                name: json.data[i].registrations[j].matches[k].opponents[0]
                  .name,
                id: json.data[i].registrations[j].matches[k].opponents[0].id,
                isWinner: json.data[i].registrations[j].matches[k].is_winner,
              });
            }
          }
        }
        setCompetitor2({ name: "", id: competitor2.value, opps: oppsFor1 });
      });
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
