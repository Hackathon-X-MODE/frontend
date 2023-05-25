import {default as ReactSelect} from "react-select";
import Option from "./CustomInput";
import React from "react";

const prepareOrder = [
    {value: 'SELECT_POSTAMAT', label: 'Выбор способа доставки в постамат'},
    {value: 'SEARCH_POSTAMAT_AT_HOUSE', label: 'Поиск постамата в конкретном подъезде дома'},
    {value: 'PAY_ORDER', label: 'Оплата заказа'},
    {value: 'OPEN_POSTAMAT', label: 'Открытие ячейки'},
    {value: 'PACKING', label: 'Упаковка'},
    {value: 'COMPLETENESS', label: 'Комплектность'},
    {value: 'QUALITY', label: 'Качество'},
    {value: 'DESCRIPTION', label: 'Несоответствие описанию на сайте'},
    {value: 'WORK_POSTAMAT', label: 'Работа постамата'},
    {value: 'LOCATION_POSTAMAT', label: 'Местоположение постамата'},
    {value: 'VIEW_POSTAMAT', label: 'Внешний вид постамата'},
    {value: 'DEADLINE', label: 'Сроки доставки'},
    {value: 'COAST_DELIVERY', label: 'Стоимость доставки'},
    {value: 'DELIVERY_GUY_REPORT', label: 'Жалоба на работу курьеров'},
    {value: 'CONFIRM_NOTIFICATION', label: 'Уведомление об оформленном заказе'},
    {value: 'DELIVERY_NOTIFICATION', label: 'Уведомление о дате доставки'},
    {value: 'READY_NOTIFICATION', label: 'Уведомление о готовности заказа к получению'},
]


const SelectorMulty = ({all, selected, callable}) => {

    const ref = all.map(v => {
        return prepareOrder.find(p => p.value === v)
    })

    return (
        <>
            {
                <div className={'w-7/12 flex flex-col'}>
                    {
                        <div className={'flex w-5/6 gap-1 flex-col py-[10px]'}>
                            <span className={'text-white'}>Подкатегории</span>
                            <ReactSelect
                                name={'reactSelectValues'}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={ref}
                                components={{
                                    Option
                                }}
                                value={
                                    ref.filter(refCurrent => selected.includes(refCurrent.value))
                                }
                                onChange={e=> callable(e.map(e=>e.value))}
                                //styles={customStyles}
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
                    }
                </div>
            }
        </>
    )
}

export default SelectorMulty