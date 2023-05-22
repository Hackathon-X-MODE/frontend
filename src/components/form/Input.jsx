import React from "react";

const Input = ({
    autofocus,
    focusEv,
    contentValue,
    updateFunc,
    name,
    isRequired,
    type = "text",
    defaultValue
}) => {
    return name ? (
        <input
            onFocus={focusEv}
            autoFocus={autofocus}
            type={type}
            defaultValue={defaultValue}
            required={isRequired}
            name={name}
            value={contentValue}
            className={
                "w-full  p-2 border rounded bg-white text-black font-bold"
            }
            onChange={(e) => updateFunc(e)}
        />
    ) : (
        <input
            type={type}
            defaultValue={defaultValue}
            required={isRequired}
            value={contentValue}
            className={
                "w-full p-2 border rounded bg-white text-black font-bold"
            }
            onChange={(e) => updateFunc(e)}
        />
    );
};

export default Input;
