import React, {useEffect, useState} from 'react';
import {default as ReactSelect} from "react-select";
import Option from "./CustomInput";

const productDesc = [
    { value: '', label: '' },
]
const prepareOrder = [
    { value: 'SELECT_POSTAMAT', label: 'Выбор способа доставки в постамат' },
    { value: 'SEARCH_POSTAMAT_AT_HOUSE', label: 'Поиск постамата в конкретном подъезде дома' },
]

const gettingOrder = [
    { value: 'PAY_ORDER', label: 'Оплата заказа' },
    { value: 'OPEN_POSTAMAT', label: 'Открытие ячейки' },
]

const gotOrder = [
    { value: 'PACKING', label: 'Упаковка' },
    { value: 'COMPLETENESS', label: 'Комплектность' },
]

const product = [
    { value: 'QUALITY', label: 'Качество' },
    { value: 'DESCRIPTION', label: 'Несоответствие описанию на сайте' },
]

const postBox = [
    { value: 'WORK_POSTAMAT', label: 'Работа постамата' },
    { value: 'LOCATION_POSTAMAT', label: 'Местоположение постамата' },
    { value: 'VIEW_POSTAMAT', label: 'Внешний вид постамата' },
]

const delivery = [
    { value: 'DEADLINE', label: 'Сроки доставки' },
    { value: 'COAST_DELIVERY', label: 'Стоимость доставки' },
    { value: 'DELIVERY_GUY_REPORT', label: 'Жалоба на работу курьеров' },
]

const notification = [
    { value: 'CONFIRM_NOTIFICATION', label: 'Уведомление об оформленном заказе' },
    { value: 'DELIVERY_NOTIFICATION', label: 'Уведомление о дате доставки' },
    { value: 'READY_NOTIFICATION', label: 'Уведомление о готовности заказа к получению' },
]

const other = [
    { value: '', label: '' },
]


const CustomSelect = ({nameObject, selectIdx, multiselectIdx, objectFunc, arrayValues}) => {

    const [reactSelectState, setReactSelectState] = useState()
    const [reactMultiSelectState, setReactMultiSelectState] = useState()
    const [reactMultiSelectValues, setReactMultiSelectValues] = useState()

    const reactSelectValues = [
        { value: 'PRODUCT_DESCRIPTION', label: 'Описание товара на сайте интернет-магазина' },
        { value: 'GETTING_ORDER', label: 'Получение заказа' },
        { value: 'GOT_ORDER', label: 'Полученный заказ' },
        { value: 'PRODUCT', label: 'Товар' },
        { value: 'POST_BOX', label: 'Работа постамата' },
        { value: 'DELIVERY', label: 'Доставка' },
        { value: 'NOTIFICATION', label: 'Уведомления' },
        { value: 'OTHER', label: 'Иное' },
        { value: 'PREPARE_ORDER', label: 'Оформление заказа' },
    ]

    useEffect(() => {


        // console.log(reactMultiSelectValues)
        switch (reactMultiSelectValues ? reactMultiSelectValues : arrayValues){
            case 'PRODUCT_DESCRIPTION':
                setReactMultiSelectValues(productDesc)
                break
            case 'GETTING_ORDER':
                setReactMultiSelectValues(gettingOrder)
                break
            case 'GOT_ORDER':
                setReactMultiSelectValues(gotOrder)
                break
            case 'PRODUCT':
                setReactMultiSelectValues(product)
                break
            case 'POST_BOX':
                console.log('POSTBOX')
                setReactMultiSelectValues(postBox)
                break
            case 'DELIVERY':
                setReactMultiSelectValues(delivery)
                break
            case 'NOTIFICATION':
                setReactMultiSelectValues(notification)
                break
            case 'OTHER':
                setReactMultiSelectValues(other)
                break
            case 'PREPARE_ORDER':
                setReactMultiSelectValues(prepareOrder)
                break
            default:
                break

        }

    },[reactSelectState])


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

    const handleReactSelect = (value) => {

        // console.log({[k]: ''})
        setReactSelectState(value)
        setReactMultiSelectState(value)
        // console.log(reactMultiSelectValues)
        objectFunc(value, selectIdx)
    }

    const handleMultiSelect = (value) => {
        objectFunc()
        // setReactMultiSelectState((prevState) => ({
        //     ...prevState,
        //     value
        // }))
    }
    return(
        <>
            {
                arrayValues
                    ?
                    reactMultiSelectValues &&
                    <div className={'flex w-5/6 gap-1 flex-col py-[10px]'}>
                        <span className={'text-white'}>Подкатегории</span>
                        <ReactSelect
                            name={'reactSelectValues'}
                            isMulti
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            options={reactMultiSelectValues}
                            components={{
                                Option
                            }}
                            styles={customStyles}
                            // onChange={(e) => handleMultiSelect(e.value)}
                            // value={reactMultiSelectValues
                            //     ?
                            //     reactMultiSelectValues.filter((i) => {
                            //         return i
                            //     } )
                            //     :
                            //     reactMultiSelectValues.filter((i) => {
                            //         // console.log(i)
                            //         return nameObject.map(chValue => i !== chValue)
                            //     })}
                        />
                    </div>
                    :
                    <div className={'flex w-5/6 gap-1 flex-col py-[10px]'}>
                        <span className={'text-white'}>Категории</span>
                        <ReactSelect
                            name={nameObject}
                            options={reactSelectValues}
                            components={{
                                Option
                            }}
                            styles={customStyles}
                            onChange={(e) => handleReactSelect(e.value)}
                            value={reactSelectState ? reactSelectValues.filter((i) =>(i.value === reactSelectState) ) : reactSelectValues.filter(i => i.value === nameObject) }
                        />
                    </div>
            }
        </>
    )
}

export default CustomSelect;