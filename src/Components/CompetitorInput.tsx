import { MouseEventHandler, useRef, useState } from "react";
import { getNameForCompetitor } from "../http";



export const CompetitorInput = ({num}: {num: number}, {name}: {name: string}) => {
    const [competitorName, setCompetitorName] = useState<string>("");
    const competitorIdInput = useRef<HTMLInputElement>(null);

    const getName: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        if (competitorIdInput) getNameForCompetitor(competitorIdInput.current!.value)
            .then(name => setCompetitorName(name));
    }

    return (
        <div>
            <label htmlFor={`competitor${num}`}>competitor {num}</label>
            <input ref={competitorIdInput} type="text" id={`competitor${num}`} />
            <button type="button" onClick={getName}>Check</button>
            <br />
            <label htmlFor={`name${num}`}>Name: </label>
            <input type="text" id={`name${num}`} disabled value={competitorName} />
        </div>
    );
}