import React from "react";

type IpsumNumberFieldProps = {
    name: string,
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
    currentValue : number
}

const IpsumNumberField = (props: IpsumNumberFieldProps) => {
    return (
        <input
            type="number"
            className="border-2 rounded-lg w-full h-12 px-4"
            name={props.name}
            defaultValue={5}
            onChange={props.changeHandler}
        />
    );
}

export default IpsumNumberField