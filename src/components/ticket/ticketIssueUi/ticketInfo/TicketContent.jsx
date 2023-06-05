import React from 'react';

const TicketContent = (props) => {
    return(
        <div className={'w-full flex justify-between items-center px-[30px] bg-[#21243A] text-[18px] font-primary'}>
            <div className={'w-1/2 flex flex-col gap-[15px]'}>
                <div className={'flex gap-[74px]'}>
                    <div className={'flex flex-col gap-[5px]'}>
                        <div>Номер заказа</div>
                    </div>
                </div>
            </div>
            <div className={'w-1/2'}></div>

        </div>
    )
}

export default TicketContent;