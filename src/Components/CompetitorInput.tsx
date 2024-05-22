import { ChangeEvent, Dispatch, MouseEventHandler, useEffect, useRef, useState } from "react";
import { getNameForCompetitor } from "../http";



export const CompetitorInput = ({num, state, name}: {num: number; state: {inputs: string[], setter: Dispatch<React.SetStateAction<string[]>>}; name?: string}) => {
    const [competitorName, setCompetitorName] = useState<string>("");
    const competitorIdInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        name && setCompetitorName(name);
    }, [name])

    const getName: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (competitorIdInput) getNameForCompetitor(competitorIdInput.current!.value)
            .then(name => setCompetitorName(name));
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
            <input type="text" id={`name${num}`} disabled value={competitorName} />
        </div>
    );
}