import React, {useEffect, useState} from 'react';
import {useGetTicketsQuery,} from "../../../redux/postamatApi";
import Loader from "../../loader/Loader";
import TicketHeader from "./ticketHeader/TicketHeader";
import TicketBody from "./ticketBody/TicketBody";
import TicketsStatus from "./TicketsStatus";
import ReactPaginate from "react-paginate";


const Tickets = (props) => {
    const [initialData, setInitialData] = useState()
    const [sortMethod, setSortMethod] = useState('deadline')
    const [sort, setSort] = useState('ASC')
    const [page, setPage] = useState(0)
    const [pages, setPages] = useState(0)
    const [status, setStatus] = useState('OPEN')

    const {data: allTickets = [], isFetching} = useGetTicketsQuery({page: page, status: status, sortMethod: sortMethod, sort: sort})

    useEffect(() => {
        if (!allTickets || allTickets.length === 0) {
            return
        }
        setInitialData(allTickets)
        setPages([...Array(allTickets[0].totalPages)])
    }, [isFetching, page, status, sort, sortMethod])

    const pageCount = Math.max(Math.ceil(pages.length / 20), 1);

    const handleFilter = (e) => {
        setStatus(e.target.name)
        setPage(0)
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 20) % pages.length;
        const target = event.selected
        setPage(target)
    }

    const handleHeaderSort = (e) => {
        setSortMethod(e.target.name)
        sort === 'ASC' ? setSort('DESC') : setSort('ASC')
    }

    if (!initialData) return <Loader/>

    if (isFetching) return <Loader/>

    return (
        <div className={'w-full relative  flex flex-col  mt-[50px] font-primary'}>
            <div
                className={'mx-[70px] w-5/6 px-[70px] flex flex-col h-[85vh]  flex flex bg-[#21243A] rounded-[15px] overflow-y-scroll rounded-tr-[0px]'}>
                <TicketHeader onSort={handleHeaderSort} sort={sort} sortMethod={sortMethod} />
                {
                    initialData.length !== 0 && <TicketBody tickets={initialData}/>
                }
                <TicketsStatus status={status} handleFilter={handleFilter}/>
            </div>
            <div className={'flex justify-between items-center mt-[20px]'}>
                <div className={'text-[22px] text-white translate-x-[100px]'}>Всего обращений: {allTickets[0]?.totalElements}</div>
                <ReactPaginate
                    className={'flex items-center justify-end -translate-x-[200px] text-white  gap-[5px]'}
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
            </div>
        </div>
    )
}

export default Tickets;