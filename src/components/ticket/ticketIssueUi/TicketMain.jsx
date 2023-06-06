import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TicketInformation from "./ticketInfo/TicketInformation";
import {useGetCommentsByOrderIdQuery, useGetOrderByIdQuery, useGetTicketsByIdQuery} from "../../../redux/postamatApi";
import Loader from "../../loader/Loader";
import TicketDescription from "./ticketMl/TicketDescription";

const placeRef = {
    'POSTAMAT': `Технический отдел "Московский постомат"`,
    'MARKET_PLACE': `Направить в Маркетплэйс`
}

const TicketMain = (props) => {

    const {ticketId} = useParams()
    const [ticket, setTicket] = useState()
    const [comments, setComments] = useState()
    const [order, setOrder] = useState()

    const {data: ticketData, isSuccess: ticketSuccess, isFetching: ticketFetching} = useGetTicketsByIdQuery(+ticketId)
    const {data: orderData, isSuccess: orderSuccess, isFetching: orderFetching} = useGetOrderByIdQuery(ticketData?.orderId)
    const {data: commentsData, isFetching: commentsFetching} = useGetCommentsByOrderIdQuery(orderData?.id)

    useEffect(() => {
        setTicket(ticketData)
        setOrder(orderData)
        setComments(
            commentsData?.map((commentary) => {
                const commentaryTicket = ticketData.comments.find(ticketCom => ticketCom.id === commentary.id )

                return {
                    ...commentary,
                    commentTypes: Object.entries(commentary.commentTypes).map(([k, v]) => {
                        return {
                            name: k,
                            value: v
                        }
                    }),
                    statusInTicket: commentaryTicket?.status,
                    problemOwners: commentaryTicket?.problemOwners?.map(v => {
                        return {
                            value: v,
                            label: placeRef[v]
                        }
                    })
                }
            })
        )
    },[ticketFetching, orderFetching, commentsFetching])

    if (!ticketSuccess) return  <Loader />
    // console.log('TICKET ', ticket, 'ORDER', order)
    // console.log(commentsData)
    return(
        <div className={'w-full flex mx-[80px] mt-[45px] mb-[20px] font-primary text-[18px]'}>
            <div className={'w-[65%] flex flex-col gap-[25px]'}>
                <TicketInformation ticket={ticket} order={order} />
                <TicketDescription ticket={ticket} order={order} comments={comments} />
            </div>
        </div>
    )
}

export default TicketMain;