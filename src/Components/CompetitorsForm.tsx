import { Dispatch, FormEvent, MouseEvent, SetStateAction } from "react";
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
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      inputs: [
        { input: "" },
        { input: "" }
      ]
    }
  });
  const { fields, remove, append } = useFieldArray({ control, name: "inputs" });

  const handleFormSubmit = (data: any) => {
    console.log(data);
    // e.preventDefault();
    // Promise.all(Array.from(inputs.map(({input}: {input: string}) => getCompetitorInfo(input))))
    //   .then(info => {
    //     setCompetitors(info);
    //     // setCompetitorsNames(info.map(i => i.name));
    //   });
  };

  const addInput = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ input: "" });
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
            <button type="button" onClick={() => remove(index)}>Remove input {index + 1}</button>
          </div>
          // <CompetitorInput key={input.id} num={index} register={register} /* state={{ inputs: inputs, setter: setInputs }} */ removeInput={remove} /* name={competitorNames[index]} */ />
        ))}
        <input type="submit" value="Compare!" />
        <button type="button" onClick={addInput}>Add input</button>
      </form>
    </>
  );
};
