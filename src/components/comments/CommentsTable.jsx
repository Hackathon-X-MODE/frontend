import React, {useEffect, useState} from 'react';
import CommentsHeader from "./commentsHeader/CommentsHeader";
import CommentsStatus from "./CommentsStatus";
import CommentsPagination from "./CommentsPagination";
import CommentsBody from "./commentsBody/CommentsBody";
import {useGetCommentsQuery, useGetVendorsQuery} from "../../redux/postamatApi";
import Loader from "../loader/Loader";

const CommentsTable = (props) => {
    const [status, setStatus] = useState('')
    const [page, setPage] = useState(0)
    const [comments, setComments] = useState([])
    const {data: vendorsData, isFetching: vendorsFetching, isSuccess: vendorsSuccess} = useGetVendorsQuery()
    const {data: commentsData, isSuccess: commentsSuccess, isFetching: commentsFetching} = useGetCommentsQuery({page: page})

    useEffect(() => {
        if (commentsSuccess && vendorsSuccess) {
            const coms = [...commentsData.content]
            const comms = coms.map((com) => {
                // console.log(com)
                return {
                    comment: com,
                    name: vendorsData.find(id => id.id === com.vendorId).name
                }
            })
            setComments(comms)
        }
    },[vendorsFetching, commentsFetching, page])

    const handlePage = (type) => {
        if (type === 'next' && comments.length === 20) {
            setPage((prevPage) => prevPage + 1)
        } else if( type === 'prev' && page !== 0) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    if (!vendorsSuccess) return  <Loader />
    if (commentsFetching) return <Loader />

    console.log(comments)
    return(
        <div className={'w-full relative  flex flex-col  mt-[50px] font-primary'}>
            <div className={'mx-[70px] w-5/6 px-[70px] flex flex-col h-[800px]  flex flex bg-[#21243A] rounded-[15px] overflow-y-scroll rounded-tr-[0px]'}>
                <CommentsHeader />
                {
                    comments.length !== 0 && <CommentsBody comments={comments} />
                }
                <CommentsStatus />
            </div>
            <CommentsPagination pageHandler={handlePage}/>
        </div>

    )
}

export default CommentsTable;