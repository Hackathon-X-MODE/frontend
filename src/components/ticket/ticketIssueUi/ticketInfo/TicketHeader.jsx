import React from 'react';

const TicketHeader = ({ticket}) => {
    return(
        <div className={'px-[30px] py-[20px] flex items-center justify-between text-white font-primary mr-[77px]'}>
            {
                ticket &&
                <>
                    <div className={'flex flex-col gap-1'}>
                        <div className={''}>Номер обращения</div>
                        <div className={'flex items-center gap-[13px]'}>
                            <span className={'text-[32px]'}>#{ticket.id}</span>
                            <span className={'bg-[#3FC955] px-[18px] py-[2px] rounded-[15px]'}>{ticket.ticketStatus}</span>
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