import React from "react";

type IpsumSelectFieldProps = {
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    values : Array<{value : string,label : string}>,
    currentValue : string
}

const IpsumSelectField = (props: IpsumSelectFieldProps) => {
    return (
        <select name={props.name} className="border-2 rounded-lg w-full h-12 px-4" onChange={props.changeHandler}>
            {props.values.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default IpsumSelectField