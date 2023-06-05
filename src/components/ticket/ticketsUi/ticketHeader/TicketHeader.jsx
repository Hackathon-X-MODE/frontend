import React from 'react';

const TicketHeader = (props) => {
    return(
        <div className={'sticky top-0 bg-[#21243A] z-10 flex w-full justify-around  gap-2  text-white text-[18px] px-[30px] py-[24px]'}>
             <div className={'w-1/4 text-center'}>Номер</div>
             <div className={'w-1/4 text-center'}>Вендор</div>
             <div className={'w-1/4 text-center'}>Дата обращения</div>
             <div className={'w-1/4 text-center'}>Срок обращения</div>
        </div>
    )
}

export default TicketHeader;