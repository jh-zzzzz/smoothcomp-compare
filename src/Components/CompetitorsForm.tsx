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

type InputType = {
  inputs: { input: string; }[];
}

export const CompetitorsForm = ({
  setCompetitors
}: { setCompetitors: Dispatch<SetStateAction<CompetitorInfo[] | undefined>> }) => {
  const [competitorNames, setCompetitorsNames] = useState<string[]>(["", ""]);
  const { control, register, handleSubmit } = useForm<InputType>({
    defaultValues: {
      inputs: [
        { input: "" },
        { input: "" }
      ]
    }
  });
  const { fields, remove, append } = useFieldArray({ control, name: "inputs" });

  const handleFormSubmit = (data: InputType) => {
    const promises: Promise<CompetitorInfo>[] = Array.from(
      data.inputs.map(({ input }: { input: string }) => getCompetitorInfo(input))
    );
    Promise.all(promises).then((info) => {
      setCompetitors(info);
      setCompetitorsNames(info.map(c => c.name));
    });
  };

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ input: "" });
    setCompetitorsNames([...competitorNames, ""]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {fields.map((input, index) => (
          <div key={input.id}>
            <label htmlFor={`competitor${index}`}>competitor {index + 1}</label>
            <input {...register(`inputs.${index}.input` as const)} type="text" id={`competitor${index}`} />
            <button type="button">Check</button>
            <br />
            <label htmlFor={`name${index}`}>Name: </label>
            <input type="text" id={`name${index}`} disabled value={competitorNames[index]} />
            <button type="button" onClick={() => remove(index)}>Remove input {index + 1}</button>
          </div>
        ))}
        <input type="submit" value="Compare!" />
        <button type="button" onClick={addInput}>Add input</button>
      </form>
    </>
  );
};
