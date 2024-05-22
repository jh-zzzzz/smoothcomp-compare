import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react";
import { getCompetitorInfo, } from "../http";
import { CompetitorInput } from "./CompetitorInput";
import { CompetitorInfo } from "../types";

type CompetitorsFormEvent = FormEvent<HTMLFormElement> & {
  target: {
    competitor1: { value: string };
    competitor2: { value: string };
  };
};

export const CompetitorsForm = ({
  setCompetitors
}: { setCompetitors: Dispatch<SetStateAction<CompetitorInfo[] | undefined>> }) => {
  const [competitorNames, setCompetitorsNames] = useState<string[]>([]);
  const [inputs, setInputs] = useState<string[]>(["", ""]);

  const handleFormSubmit = (e: CompetitorsFormEvent) => {
    e.preventDefault();
    Promise.all(Array.from(inputs.map(input => getCompetitorInfo(input))))
      .then(info => {
        setCompetitors(info);
        setCompetitorsNames(info.map(i => i.name));
      });
    };

    const addInput = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setInputs([...inputs, ""]);
    };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        {inputs.map((_input, index) => (
          <CompetitorInput key={index} num={index} state={{ inputs: inputs, setter: setInputs }} name={competitorNames[index]} />
        ))}
        <input type="submit" value="Compare!" />
        <button onClick={addInput}>Add input</button>
      </form>
    </>
  );
};
