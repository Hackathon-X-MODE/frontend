import React from "react";

const Loader = (props) => {
    return (
        <div
            className={
                "w-[100px] h-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
            }
        >
            <div
                className={
                    'animate-load w-[100%] h-[100%] h-[100px] bg-no-repeat bg-cover bg-center bg-fixed"'
                }
            ></div>
        </div>
    );
};

export default Loader;
