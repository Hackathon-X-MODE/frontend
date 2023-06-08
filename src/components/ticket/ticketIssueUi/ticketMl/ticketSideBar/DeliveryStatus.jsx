import React from 'react';
import moment from "moment";
import elipse from "../../../../../assets/ico/ticket/elipse.svg";

const DeliveryStatus = ({order}) => {
    const deliveryStatus = {
        'Создан': order?.dateHistory['create'],
        'Заказ обработан': order?.dateHistory['assembling'],
        'Передан в доставку': order?.dateHistory['send'],
        'Заказ доставлен': order?.dateHistory['receive'],
        'Вручен': order?.dateHistory['get'],
    }
    return(
        <div className={'h-[535px] bg-[#21243A] text-white px-[29px] py-[30px] rounded-[15px]'}>
            <h1 className={'text-white text-[32px]'}>Статус доставки</h1>
            <div className={'flex items-start flex-col gap-[25px] mt-[25px] '}>
                {
                    Object.entries(deliveryStatus).map(([k, v], idx) => {
                        moment.locale('ru-RU')
                        if (v !== null) {
                            return (
                                <div className={''} key={idx}>
                                    {
                                        deliveryStatus[k] &&
                                        <div className={'flex gap-[16px] items-start h-[40px]'}>
                                            <img src={elipse}/>
                                            <div className={'flex-col flex'}>
                                                <span>{k}</span>
                                                <span
                                                    className={'text-[#6C7094]'}>{moment(deliveryStatus[k]).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        } else return  null
                    })
                }
            </div>
        </div>
    )
}

export default DeliveryStatus;