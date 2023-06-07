import React, {useRef} from 'react';
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

const map = {
    "PRODUCT_DESCRIPTION": [],
    "PREPARE_ORDER": [
        "SELECT_POSTAMAT",
        "SEARCH_POSTAMAT_AT_HOUSE"
    ],
    "GETTING_ORDER": [
        "PAY_ORDER",
        "OPEN_POSTAMAT"
    ],
    "GOT_ORDER": [
        "PACKING",
        "COMPLETENESS"
    ],
    "PRODUCT": [
        "QUALITY",
        "DESCRIPTION"
    ],
    "POST_BOX": [
        "WORK_POSTAMAT",
        "LOCATION_POSTAMAT",
        "VIEW_POSTAMAT"
    ],
    "DELIVERY": [
        "DEADLINE",
        "COAST_DELIVERY",
        "DELIVERY_GUY_REPORT"
    ],
    "NOTIFICATION": [
        "CONFIRM_NOTIFICATION",
        "DELIVERY_NOTIFICATION",
        "READY_NOTIFICATION"
    ],
    "OTHER": []
}

const Editor = ({comment, selectHandler, references}) => {
    const reference = {
        PRODUCT_DESCRIPTION: 'Описание товара на сайте интернет-магазина',
        GETTING_ORDER: 'Получение заказа',
        GOT_ORDER: 'Полученный заказ',
        PRODUCT: 'Товар',
        POST_BOX: 'Работа постамата',
        DELIVERY: 'Доставка',
        NOTIFICATION: 'Уведомления',
        OTHER: 'Иное',
        PREPARE_ORDER: 'Оформление заказа',
        SELECT_POSTAMAT: 'Выбор способа доставки в постамат',
        SEARCH_POSTAMAT_AT_HOUSE: 'Поиск постамата в конкретном подъезде дома',
        PAY_ORDER: 'Оплата заказа',
        OPEN_POSTAMAT: 'Открытие ячейки',
        PACKING: 'Упаковка',
        COMPLETENESS: 'Комплектность',
        QUALITY: 'Качество',
        DESCRIPTION: 'Несоответствие описанию на сайте',
        WORK_POSTAMAT: 'Работа постамата',
        LOCATION_POSTAMAT: 'Местоположение постамата',
        VIEW_POSTAMAT: 'Внешний вид постамата',
        DEADLINE: 'Сроки доставки',
        COAST_DELIVERY: 'Стоимость доставки',
        DELIVERY_GUY_REPORT: 'Жалоба на работу курьеров',
        CONFIRM_NOTIFICATION: 'Уведомление об оформленном заказе',
        DELIVERY_NOTIFICATION: 'Уведомление о дате доставки',
        READY_NOTIFICATION: 'Уведомление о готовности заказа к получению'
    }
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: '#fff',
            backgroundColor: "#21243A",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,

            backgroundColor: "#5C5F7E",
            height: '50px',
            borderRadius: "15px",
            overflowY: 'scroll',
            border: "1px solid #5C5F7E",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
    };
    const reactSelectSingleDefaultOption = comment.commentTypes.map((commentTypeName) => {
        return reactSelectValues.find((category) => commentTypeName.name === category.value)
    })
    const reactMultyDefaultOption = comment.commentTypes.map((commentTypeName) => {
        return commentTypeName.value.flatMap(name => {
            // console.log(name)
            return{
                value: name,
                label: reference[name]
            }
        })
    })

    const defaultTypes  = comment.commentTypes.map(type => map[type.name])
    const defTypes = defaultTypes.map((item) => {
        return  item.map(name => {
            return {
                value: name,
                label: reference[name]
            }
        })})

    return(
        <div className={'w-full  flex p-2 text-white font-primary pl-[120px]'}>
            <div className={'w-4/12 flex flex-col'}>
                {
                    reactSelectSingleDefaultOption.map((item,idx) => {
                        return(
                            <div  key={`${item.value}_${idx}`}   className={'flex flex-col mt-[10px] '}>
                                <span className={'text-[#6C7094]'}>Категория</span>
                                <ReactSelect
                                    name={'category'}
                                    options={reactSelectValues}
                                    components={{
                                        Option
                                    }}
                                    defaultValue={item}
                                    styles={customStyles}
                                    onChange={(e) => selectHandler(e, comment.id, item, 'single')}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className={'w-8/12'}>
                {
                    reactMultyDefaultOption.map((item,idx) => {
                        // console.log('EDIROT',item)
                        return(
                            <div key={`${item.label}_${idx}`}   className={'flex flex-col mt-[10px] '}>
                                <span className={'text-[#6C7094]'}>Подкатегория</span>
                                <ReactSelect
                                    isMulti={true}
                                    options={defTypes[idx]}
                                    components={{
                                        Option
                                    }}
                                    value={item}
                                    styles={customStyles}
                                    onChange={(e) => selectHandler(e, comment.id, item)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Editor;