import { Dispatch, MouseEvent, SetStateAction } from "react";
import { getCompetitorInfo, } from "../http";
import { CompetitorInfo } from "../types";
import { useFieldArray, useForm } from "react-hook-form";

type InputType = {
  inputs: {
    input: string;
    name: string;
  }[];
}

export const CompetitorsForm = ({
  setCompetitors
}: { setCompetitors: Dispatch<SetStateAction<CompetitorInfo[] | undefined>> }) => {
  const { control, register, handleSubmit } = useForm<InputType>({
    defaultValues: {
      inputs: [
        { input: "", name: "" },
        { input: "", name: "" }
      ]
    }
  });
  const { fields, remove, append, update } = useFieldArray({ control, name: "inputs" });

  const handleFormSubmit = (data: InputType) => {
    const promises: Promise<CompetitorInfo>[] = Array.from(
      data.inputs.map(({ input }: { input: string }) => getCompetitorInfo(input))
    );
    Promise.all(promises).then((info) => {
      setCompetitors(info);
      info.forEach((i, index) => update(index, {input: i.id.toString(), name: i.name}));
    });
  };

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ input: "", name: "" });
  };

  const removeInput = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    remove(index);
  }

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
            <input type="text" id={`name${index}`} disabled value={input.name} readOnly={true} />
            <button type="button" onClick={(e) => removeInput(e, index)}>Remove input {index + 1}</button>
          </div>
        ))}
        <input type="submit" value="Compare!" />
        <button type="button" onClick={addInput}>Add input</button>
      </form>
    </>
  );
};
