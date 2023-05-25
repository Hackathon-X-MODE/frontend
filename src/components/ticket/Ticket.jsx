import React, { useEffect, useState } from "react";
import edit from "../../assets/ico/vendors/edit.svg";
import profilePic from "../../assets/ico/ticket/profilePic.svg";
import star from "../../assets/ico/ticket/star.svg";
import Loader from "../loader/Loader";
import {
    useConfirmTicketByIdMutation,
    useGetTicketsByIdQuery,
    useLazyGetCommentsByOrderIdQuery,
    useLazyGetOrderByIdQuery,
    useLazyGetVendorsByListQuery,
    useLazyGetVendorsByPostamatIdQuery
} from "../../redux/postamatApi";
import CustomSelect from "../form/CustomSelect";

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
    const [isUpdateComment, setUpdateComment] = useState(false)
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
    const [commentaryMap, setCommentaryMap] = useState()
    const [arrValues, setArrValues] = useState()

    useEffect(() => {
        // if (isUpdateComment) {
        //     console.log('123')
        // }
        if (ticketSuccess) {
            getCommentsByOrderId(ticket[0].orderId);
            getOrderById(ticket[0].orderId);
            setTicketData(...ticket);

            if (commentsSuccess) {
                setTicketData((prevState) => ({
                    ...prevState,
                    coms: comments
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
        vendorsListSuccess,
        isUpdateComment,
    ]);

    const objectFunc = (name, idx, ...args) => {
        const productDesc = [
            { value: '', label: '' },
        ]
        const prepareOrder = [
            { value: 'SELECT_POSTAMAT', label: 'Выбор способа доставки в постамат' },
            { value: 'SEARCH_POSTAMAT_AT_HOUSE', label: 'Поиск постамата в конкретном подъезде дома' },
        ]

        const gettingOrder = [
            { value: 'PAY_ORDER', label: 'Оплата заказа' },
            { value: 'OPEN_POSTAMAT', label: 'Открытие ячейки' },
        ]

        const gotOrder = [
            { value: 'PACKING', label: 'Упаковка' },
            { value: 'COMPLETENESS', label: 'Комплектность' },
        ]

        const product = [
            { value: 'QUALITY', label: 'Качество' },
            { value: 'DESCRIPTION', label: 'Несоответствие описанию на сайте' },
        ]

        const postBox = [
            { value: 'WORK_POSTAMAT', label: 'Работа постамата' },
            { value: 'LOCATION_POSTAMAT', label: 'Местоположение постамата' },
            { value: 'VIEW_POSTAMAT', label: 'Внешний вид постамата' },
        ]

        const delivery = [
            { value: 'DEADLINE', label: 'Сроки доставки' },
            { value: 'COAST_DELIVERY', label: 'Стоимость доставки' },
            { value: 'DELIVERY_GUY_REPORT', label: 'Жалоба на работу курьеров' },
        ]

        const notification = [
            { value: 'CONFIRM_NOTIFICATION', label: 'Уведомление об оформленном заказе' },
            { value: 'DELIVERY_NOTIFICATION', label: 'Уведомление о дате доставки' },
            { value: 'READY_NOTIFICATION', label: 'Уведомление о готовности заказа к получению' },
        ]

        const other = [
            { value: '', label: '' },
        ]

        setCommentaryMap((prevState) => ({
            ...prevState,
            [idx]: {
                [name]: ''
            }
        }))
        if (commentaryMap) {
            console.log(commentaryMap[`${idx}`])

            if (commentaryMap) {
                Object.keys(commentaryMap[`${idx}`]).map((item) => {
                    setArrValues({
                        arrVal: item,
                        index: idx
                    })

                })

            }
        // console.log(k,v)

        }
        console.log(commentaryMap)
    }

    const handleChangeButton = (e) => {
        setUpdateComment(!isUpdateComment)
        // if (e.target.innerText === 'Редактировать') {
        //     const commentTypesArr = ticketData.coms.map(arr => {
        //         return Object.keys(arr.commentTypes).map((select) => {
        //             setReactSelectState(select)
        //         })
        //     })
        //     console.log(commentTypesArr)
            // Object.entries(comment.commentTypes).map(([k,v], idx) => {
            //
            // }
            // setReactSelectState()
        // } else {
        //     setUpdateComment(!isUpdateComment)
        // }
    }



    if (!vendorsListSuccess) return <Loader />;

    if (vendorsListSuccess) {
        // console.log(ticketData);
    }

    return (
        <>
            {
                ticketData &&
                <div className={'w-full flex  pl-[77px] pr-[83px] py-[43px] font-primary'}>
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
                                <div className={'flex items-center gap-[72px]  pl-[50px]'}>
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
                            <div className={'flex text-[18px] justify-between px-[30px] py-[20px] bg-[#21243A] h-[361px] rounded-bl-[15px] rounded-br-[15px]'}>
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
                                        <span className={'text-white break-words h-[46px]'}>{ticketData.ord[0].description}</span>
                                    </div>

                                    <div className={'flex flex-col mt-[10px]'}>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b className={'text-[#6C7094]'}>Срок</b></span>
                                            <span className={'text-white'}>{new Date(ticketData?.ord[0].dateHistory?.assembling).toLocaleDateString()}</span>
                                        </div>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b className={'text-[#6C7094]'}>Поступление</b></span>
                                            <span className={'text-white'}>{new Date(ticketData?.ord[0].dateHistory?.create).toLocaleDateString()}</span>
                                        </div>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b className={'text-[#6C7094]'}>Продление</b></span>
                                            <span className={'text-white'}>{new Date(ticketData?.ord[0].dateHistory?.storage[0]).toLocaleDateString()}</span>
                                        </div>
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
                        <div className={'mt-[28px]'}>
                            <div className={'flex  items-center text-white rounded-tl-[15px] bg-[#5C5F7E]  h-[100px] rounded-tr-[15px] px-[30px] py-[10px]'}>
                                <h2 className={'text-[32px]'}>История отзыва</h2>
                            </div>
                            <div className={'flex w-full text-white text-[18px] gap-[27px] px-[30px]  bg-[#21243A] rounded-bl-[15px] rounded-br-[15px] pb-[10px]'}>
                                {
                                    ticketData.coms.map(comment => {
                                        return(
                                            <div key={comment.id} className={'mt-[32px] flex w-full gap-[29px]'}>
                                                <img className={'self-start'} src={profilePic}/>
                                                <div className={'flex w-full flex-col'}>
                                                    <div className={'flex items-center justify-between'}>
                                                        <div className={'flex flex-col'}>
                                                            <span>{new Date(comment.createDate).toLocaleDateString()}</span>
                                                            <span>{ticketData.ord[0].person?.fullName ? ticketData.ord[0].person?.fullName : '-'}</span>
                                                        </div>
                                                        <div className={'flex gap-[32px]'}>
                                                            <div className={'flex gap-2'}>
                                                                <img src={star}/>
                                                                <img src={star}/>
                                                                <img src={star}/>
                                                                <img src={star}/>
                                                                <img src={star}/>
                                                            </div>
                                                            <span className={'border border-[#F62E46] rounded-[15px] h-[45px] px-[24px] pt-[8px]'}>{comment.mood}</span>
                                                        </div>
                                                    </div>
                                                    {/*COMMENT*/}
                                                    <div className={'break-words bg-[#373A54] px-[20px] py-[18px] rounded-[15px] mt-[21px]'}>
                                                        <span>{comment.comment}</span>
                                                    </div>
                                                    {
                                                        isUpdateComment
                                                        ?
                                                            <>
                                                                <div className={'flex mt-[30px]'}>
                                                                    <div className={'w-5/12 flex flex-col '}>
                                                                        {
                                                                            Object.entries(comment.commentTypes).map(([k,v], idx) => {
                                                                                return(
                                                                                    <CustomSelect key={`${k}_${idx}`} nameObject={k} idx={idx} objectFunc={objectFunc} />
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className={'w-7/12 flex flex-col'}>
                                                                        {
                                                                            Object.entries(comment.commentTypes).map(([k,v],idx) => {
                                                                                return(
                                                                                    <CustomSelect key={`${v}_${idx}`} nameObject={v} idx={idx} objectFunc={objectFunc} arrayValues={arrValues?.index === idx ? arrValues?.arrVal : k} />
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                        :
                                                            <>
                                                                <div className={'flex mt-[30px]'}>
                                                                    <div className={'w-5/12 flex flex-col '}>
                                                                        {
                                                                            Object.entries(comment.commentTypes).map(([k,v], idx) => {
                                                                                return(
                                                                                    <div key={`${k}_${idx}`} className={'flex gap-1 flex-col border-b border-b-[#6C7094] py-[10px]'}>
                                                                                        <span className={'text-[#6C7094]'}>Категория</span>
                                                                                        <span>{k}</span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className={'w-7/12 flex flex-col'}>
                                                                        {
                                                                            Object.entries(comment.commentTypes).map(([k,v],idx) => {
                                                                                return(
                                                                                    <div key={`${v}_${idx}`} className={'flex gap-1 flex-col border-b border-b-[#6C7094] py-[10px]'}>
                                                                                        <span className={'text-[#6C7094]'}>Подкатегория</span>
                                                                                        <span>{v.length === 0 ? ' -' : v.join(', ')}</span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                    }

                                                    <button className={'self-start mt-[60px] px-[33px] py-[18px] border rounded-[15px]'} onClick={handleChangeButton}>
                                                        {isUpdateComment ? 'Сохранить' : 'Редактировать'}
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                    <div>
                        {/*STORY SECTION*/}
                        <div>

                        </div>
                        {/*OWNER INFO*/}
                        <div>

                        </div>
                        {/*MACHINE INFO*/}
                        <div>

                        </div>
                    </div>
                </div>
            }
        </>

    );
};
export default Ticket;
