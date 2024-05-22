import { ChangeEvent, Dispatch, MouseEvent, useRef } from "react";
import { getNameForCompetitor } from "../http";



export const CompetitorInput = ({ num, state, removeInput, name }: { num: number; state: { inputs: string[], setter: Dispatch<React.SetStateAction<string[]>> }; removeInput: Function; name?: string }) => {
    const competitorIdInput = useRef<HTMLInputElement>(null);

    const getName = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (competitorIdInput) getNameForCompetitor(competitorIdInput.current!.value)
            .then(n => name = n);
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        e.preventDefault();
        let data = [...state.inputs];
        data[index] = e.target.value;
        state.setter(data);
    }

    return (
        <div>
            <label htmlFor={`competitor${num}`}>competitor {num + 1}</label>
            <input ref={competitorIdInput} type="text" id={`competitor${num}`} onChange={e => handleOnChange(e, num)} />
            <button type="button" onClick={getName}>Check</button>
            <br />
            <label htmlFor={`name${num}`}>Name: </label>
            <input type="text" id={`name${num}`} disabled value={name} />
            <button disabled={state.inputs.length <= 2} onClick={e => removeInput(e, num)}>Remove input {num + 1}</button>
        </div>
    );
}