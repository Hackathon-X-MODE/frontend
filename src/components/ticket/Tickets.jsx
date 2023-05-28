import React, { useCallback, useEffect, useRef, useState} from 'react';
import {
    useGetFilteredTicketsMutation,
    useGetTicketsQuery,
} from "../../redux/postamatApi";
import Loader from "../loader/Loader";
import TicketPost from "./TicketPost";


const Tickets = (props) => {
    const [initialData, setInitialData] = useState()
    const [page, setPage] = useState(0)
    const [status, setStatus] = useState('OPEN')
    const [flag, setFlag] = useState(false)

    const {data: allTickets = [],isLoading, isSuccess: allTicketsSuccess , isFetching, isFulfilled: ticketFulfilled } = useGetTicketsQuery(page, status)
    const [getFilteredTickets, {data:dt = [], isSuccess: filtered}] = useGetFilteredTicketsMutation()


    const observer = useRef();
    const lastItem = useCallback(node => {
        if (isLoading) return
        if (observer.current) observer.current.disconnect()
        console.log(node)
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevState => prevState + 1)
            }
        });
        if (node) observer.current.observe(node)
    },[isLoading])

    useEffect(() => {

            if (filtered) {
                console.log('DATA',dt)
                setInitialData(dt)
        } else {
            if (allTicketsSuccess) {
                setInitialData(allTickets)
            }
        }

        console.log('render')
    },[allTickets, filtered])

    if (!allTicketsSuccess) return <Loader />

    const handleFilter = (e) => {
        // if (page !== 0) setPage(0)
        setStatus(e.target.name)
        // setFlag(true)
        const status1 = e.target.name
        getFilteredTickets({page: 0, status: status1})
        alert('В разработке')
    }


    return(
        <div className={'w-full flex'}>
            {
                initialData &&
                    <div  className={'overflow-y-scroll w-[1360px] h-[1080px] flex ml-[70px] mt-[50px] flex bg-[#21243A] rounded-[15px] rounded-tr-[0px]'}>
                        <div className={'flex w-full flex-col gap-2  text-white text-[18px] px-[30px] py-[24px]'}>
                            <div className={'flex sticky top-[0px] bg-[#21243A]'}>
                                <div className={'w-full flex mb-[22px] '}>
                                    <div className={'w-[58px] ml-[45px]'}>Номер</div>
                                    <div className={'w-[66px] ml-[223px]'}>Вендор</div>
                                </div>
                                <div className={'w-full ml-[370px] flex'}>
                                    <div className={'w-[180px]'}>Дата обращения</div>
                                    <div className={'w-[192px] ml-[50px]'}>Срок обращения</div>
                                </div>
                            </div>
                            {
                                initialData.map(item => {
                                    return  item.content.map((i, index) => {
                                        if (index + 1 === item.content.length) {
                                            return(
                                                <TicketPost id={i.id} name={i.order.vendor.name} created={i.createDate} deadline={i.deadline} ref={lastItem} bg={i.ticketStatus} />
                                            )
                                        } else {
                                            return(
                                                <TicketPost id={i.id} name={i.order.vendor.name} created={i.createDate} deadline={i.deadline} bg={i.ticketStatus} />
                                            )
                                        }

                                    })
                                })
                            }
                        </div>
                    </div>
            }
            <div>
                <div className={'mt-[50px] w-[70px] h-[240px] text-white text-[18px] flex bg-[#21243A] rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]'}>
                    <div className={'flex items-center justify-center '}>
                        <button name={'OPEN'} onClick={handleFilter} className={'rotate-[90deg]'}>Открытые</button>
                    </div>
                </div>
                <div className={'relative mt-[7px] w-[70px] h-[240px] text-white text-[18px] flex flex-wrap bg-[#21243A] rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]'}>
                    <div className={'flex items-center justify-center'}>
                        <button name={'PENDING'} onClick={handleFilter} className={'rotate-[90deg]'}>Обработка</button>
                    </div>
                </div>
                <div className={'mt-[7px] w-[70px] h-[240px] text-white text-[18px] flex bg-[#21243A] rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]'}>
                    <div className={'flex  items-center justify-center '}>
                        <button name={'COMPLETED'} onClick={handleFilter} className={'rotate-[90deg]'}>Выполнены</button>
                    </div>
                </div>
                <div className={'mt-[7px] w-[70px] h-[240px] text-white text-[18px] flex bg-[#21243A] rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]'}>
                    <div className={'flex  items-center justify-center '}>
                        <button name={'CANCELED'} onClick={handleFilter} className={'rotate-[90deg]'}>Отменены</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Tickets;