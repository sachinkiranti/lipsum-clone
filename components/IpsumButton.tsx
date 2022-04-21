import React from "react";

type IpsumButtonProps = {
    name: string,
    type?: "submit" | "reset" | "button",
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const BUTTON_TYPE = [ "submit", "reset", "button", undefined ]

const IpsumButton = (props: IpsumButtonProps) => {

    const btnType = BUTTON_TYPE.includes(props.type) ? props.type : "button"

    return (
        <button
            type={btnType}
            className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full"
            >
            {props.name}
        </button>
    );
}

export default IpsumButton