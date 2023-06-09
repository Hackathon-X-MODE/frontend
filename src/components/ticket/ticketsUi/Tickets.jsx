import React, { useEffect, useState } from 'react';
import {
    useGetTicketsQuery,
} from "../../../redux/postamatApi";
import Loader from "../../loader/Loader";
import TicketHeader from "./ticketHeader/TicketHeader";
import TicketBody from "./ticketBody/TicketBody";
import TicketsPagination from "./TicketsPagination";
import TicketsStatus from "./TicketsStatus";


const Tickets = (props) => {
    const [initialData, setInitialData] = useState()
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState('OPEN')

    const { data: allTickets = [], isFetching } = useGetTicketsQuery({page: page, status: status})

    useEffect(()=> {
        setInitialData(allTickets)
    }, [isFetching, page, status])

    const handlePage = (type) => {
        if (type === 'next' && initialData[0].content.length === 20) {
            setPage((prevPage) => prevPage + 1)
        } else if( type === 'prev' && page !== 0) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    const handleFilter = (e) => {
        setStatus(e.target.name)
        setPage(0)
    }

    if (!initialData) return  <Loader />

    if (isFetching) return <Loader />

    return(
        <div className={'w-full relative  flex flex-col  mt-[50px] font-primary'}>
            <div className={'mx-[70px] w-5/6 px-[70px] flex flex-col h-[800px]  flex flex bg-[#21243A] rounded-[15px] overflow-y-scroll rounded-tr-[0px]'}>
                <TicketHeader />
                {
                    initialData.length !== 0 && <TicketBody tickets={initialData} />
                }
                <TicketsStatus status={status} handleFilter={handleFilter} />
            </div>
            <TicketsPagination pageHandler={handlePage} />
        </div>
    )
}

export default Tickets;