import React from 'react';
import {default as ReactSelect} from "react-select";
import Option from "../form/CustomInput";
import {useState} from "react";



const Delivery = (props) => {
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
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };

    const moveToPlace = [
        { value: 'MARKET_PLACE', label: 'Направить в Маркетплэйс' },
        { value: 'POSTAMAT', label: `Технический отдел "Московский постомат"` },
    ]

    const [selectState, setSelectState] = useState()


    const handleReactSelectChange = (e, id) => {
        console.log(e)
        setSelectState(e)
        props.handleObjectDelivery(id, e.map(item => item.value))
    }
    // console.log(selectState)

    return(
        <div className={'flex flex-col mt-[25px] gap-2'}>
            <span>Место отправки</span>
            <ReactSelect
                name={''}
                isMulti
                placeholder={'Выберете место отправки'}
                options={moveToPlace}
                components={{
                    Option
                }}
                styles={customStyles}
                onChange={(e)=>handleReactSelectChange(e, props.comment)}
                value={selectState}
            />
        </div>
    )
}

export default Delivery;