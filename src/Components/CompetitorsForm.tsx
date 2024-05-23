import { Dispatch, FormEvent, MouseEvent, SetStateAction, useState } from "react";
import { getCompetitorInfo, } from "../http";
import { CompetitorInput } from "./CompetitorInput";
import { CompetitorInfo } from "../types";
import { useFieldArray, useForm } from "react-hook-form";

type CompetitorsFormEvent = FormEvent<HTMLFormElement> & {
  target: {
    competitor1: { value: string };
    competitor2: { value: string };
  };
};

export const CompetitorsForm = ({
  setCompetitors
}: { setCompetitors: Dispatch<SetStateAction<CompetitorInfo[] | undefined>> }) => {
  // const [competitorNames, setCompetitorsNames] = useState<string[]>([]);
  // const [inputs, setInputs] = useState<string[]>(["", ""]);
  const { control } = useForm({
    defaultValues: {
      inputs: [
        { input: "" },
        { input: "" }
      ]
    }
  });
  const { fields, remove, append } = useFieldArray({ control, name: "inputs" });

  // const handleFormSubmit = (e: CompetitorsFormEvent) => {
  //   e.preventDefault();
  //   Promise.all(Array.from(inputs.map(input => getCompetitorInfo(input))))
  //     .then(info => {
  //       setCompetitors(info);
  //       setCompetitorsNames(info.map(i => i.name));
  //     });
  // };

  // const addInput = (e: MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   setInputs([...inputs, ""]);
  // };

  // const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
  //   e.preventDefault();
  //   if (inputs.length > 2) {
  //     let data = [...inputs];
  //     data.splice(index, 1);
  //     setInputs(data);
  //   }
  // };

  return (
    <>
      <form onSubmit={/* handleFormSubmit */ () => {}}>
        {fields.map((input, index) => (
          <CompetitorInput key={input.id} num={index} /* state={{ inputs: inputs, setter: setInputs }} */ removeInput={remove} /* name={competitorNames[index]} */ />
        ))}
        <input type="submit" value="Compare!" />
        <button onClick={(e) => {e.preventDefault();append({ input: "" })}}>Add input</button>
      </form>
    </>
  );
};
