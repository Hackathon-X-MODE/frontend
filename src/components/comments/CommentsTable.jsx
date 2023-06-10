import React, {useEffect, useState} from 'react';
import CommentsHeader from "./commentsHeader/CommentsHeader";
import CommentsStatus from "./CommentsStatus";
import CommentsPagination from "./CommentsPagination";
import CommentsBody from "./commentsBody/CommentsBody";
import {useGetCommentsQuery, useGetVendorsQuery} from "../../redux/postamatApi";
import ReactPaginate from 'react-paginate';
import Loader from "../loader/Loader";

const CommentsTable = (props) => {
    const [mood, setMood] = useState('')
    const [sort, setSort] = useState('DESC')
    const [sortMethod, setSortMethod] = useState('createDate')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [comments, setComments] = useState([])
    const [itemOffset, setItemOffset] = useState(0);
    const {data: vendorsData, isFetching: vendorsFetching, isSuccess: vendorsSuccess} = useGetVendorsQuery()
    const {data: commentsData, isSuccess: commentsSuccess, isFetching: commentsFetching} = useGetCommentsQuery({page: page, mood: mood, sort: sort, sortMethod: sortMethod})

    useEffect(() => {
        if (commentsSuccess && vendorsSuccess) {
            const coms = [...commentsData.content]
            setPages([...Array(commentsData.totalPages)])
            const comms = coms.map((com) => {
                return {
                    comment: com,
                    name: vendorsData.find(id => id.id === com.vendorId).name
                }
            })
            setComments(comms)
        }
    },[vendorsFetching, commentsFetching, page, mood, sortMethod, sort])

    const pageCount = Math.ceil(pages.length / 20);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 20) % pages.length;
        const target = event.selected
        console.log(page)
        setPage(target)
        console.log(commentsData)
        setItemOffset(newOffset);
    }

    const onFilter = (e) => {
        setPage(0)
        setMood(e.target.name)
    }

    const onHeaderFilter = (e) => {
        setSortMethod(e.target.name)
        sort === 'DESC' ? setSort('ASC') : setSort('DESC')
    }

    if (!vendorsSuccess) return  <Loader />
    if (commentsFetching) return <Loader />

    // console.log(comments)
    return(
        <div className={'w-full relative  flex flex-col  mt-[50px] font-primary'}>
            <div className={'mx-[70px] w-5/6 px-[70px] flex flex-col h-[85vh]  flex flex bg-[#21243A] rounded-[15px] overflow-y-scroll rounded-tr-[0px]'}>
                <CommentsHeader total={commentsData.totalElements} status={sortMethod} handleFilter={onHeaderFilter} />
                {
                    comments.length !== 0 && <CommentsBody comments={comments} />
                }
                <CommentsStatus status={mood} handleFilter={onFilter} />
            </div>
            {/*<div className={'flex justify-between mt-[20px] items-center font-primary text-white text-[22px]'}>*/}
                {/*<div className={'translate-x-[70px] text-white'}>Всего комментариев: {commentsData.totalElements}</div>*/}
                <ReactPaginate
                    className={'flex items-center justify-end -translate-x-[200px] text-white  gap-[5px] mt-[20px]'}
                    breakLabel="..."
                    nextLabel=">"
                    nextLinkClassName={'bg-[#21243A] px-[10px] py-[10px] rounded-[10px]'}
                    previousClassName={'bg-[#21243A] px-[10px] py-[10px] rounded-[10px]'}
                    onPageChange={handlePageClick}
                    initialPage={page}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    activeLinkClassName={'bg-[#5C5F7E]'}
                    previousLabel="<"
                    pageLinkClassName={'px-[10px] py-[10px] text-white rounded-[10px]'}
                />
            {/*</div>*/}
        </div>

    )
}

export default CommentsTable;