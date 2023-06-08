import React, {useEffect, useState} from 'react';
import CommentsHeader from "./commentsHeader/CommentsHeader";
import CommentsStatus from "./CommentsStatus";
import CommentsPagination from "./CommentsPagination";
import CommentsBody from "./commentsBody/CommentsBody";
import {useGetVendorsQuery} from "../../redux/postamatApi";
import Loader from "../loader/Loader";

const CommentsTable = (props) => {
    const [status, setStatus] = useState('')
    const [comments, setComments] = useState([
        {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            source: "QR",
            orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            mood: "POSITIVE",
            rate: 2,
            comment: "Hello world asdlkajsd jasdjaskldjaklsdj laksdjl kasjdlkajs ld",
            createDate: "2023-06-08T13:58:39.775Z"
        }
    ])
    const {data: vendorsData, isFetching: vendorsFetching, isSuccess: vendorsSuccess} = useGetVendorsQuery()

    useEffect(() => {
        if (vendorsSuccess) {
            console.log(vendorsData)
            console.log(comments)
        }
    },[vendorsFetching])

    if (!vendorsSuccess) return  <Loader />
    return(
        <div className={'w-full relative  flex flex-col  mt-[50px] font-primary'}>
            <div className={'mx-[70px] w-5/6 px-[70px] flex flex-col h-[800px]  flex flex bg-[#21243A] rounded-[15px] overflow-y-scroll rounded-tr-[0px]'}>
                <CommentsHeader />
                <CommentsBody comments={comments} />
                {/*{*/}
                {/*    initialData.length !== 0 && <TicketBody tickets={initialData} />*/}
                {/*}*/}
                <CommentsStatus />
            </div>
            <CommentsPagination />
        </div>

    )
}

export default CommentsTable;