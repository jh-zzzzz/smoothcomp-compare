export const CompetitorInput = ({num}: {num: number}) => {
    return (
        <>
            <label htmlFor={`competitor${num}`}>competitor {num}</label>
            <input type="text" id={`competitor${num}`} />
        </>
    );
}