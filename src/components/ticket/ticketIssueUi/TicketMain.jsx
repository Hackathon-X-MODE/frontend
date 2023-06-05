import React from 'react';
import {useParams} from "react-router-dom";
import TicketInformation from "./ticketInfo/TicketInformation";

const TicketMain = (props) => {

    const {ticketId} = useParams()

    return(
        <div className={'w-full flex mx-[80px] mt-[45px] font-primary text-[18px]'}>
            <div className={'w-3/4 flex flex-col gap-[25px]'}>
                <TicketInformation />
            </div>
        </div>
    )
}

export default TicketMain;