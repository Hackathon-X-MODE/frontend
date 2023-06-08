import React from 'react';
import DeliveryStatus from "./DeliveryStatus";
import OwnerInfo from "./OwnerInfo";
import PostamatInfo from "./PostamatInfo";


const TicketSideBar = ({order, vendor, vendorsList, vendors}) => {

    return(
        <>
            <DeliveryStatus order={order} />
            <OwnerInfo vendor={vendor} />
            <PostamatInfo vendorsList={vendorsList} vendors={vendors} />
        </>
    )
}

export default TicketSideBar;