import React from 'react';
import TicketDescriptionHeader from "./TicketDescriptionHeader";
import TicketComment from "./TicketComment";

const TicketDescription = ({ticket, order, comments, selectHandler, activeBtn}) => {
    // console.log('hw',comments)
    return(
        <div className={'w-full flex flex-col  bg-[#5C5F7E] rounded-[15px] font-primary text-white text-[18px]'}>
            <div className={'px-[30px] py-[20px] flex items-center justify-between text-white font-primary mr-[77px]'}>
                <div className={'text-[32px]'}>История отзыва</div>
            </div>
            {
                ticket &&
                <div className={'w-full px-[30px] py-[40px] bg-[#21243A] flex flex-col gap-[20px] items-center justify-between text-white font-primary mr-[77px] rounded-bl-[15px] rounded-br-[15px]'}>
                    {
                        comments?.map(comment => <TicketComment activeBtn={activeBtn} key={comment.id} ticket={ticket} order={order} comment={comment} selectHandler={selectHandler} />)
                    }
                </div>
            }
        </div>
    )
}

export default TicketDescription;