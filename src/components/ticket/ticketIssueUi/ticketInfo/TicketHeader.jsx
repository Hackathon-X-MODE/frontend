import React from 'react';

const TicketHeader = (props) => {
    return(
        <div className={'flex items-center justify-between text-white font-primary mr-[77px]'}>
            <div className={'flex flex-col gap-1'}>
                <div className={''}>Номер обращения</div>
                <div className={'flex items-center gap-[13px]'}>
                    <span className={'text-[32px]'}>#1</span>
                    <span className={'bg-[#3FC955] px-[18px] py-[2px] rounded-[15px]'}>Открыт</span>
                </div>
            </div>
            <div className={'flex gap-[50px]'}>
                <div className={'flex flex-col gap-[10px]'}>
                    <div>Дата обращения</div>
                    <div>20.05.2023</div>
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                    <div>Срок обращения</div>
                    <div>27.05.2023</div>
                </div>
            </div>
        </div>
    )
}

export default TicketHeader;