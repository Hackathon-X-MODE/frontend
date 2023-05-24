import React, { useEffect, useState } from "react";
import edit from "../../assets/ico/vendors/edit.svg";
import Loader from "../loader/Loader";
import {
    useConfirmTicketByIdMutation,
    useGetTicketsByIdQuery,
    useLazyGetCommentsByOrderIdQuery,
    useLazyGetOrderByIdQuery,
    useLazyGetVendorsByListQuery,
    useLazyGetVendorsByPostamatIdQuery
} from "../../redux/postamatApi";

const Ticket = (props) => {
    const {
        data: ticket = [],
        isLoading: ticketLoading,
        isSuccess: ticketSuccess
    } = useGetTicketsByIdQuery(2);
    const [
        getCommentsByOrderId,
        {
            data: comments = [],
            isLoading: commentsLoading,
            isSuccess: commentsSuccess
        }
    ] = useLazyGetCommentsByOrderIdQuery();
    const [
        getVendorsByPostamatId,
        {
            data: vendors = [],
            isLoading: vendorsLoading,
            isSuccess: vendorsSuccess
        }
    ] = useLazyGetVendorsByPostamatIdQuery();
    const [
        getOrderById,
        { data: order = [], isLoading: orderLoading, isSuccess: orderSuccess }
    ] = useLazyGetOrderByIdQuery();
    const [
        getVendorsByListQuery,
        {
            data: vendorsList = [],
            isLoading: vendorsListLoading,
            isSuccess: vendorsListSuccess
        }
    ] = useLazyGetVendorsByListQuery();

    const [
        confirmTicketById,
        { isLoading: confirmLoading, isSuccess: confirmSuccess }
    ] = useConfirmTicketByIdMutation();

    const [ticketData, setTicketData] = useState();
    //PUT PROBLEM OWNERS COMMENTID (NOT_PROCESSED!)
    const [solveData, setSolveData] = useState({
        solve: [
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                problemOwners: ["MARKET_PLACE"]
            },
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa613213",
                problemOwners: ["MARKET_PLACE"]
            },
            {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa2342346",
                problemOwners: ["MARKET_PLACE"]
            }
        ]
    });

    useEffect(() => {
        if (ticketSuccess) {
            getCommentsByOrderId(ticket[0].orderId);
            getOrderById(ticket[0].orderId);
            setTicketData(...ticket);

            if (commentsSuccess) {
                setTicketData((prevState) => ({
                    ...prevState,
                    coms: order
                }));
            }

            if (orderSuccess) {
                setTicketData((prevState) => ({
                    ...prevState,
                    ord: order
                }));
                getVendorsByPostamatId(order[0].postamatId);
                if (vendorsSuccess) {
                    setTicketData((prevState) => ({
                        ...prevState,
                        vend: vendors
                    }));
                    if (order[0].id === vendors[0].id) {
                        return;
                    } else {
                        getVendorsByListQuery([
                            order[0].vendorId,
                            vendors[0].vendorId
                        ]);

                        if (vendorsListSuccess) {
                            setTicketData((prevState) => ({
                                ...prevState,
                                vendrList: vendorsList
                            }));
                        }
                    }
                }
            }
        }
    }, [
        ticketSuccess,
        commentsSuccess,
        orderSuccess,
        vendorsSuccess,
        vendorsListSuccess
    ]);

    if (!vendorsListSuccess) return <Loader />;

    if (vendorsListSuccess) {
        console.log(ticketData);
    }

    return (
        <>
            {
                ticketData &&
                <div className={'w-full flex gap-[40px] pl-[77px] pr-[83px] py-[43px] font-primary'}>
                    <div className={'w-[940px] flex flex-col'}>
                        {/*ORDER*/}
                        <div className={''}>
                            {/*//Header*/}
                            <div className={'flex  items-center rounded-tl-[15px] bg-[#5C5F7E]  h-[100px] rounded-tr-[15px] px-[30px] py-[10px]'}>
                                <div className={'flex w-1/2 flex-col '}>
                                    <span className={'text-white text-[18px]'}>Номер обращения</span>
                                    <div className={'flex gap-[13px] items-center'}>
                                        <h2 className={'text-[32px] text-white translate-y-0.5'}>#{ticketData.id}</h2>
                                        <span className={'bg-[#3FC955] text-white rounded-[15px] px-[18px] pb-[1px] pt-[2px]'}>{ticketData.ticketStatus}</span>
                                    </div>
                                </div>
                                <div className={'flex items-center gap-[49px]  pl-[50px]'}>
                                    <div className={'flex flex-col text-white text-[18px] '}>
                                        <span>Дата обращения</span>
                                        <span>{new Date(ticketData?.createDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className={'flex flex-col text-white text-[18px] '}>
                                        <span>Срок обращения</span>
                                        <span>{new Date(ticketData?.deadline).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            {/*ORDER BODY*/}
                            <div className={'flex text-[18px] justify-between px-[30px] py-[10px] bg-[#21243A] h-[361px] rounded-bl-[15px] rounded-br-[15px]'}>
                                <div className={'w-1/2 flex flex-col gap-[15px]'}>
                                    <div className={'flex  gap-[70px]'}>
                                        <div className={"flex flex-col w-[200px]"}>
                                            <span className={'text-[#6C7094]'}>Номер заказа</span>
                                            <input disabled={true} className={"text-white bg-transparent "} defaultValue={ticketData.ord[0].externalId}/>

                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Сумма заказа</span>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].sum} ₽</span>
                                        </div>
                                    </div>
                                    <div className={'flex  gap-[70px]'}>
                                        <div className={'flex flex-col w-[200px]'}>
                                            <span className={'text-[#6C7094]'}>Габариты</span>
                                            <span className={'text-white break-words'}>
                                                {ticketData.ord[0].meta.width}х{ticketData.ord[0].meta.height}x{ticketData.ord[0].meta.depth}
                                            </span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Вес</span>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].meta.weight}</span>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col '}>
                                        <span className={'text-[#6C7094]'}>Описание</span>
                                        <span className={'text-white break-words'}>{ticketData.ord[0].description}</span>
                                    </div>

                                    <div className={'flex flex-col mt-[10px]'}>
                                        <span className={'text-white'}><b className={'text-[#6C7094]'}>Срок</b> {new Date(ticketData?.ord[0].dateHistory?.assembling).toLocaleDateString()}</span>
                                        <span className={'text-white'}><b className={'text-[#6C7094]'}>Поступление</b> {new Date(ticketData?.ord[0].dateHistory?.create).toLocaleDateString()}</span>
                                        <span className={'text-white'}><b className={'text-[#6C7094]'}>Продление</b> {new Date(ticketData?.ord[0].dateHistory?.storage[0]).toLocaleDateString()}</span>
                                    </div>

                                </div>
                                <div className={'w-1/2 border-l border-l-gray-700 pl-[50px] flex flex-col gap-[15px]'}>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>ФИО</span>
                                        <span className={'text-white break-words'}>{ticketData.ord[0].person?.fullName ? ticketData.ord[0].person?.fullName : '-'}</span>
                                    </div>

                                    <div className={'flex  gap-[70px]'}>
                                        <div className={'flex flex-col w-[150px]'}>
                                            <span className={'text-[#6C7094]'}>Дата рождения</span>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].person?.date ? new Date(ticketData.ord[0].person.date).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Пол</span>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].person?.sex ? 'М' : 'Ж'}</span>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>Телефон</span>
                                        <div className={'flex items-center justify-between'}>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].person.phone ? ticketData.ord[0].person.phone : '-'}</span>
                                            <img src={edit}/>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>E-mail</span>
                                        <div className={'flex items-center justify-between'}>
                                            <span className={'text-white break-words'}>{ticketData.ord[0].person.email ? ticketData.ord[0].person.email : '-' }</span>
                                            <img src={edit}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*COMMENTS SECTION*/}
                    </div>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
        </>

    );
};
export default Ticket;
