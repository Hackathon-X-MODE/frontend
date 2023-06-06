import React from 'react';
import {default as ReactSelect} from "react-select";
import Option from "../../../../form/CustomInput";

const reactSelectValues = [
    {value: 'PRODUCT_DESCRIPTION', label: 'Описание товара на сайте интернет-магазина'},
    {value: 'GETTING_ORDER', label: 'Получение заказа'},
    {value: 'GOT_ORDER', label: 'Полученный заказ'},
    {value: 'PRODUCT', label: 'Товар'},
    {value: 'POST_BOX', label: 'Работа постамата'},
    {value: 'DELIVERY', label: 'Доставка'},
    {value: 'NOTIFICATION', label: 'Уведомления'},
    {value: 'OTHER', label: 'Иное'},
    {value: 'PREPARE_ORDER', label: 'Оформление заказа'},
]

const Editor = ({comment}) => {
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
            border: "1px solid #5C5F7E",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
    };
    const reactSelectSingleDefaultOption = comment.commentTypes.map((commentTypeName) => {
        return reactSelectValues.find((category) => commentTypeName.name === category.value)
    })
    console.log(reactSelectSingleDefaultOption)
    return(
        <div className={'w-full  flex p-2 text-white font-primary pl-[120px]'}>
            <div className={'w-4/12 flex flex-col'}>
                {
                    reactSelectSingleDefaultOption.map((item,idx) => {
                        return(
                            <div key={`${item.value}_${idx}`}   className={'flex flex-col mt-[10px] '}>
                                <span className={'text-[#6C7094]'}>Категория</span>
                                <ReactSelect
                                    name={'category'}
                                    options={reactSelectValues}
                                    components={{
                                        Option
                                    }}
                                    defaultValue={item}
                                    styles={customStyles}
                                />
                            </div>
                        )
                    })
                }
                {/*{*/}
                {/*    comment.commentTypes.map((category) => {*/}
                {/*        return(*/}
                {/*            <div  className={'flex flex-col mt-[10px] border-b border-b-gray-500'}>*/}
                {/*                <span className={'text-[#6C7094]'}>Категория</span>*/}
                {/*                <span>{reference[category.name]}</span>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </div>
            <div className={'w-8/12'}>
                {/*{*/}
                {/*    comment.commentTypes.map((category) => {*/}
                {/*        return(*/}
                {/*            <div  className={'w-full flex flex-col mt-[10px] border-b border-b-gray-500'}>*/}
                {/*                <span className={'text-[#6C7094]'}>Подкатегория</span>*/}
                {/*                <span>{category.value.length === 0 ? '-' : category.value.map(v => reference[v]).join(', ')}</span>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </div>
        </div>
    )
}

export default Editor;