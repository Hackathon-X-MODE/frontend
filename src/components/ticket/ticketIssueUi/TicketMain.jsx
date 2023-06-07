import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TicketInformation from "./ticketInfo/TicketInformation";
import {
    useConfirmTicketByIdMutation,
    useGetCommentsByOrderIdQuery,
    useGetOrderByIdQuery,
    useGetTicketsByIdQuery,
    useUpdateCommentsMutation
} from "../../../redux/postamatApi";
import Loader from "../../loader/Loader";
import TicketDescription from "./ticketMl/TicketDescription";

const placeRef = {
    'POSTAMAT': `Технический отдел "Московский постомат"`,
    'MARKET_PLACE': `Направить в Маркетплэйс`
}

const map = {
    "PRODUCT_DESCRIPTION": [],
    "PREPARE_ORDER": [
        "SELECT_POSTAMAT",
        "SEARCH_POSTAMAT_AT_HOUSE"
    ],
    "GETTING_ORDER": [
        "PAY_ORDER",
        "OPEN_POSTAMAT"
    ],
    "GOT_ORDER": [
        "PACKING",
        "COMPLETENESS"
    ],
    "PRODUCT": [
        "QUALITY",
        "DESCRIPTION"
    ],
    "POST_BOX": [
        "WORK_POSTAMAT",
        "LOCATION_POSTAMAT",
        "VIEW_POSTAMAT"
    ],
    "DELIVERY": [
        "DEADLINE",
        "COAST_DELIVERY",
        "DELIVERY_GUY_REPORT"
    ],
    "NOTIFICATION": [
        "CONFIRM_NOTIFICATION",
        "DELIVERY_NOTIFICATION",
        "READY_NOTIFICATION"
    ],
    "OTHER": []
}

const TicketMain = (props) => {

    const {ticketId} = useParams()
    const [ticket, setTicket] = useState()
    const [comments, setComments] = useState()
    const [order, setOrder] = useState()

    const {data: ticketData, isSuccess: ticketSuccess, isFetching: ticketFetching} = useGetTicketsByIdQuery(+ticketId)
    const {data: orderData, isSuccess: orderSuccess, isFetching: orderFetching} = useGetOrderByIdQuery(ticketData?.orderId)
    const {data: commentsData, isFetching: commentsFetching} = useGetCommentsByOrderIdQuery(orderData?.id)
    const [updateComments, {isSuccess: updateCommentsSuccess}] = useUpdateCommentsMutation()
    const [confirmTicketById, {isLoading: confirmLoading, isSuccess: confirmSuccess}] = useConfirmTicketByIdMutation();

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

    const handleSelect = (item, id, prevValue, type ) => {
        if (type === 'single') {

            const allComments = [...comments]
            const idx = allComments.findIndex(comment => comment.id === id)
            const com = {...allComments[idx]}
            const isValid = com.commentTypes.find((itm) => itm.name === item.value)

            if (isValid) {
                setComments(allComments)
            } else {
                const prevType = com.commentTypes.findIndex(i => i.name === prevValue.value)
                com.commentTypes[prevType] = {
                    name: item.value,
                    value: []
                }
                setComments(allComments)
            }

        } else if (type === 'multy') {

            const mapValue = item.length <= 0 ? prevValue : item
            const allComments = [...comments]
            const idx = allComments.findIndex(comment => comment.id === id)
            const com = {...allComments[idx]}
            const category = mapValue.map(val => {
                for(const prop in map) {
                    if (map[prop].includes(val.value)) {
                        return prop
                        break
                    }
                }
            })[0]

            const currentCategory = com.commentTypes.findIndex(i => i.name === category)
            if (currentCategory === -1) return
            const values = item.map(i => i.value)
            com.commentTypes[currentCategory] = {
                name: category,
                value: values
            }
            setComments(allComments)
        } else if(type === 'delivery') {
            const allComments = [...comments]
            const idx = allComments.findIndex(comment => comment.id === id)
            allComments[idx].problemOwners = item
            setComments(allComments)
        }
    }

    const handleActiveBtn = async (e, id) => {

        if (e.target.innerText === 'Сохранить') {
            console.log(id)
            const forUpdate = comments.filter(comment => comment.id === id)[0];
            await updateComments({
                body: {
                    commentTypesSet: forUpdate.commentTypes.flatMap((item) => [item.name, ...item.value])
                },
                id: forUpdate.id
            })
        }

    }

    const confirm = async() => {
        const solveData = ticketData.comments
            .filter(comment=>{
                return comment.status === 'NOT_PROCESSED'
            })
            .map(comment => {

                return {
                    id: comment.id,
                    problemOwners: comments.find(cum => cum.id === comment.id).problemOwners.map(v=> v.value)
                }
            })

        const sl = {
            solve: solveData
        }

        await confirmTicketById({id: ticketData.id, body: sl})
    }


    if (!ticketSuccess) return  <Loader />
    return(
        <div className={'w-full flex mx-[80px] mt-[45px] mb-[20px] font-primary text-[18px]'}>
            <div className={'w-[65%] flex flex-col gap-[25px]'}>
                <TicketInformation ticket={ticket} order={order} />
                <TicketDescription ticket={ticket} order={order} comments={comments} confirm={confirm} selectHandler={handleSelect} activeBtn={handleActiveBtn}  />
            </div>
        </div>
    )
}

export default TicketMain;