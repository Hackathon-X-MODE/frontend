import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TicketInformation from "./ticketInfo/TicketInformation";
import {useGetOrderByIdQuery, useGetTicketsByIdQuery} from "../../../redux/postamatApi";
import Loader from "../../loader/Loader";

const TicketMain = (props) => {

    const {ticketId} = useParams()
    const [ticket, setTicket] = useState()
    const [order, setOrder] = useState()

    const {data: ticketData, isSuccess: ticketSuccess, isFetching: ticketFetching} = useGetTicketsByIdQuery(+ticketId)
    const {data: orderData, isSuccess: orderSuccess, isFetching: orderFetching} = useGetOrderByIdQuery(ticketData?.orderId)

    useEffect(() => {
        setTicket(ticketData)
        setOrder(orderData)
    },[ticketFetching, orderFetching])

    if (!ticketSuccess) return  <Loader />
    console.log('TICKET ', ticket, 'ORDER', order)
    return(
        <div className={'w-full flex mx-[80px] mt-[45px] font-primary text-[18px]'}>
            <div className={'w-[65%] flex flex-col gap-[25px]'}>
                <TicketInformation ticket={ticket} order={order} />
            </div>
        </div>
    )
}

export default TicketMain;