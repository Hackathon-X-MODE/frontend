import React from 'react';
import TicketHeader from "./TicketHeader";
import TicketContent from "./TicketContent";

const TicketInformation = (props) => {
    return(
        <div className={'w-full flex flex-col px-[30px] py-[20px] bg-[#5C5F7E] rounded-[15px]'}>
            <TicketHeader />
            <TicketContent />
        </div>
    )
}

export default TicketInformation;