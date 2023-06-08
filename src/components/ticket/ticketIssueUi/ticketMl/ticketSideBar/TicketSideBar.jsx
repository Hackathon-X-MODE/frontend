import React from 'react';
import DeliveryStatus from "./DeliveryStatus";
import OwnerInfo from "./OwnerInfo";


const TicketSideBar = ({order, vendor}) => {

    return(
        <>
            <DeliveryStatus order={order} />
            <OwnerInfo vendor={vendor} />
        </>
    )
}

export default TicketSideBar;