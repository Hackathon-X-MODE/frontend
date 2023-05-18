import React from "react";

const Pagination = () => {
    return (
        <div className={"flex justify-center"}>
            <button
                className={
                    "p-2 text-white border rounded bg-blue-500 w-[100px]"
                }
            >
                Назад
            </button>
            <button
                className={
                    "p-2 text-white border rounded bg-blue-500 w-[100px]"
                }
            >
                Вперед
            </button>
        </div>
    );
};

export default Pagination;
