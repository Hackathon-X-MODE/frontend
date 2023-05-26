import React, {createRef, useEffect, useRef, useState} from 'react';
import {useGetTicketsQuery, useLazyGetOrdersListQuery, useLazyGetVendorsByListQuery} from "../../redux/postamatApi";
import Loader from "../loader/Loader";
import TicketPost from "./TicketPost";

const Tickets = (props) => {
    const [page, setPage] = useState(0)
    const {data: allTickets = [], isSuccess: allTicketsSuccess , isFetching} = useGetTicketsQuery(page)
    const [getOrderList, {data: orderList, isSuccess: orderListSuccess}] = useLazyGetOrdersListQuery()
    const [getVendorsList, {data: vendorsList, isSuccess: vendorsListSuccess}] = useLazyGetVendorsByListQuery()

    const lastItem = createRef()
    const listInnerRef = useRef()

    useEffect(() => {

        if (allTicketsSuccess) {

            const order = allTickets.map(order => order.content.map(i => i.orderId))
            getOrderList(order[0])

            if (orderListSuccess) {
                const vends = orderList.map(ven => ven.vendorId)
                getVendorsList(vends)
            }


        }

        // const onScroll = () => {
        //     console.log('HHE')
        //     const scrolledToBottom =
        //         window.innerHeight + window.scrollY >= document.body.offsetHeight;
        //     if (scrolledToBottom && !isFetching) {
        //         console.log("Fetching more data...");
        //         setPage(page + 1);
        //     }
        // };
        // window.addEventListener("scroll", () =>onScroll);
        //
        // return function () {
        //     console.log('LOL')
        //     window.removeEventListener("scroll", onScroll);
        // };
    },[allTicketsSuccess,orderListSuccess, vendorsListSuccess , isFetching])
    if (!vendorsListSuccess) return <Loader />
    console.log('TICKET', allTickets)
    // console.log('ord',orderList)
    // console.log('vedn',vendorsList)
    console.log('123')


    return(
        <>
            <button onClick={() => setPage(page + 1)}>asdasd</button>
            {
                vendorsList &&
                <div  className={'overflow-y-auto w-[1360px]   mx-[70px] mt-[50px] flex bg-[#21243A] rounded-[15px]'}>
                    <div className={'flex w-full flex-col gap-2 text-white text-[18px] px-[30px] py-[24px]'}>
                        <div className={'flex '}>
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
                            allTickets.map(item => {
                                return  item.content.map((i, idx) => {
                                    const VENDOR_NAME = vendorsList[vendorsList.findIndex((itm) => itm.id === orderList[idx].vendorId)].name
                                    return <TicketPost key={i.id} id={i.id} name={VENDOR_NAME} created={i.createDate} deadline={i.deadline} />
                                })
                            })
                        }
                    </div>
                </div>
            }
        </>

    )
}

export default Tickets;