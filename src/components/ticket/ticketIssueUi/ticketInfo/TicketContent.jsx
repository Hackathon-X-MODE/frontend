import React from 'react';

const TicketContent = ({order}) => {
    return(
        <div className={'w-full relative flex justify-between  px-[30px] py-[21px] bg-[#21243A] text-white text-[18px] font-primary'}>
            {
                order && <>
                    <div className={'w-1/2 flex flex-col gap-[20px]'}>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px] min-w-[132px] max-w-[133px]'}>
                                <div className={'text-[#6C7094]'}>Номер заказа</div>
                                <div className={'overflow-y-scroll'}>#{order?.externalId}</div>
                            </div>
                            <div className={'flex flex-col gap-[5px] min-w-[132px] max-w-[133px]'}>
                                <div className={'text-[#6C7094]'}>Сумма заказа</div>
                                <div className={'overflow-y-scroll'}>{order?.sum} ₽</div>
                            </div>
                        </div>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px] min-w-[132px] max-w-[133px]'}>
                                <div className={'text-[#6C7094]'}>Габариты</div>
                                <div className={'overflow-y-scroll'}>{order.meta?.width}х{order.meta?.height}х{order.meta?.depth}</div>
                            </div>
                            <div className={'flex flex-col gap-[5px] min-w-[132px] max-w-[133px]'}>
                                <div className={'text-[#6C7094]'}>Вес</div>
                                <div className={'overflow-y-scroll'}>{order.meta?.weight} грам</div>
                            </div>
                        </div>
                        <div className={'flex'}>
                            <div className={'flex flex-col gap-[5px] max-w-[280px]'}>
                                <div className={'text-[#6C7094]'}>Описание</div>
                                <div className={'overflow-y-scroll h-[46px]'}>{order?.description}</div>
                            </div>
                        </div>
                        <div className={'flex'}>
                            <div className={'flex flex-col gap-[5px] max-w-[280px]'}>
                                <div className={'flex gap-[10px]'}>
                                    <div className={'text-[#6C7094]'}>Срок</div>
                                    <div className={''}>-</div>
                                </div>
                                <div className={'flex gap-[10px]'}>
                                    <div className={'text-[#6C7094]'}>Поступление</div>
                                    <div className={''}>{order.dateHistory?.get ? new Date(order.dateHistory.get).toLocaleDateString() : '-' }</div>
                                </div>
                                <div className={'flex gap-[10px]'}>
                                    <div className={'text-[#6C7094]'}>Продление</div>
                                    <div className={''}>-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={'bg-white h-[90%] text-white left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border border-gray opacity-[10%] absolute'}/>
                    <div className={'w-1/2 px-[50px] flex flex-col gap-[20px]'}>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px]  max-w-[300px]'}>
                                <div className={'text-[#6C7094]'}>ФИО</div>
                                <div className={'overflow-y-scroll'}>{order.person?.fullName}</div>
                            </div>
                        </div>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px] min-w-[142px] max-w-[143px]'}>
                                <div className={'text-[#6C7094]'}>Дата рождения</div>
                                <div className={'overflow-y-scroll'}>{order.person?.date ? new Date(order.person.date).toLocaleDateString() : '-' }</div>
                            </div>
                            <div className={'flex flex-col gap-[5px] min-w-[132px] max-w-[133px]'}>
                                <div className={'text-[#6C7094]'}>Пол</div>
                                <div className={'overflow-y-scroll'}>{order.person?.sex}</div>
                            </div>
                        </div>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px]  max-w-[300px]'}>
                                <div className={'text-[#6C7094]'}>Телефон</div>
                                <div className={'overflow-y-scroll'}>{order.person?.phone}</div>
                            </div>
                        </div>
                        <div className={'flex gap-[74px]'}>
                            <div className={'flex flex-col gap-[5px]  max-w-[300px]'}>
                                <div className={'text-[#6C7094]'}>Email</div>
                                <div className={'overflow-y-scroll'}>{order.person?.email}</div>
                            </div>
                        </div>
                    </div>
                </>
            }

        </div>
    )
}

export default TicketContent;