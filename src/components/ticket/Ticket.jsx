import React, {useEffect, useState} from 'react';
import edit from "../../assets/ico/vendors/edit.svg";
import Loader from "../loader/Loader";
import {
    useConfirmTicketByIdMutation,
    useGetTicketsByIdQuery,
    useLazyGetCommentsByOrderIdQuery,
    useLazyGetOrderByIdQuery, useLazyGetVendorsByListQuery,
    useLazyGetVendorsByPostamatIdQuery
} from "../../redux/postamatApi";

const Ticket = (props) => {
    const { data: ticket = [], isLoading: ticketLoading, isSuccess: ticketSuccess } = useGetTicketsByIdQuery(2)
    const [getCommentsByOrderId, { data: comments = [], isLoading: commentsLoading, isSuccess: commentsSuccess }] = useLazyGetCommentsByOrderIdQuery()
    const  [getVendorsByPostamatId, {data: vendors = [], isLoading: vendorsLoading, isSuccess: vendorsSuccess}] = useLazyGetVendorsByPostamatIdQuery()
    const [getOrderById, {data: order = [], isLoading: orderLoading, isSuccess: orderSuccess }] = useLazyGetOrderByIdQuery()
    const [getVendorsByListQuery, {data: vendorsList = [], isLoading: vendorsListLoading, isSuccess: vendorsListSuccess }] = useLazyGetVendorsByListQuery()

    const [confirmTicketById, {isLoading: confirmLoading, isSuccess: confirmSuccess}] = useConfirmTicketByIdMutation()

    const [ticketData, setTicketData] = useState()
    //PUT PROBLEM OWNERS COMMENTID (NOT_PROCESSED!)
    const [solveData, setSolveData] = useState({
        "solve": [
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "problemOwners": [
                    "MARKET_PLACE"
                ],
            },
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa613213",
                "problemOwners": [
                    "MARKET_PLACE"
                ],
            },
            {
                "id": "3fa85f64-5717-4562-b3fc-2c963f66afa2342346",
                "problemOwners": [
                    "MARKET_PLACE"
                ],
            },
        ]
    })

    useEffect(() => {
        if (ticketSuccess) {
            getCommentsByOrderId(ticket[0].orderId)
            getOrderById(ticket[0].orderId)
            setTicketData(...ticket)

            if (commentsSuccess) {
                setTicketData((prevState) =>({
                    ...prevState,
                    coms: order
                }))
            }

            if (orderSuccess) {
                setTicketData((prevState) =>({
                    ...prevState,
                    ord: order
                }))
                getVendorsByPostamatId(order[0].postamatId)
                if (vendorsSuccess) {
                    setTicketData((prevState) =>({
                        ...prevState,
                        vend: vendors
                    }))
                    if (order[0].id === vendors[0].id) {
                        return
                    } else {
                        getVendorsByListQuery([order[0].vendorId, vendors[0].vendorId])

                        if (vendorsListSuccess) {
                            setTicketData((prevState) =>({
                                ...prevState,
                                vendrList: vendorsList
                            }))
                        }
                    }
                }
            }
        }
    }, [ticketSuccess, commentsSuccess, orderSuccess, vendorsSuccess, vendorsListSuccess])

    if (orderLoading) return <Loader />

    if (vendorsListSuccess) {
        console.log(ticketData)
    }

    return(
        <>
            <h1 className={'text-4xl text-white '}>TEST VERSION</h1>
            UI THERE
        </>
    )
}
export default Ticket;

