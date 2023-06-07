import React from 'react';

const TicketHeader = ({ticket}) => {
    const ticketStatusLabels = {
        'OPEN': {
            name: 'Открыт', bg: 'bg-blue-500'
        },
        'PENDING': {
            name: 'В обработке', bg: 'bg-yellow-500'
        },
        'COMPLETED': {
            name: 'Выполнен', bg: 'bg-green-500'
        },
        'CANCELED': {
            name: 'Отменен', bg: 'bg-gray-500'
        }
        // {'OPEN': name: 'Открыт',}
    }
    return(
        <div className={'px-[30px] py-[20px] flex items-center justify-between text-white font-primary mr-[77px]'}>
            {
                ticket &&
                <>
                    <div className={'flex flex-col gap-1'}>
                        <div className={''}>Номер обращения</div>
                        <div className={'flex items-center gap-[13px]'}>
                            <span className={'text-[32px]'}>#{ticket.id}</span>
                            {
                                Object.entries(ticketStatusLabels).map(([k, v],idx) => {
                                    if (k === ticket.ticketStatus) {
                                        return (
                                            <span key={`asd_${idx}`}
                                                  className={`${ticketStatusLabels[k].bg} px-[18px] py-[2px] rounded-[15px]`}>{ticketStatusLabels[k].name}</span>
                                        )
                                    }
                                    return null
                                })
                            }
                        </div>
                    </div>
                    <div className={'flex gap-[50px]'}>
                        <div className={'flex flex-col gap-[10px]'}>
                            <div>Дата обращения</div>
                            <div>{new Date(ticket.createDate).toLocaleDateString()}</div>
                        </div>
                        <div className={'flex flex-col gap-[10px]'}>
                            <div>Срок обращения</div>
                            <div>{new Date(ticket.deadline).toLocaleDateString()}</div>
                        </div>
                    </div>
                </>

            }
        </div>
    )
}

export default TicketHeader;