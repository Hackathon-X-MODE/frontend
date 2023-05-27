import React from 'react';
import {default as ReactSelect} from "react-select";
import Option from "../form/CustomInput";


const Delivery = ({problemOwners, update}) => {
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: '#fff',
            backgroundColor: "#21243A",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,

            backgroundColor: "#5C5F7E",
            height: '5px',
            borderRadius: "15px",
            overflow: 'hidden',
            // padding: "10px",
            border: "1px solid #5C5F7E",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
    };
    console.log("AAA", problemOwners)
    return (
        <div className={'flex flex-col mt-[25px] gap-2'}>
            <span>Место отправки</span>
            <ReactSelect
                name={''}
                isMulti
                placeholder={'Выберете место отправки'}
                options={
                    [
                        {value: 'POSTAMAT', label: `Технический отдел "Московский постомат"`},
                        {value: 'MARKET_PLACE', label: 'Направить в Маркетплэйс'},
                    ]
                }
                components={{
                    Option
                }}
                styles={customStyles}
                onChange={(e) => update(e)}
                value={problemOwners}
            />
        </div>
    )
}

export default Delivery;