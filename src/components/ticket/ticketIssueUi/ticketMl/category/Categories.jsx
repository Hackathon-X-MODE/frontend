import React, {useState} from 'react';
import Editor from "./Editor";




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

const Categories = ({comment, order, selectHandler, activeBtn}) => {
    const [active, setActive] = useState(false)


    const handleActiveBtn = (e, id) => {
        setActive(!active)
        activeBtn(e, id)
    }

    // console.log(comment)
    return(
        <div className={'flex flex-col'}>
            {
                active ?
                    <>
                        <Editor comment={comment} selectHandler={selectHandler} reference={reference} />
                    </>
                    : <>
                        <div className={'w-full  flex p-2 text-white font-primary pl-[120px]'}>
                            <div className={'w-4/12'}>
                                {
                                    comment.commentTypes.map((category, idx) => {
                                        return(
                                            <div key={`${idx}_${category.name}`}   className={'flex flex-col mt-[10px] border-b border-b-gray-500'}>
                                                <span className={'text-[#6C7094]'}>Категория</span>
                                                <span>{reference[category.name]}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={'w-8/12'}>
                                {
                                    comment.commentTypes.map((category, idx) => {
                                        return(
                                            <div key={`${idx}_${new Date()}`}  className={'w-full flex flex-col mt-[10px] border-b border-b-gray-500'}>
                                                <span className={'text-[#6C7094]'}>Подкатегория</span>
                                                <span>{category.value.length === 0 ? '-' : category.value.map(v => reference[v]).join(', ')}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
            }
            <div className={'pl-[120px] mt-[20px]'}>
                <button onClick={(e) => handleActiveBtn(e, comment.id)} className={'px-[33px] py-[18px] border rounded-[15px]'}>{active ? 'Сохранить' : 'Редактировать'}</button>
            </div>
        </div>
    )
}

export default Categories;