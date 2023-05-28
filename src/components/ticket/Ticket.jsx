import React, {useEffect, useState} from "react";
import edit from "../../assets/ico/vendors/edit.svg";
import profilePic from "../../assets/ico/ticket/profilePic.svg";
import star from "../../assets/ico/ticket/star.svg";
import whiteStar from "../../assets/ico/ticket/whiteStar.svg";
import elipse from "../../assets/ico/ticket/elipse.svg";

import moment from 'moment'
import Loader from "../loader/Loader";
import {
    useConfirmTicketByIdMutation,
    useGetTicketsByIdQuery,
    useLazyGetCommentsByOrderIdQuery,
    useLazyGetOrderByIdQuery,
    useLazyGetVendorByIdQuery,
    useLazyGetVendorsByListQuery,
    useLazyGetVendorsByPostamatIdQuery,
    useUpdateCommentsMutation
} from "../../redux/postamatApi";
import Delivery from "./Delivery";
import CategoriesEditor from "../form/CategoriesEditor";
import {useParams} from "react-router-dom";


const reference = {
    PRODUCT_DESCRIPTION: 'Описание товара на сайте интернет-магазина',
    GETTING_ORDER: 'Получение заказа',
    GOT_ORDER: 'Полученный заказ',
    PRODUCT: 'Товар',
    POST_BOX: 'Работа постамата',
    DELIVERY: 'Доставка',
    NOTIFICATION: 'Уведомления',
    OTHER: 'Иное',
    PREPARE_ORDER: 'Оформление заказа',
    SELECT_POSTAMAT: 'Выбор способа доставки в постамат',
    SEARCH_POSTAMAT_AT_HOUSE: 'Поиск постамата в конкретном подъезде дома',
    PAY_ORDER: 'Оплата заказа',
    OPEN_POSTAMAT: 'Открытие ячейки',
    PACKING: 'Упаковка',
    COMPLETENESS: 'Комплектность',
    QUALITY: 'Качество',
    DESCRIPTION: 'Несоответствие описанию на сайте',
    WORK_POSTAMAT: 'Работа постамата',
    LOCATION_POSTAMAT: 'Местоположение постамата',
    VIEW_POSTAMAT: 'Внешний вид постамата',
    DEADLINE: 'Сроки доставки',
    COAST_DELIVERY: 'Стоимость доставки',
    DELIVERY_GUY_REPORT: 'Жалоба на работу курьеров',
    CONFIRM_NOTIFICATION: 'Уведомление об оформленном заказе',
    DELIVERY_NOTIFICATION: 'Уведомление о дате доставки',
    READY_NOTIFICATION: 'Уведомление о готовности заказа к получению'
}

const placeRef = {
    'POSTAMAT': `Технический отдел "Московский постомат"`,
    'MARKET_PLACE': `Направить в Маркетплэйс`
}


const Ticket = (props) => {
    const {ticketId} = useParams()
    const
        {
            data: ticket = [],
            isLoading: ticketLoading,
            isSuccess: ticketSuccess,
            isFetching: ticketFetching
        } = useGetTicketsByIdQuery(+ticketId);
    const [getVendorById, {data: vendor, isSuccess: vendorSuccess}] = useLazyGetVendorByIdQuery()
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
        {data: order = [], isLoading: orderLoading, isSuccess: orderSuccess}
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
        {isLoading: confirmLoading, isSuccess: confirmSuccess}
    ] = useConfirmTicketByIdMutation();

    const [updateComments, {isSuccess: updateCommentsSuccess}] = useUpdateCommentsMutation()

    const [ticketData, setTicketData] = useState();
    const [isUpdateComment, setUpdateComment] = useState(false)
    const [comments_, setComments] = useState();
    //PUT PROBLEM OWNERS COMMENTID (NOT_PROCESSED!)
    const [solveData, setSolveData] = useState([]);
    const [commentaryMap, setCommentaryMap] = useState()

    const [singleVendor, setSingleVendor] = useState()
    const [isOtherPostamatVendor, setOtherPostamat] = useState()


    useEffect(() => {

        if (ticketSuccess) {
            setTicketData(...ticket);
            getCommentsByOrderId(ticket[0].orderId);
            getOrderById(ticket[0].orderId);

            if (commentsSuccess) {

                const ticketComment = ticket[0].comments;
                // console.log("C", ticket[0])
                setComments(
                    comments.map((com) => {

                        const commentFromTicket = ticketComment.find(v => v.id === com.id);

                        return {
                            ...com,
                            // problemOwners: ticketData[0]?.comments[idx].problemOwners,
                            commentTypes: Object.entries(com.commentTypes).map(([k, v]) => {
                                return {
                                    name: k,
                                    value: v
                                }
                            }),
                            statusInTicket: commentFromTicket?.status,
                            problemOwners: commentFromTicket?.problemOwners?.map(v => {
                                return {
                                    value: v,
                                    label: placeRef[v]
                                }
                            })
                        }
                    })
                )

                setTicketData((prevState) => ({
                    ...prevState,
                    coms: comments
                }));
            }

            if (orderSuccess) {
                setTicketData((prevState) => ({
                    ...prevState,
                    ord: order,
                    vendrList: {}
                }));

                getVendorById(order[0]?.vendorId)

                if (vendorSuccess) {
                    // console.log(vendorSuccess)

                    setSingleVendor(vendor)
                }


                if (order[0].postamatId) {
                    getVendorsByPostamatId(order[0].postamatId);
                    if (vendorsSuccess) {
                        // console.log(vendorsSuccess)
                        setTicketData((prevState) => ({
                            ...prevState,
                            vend: vendors
                        }));
                        if (order[0]?.id === vendors[0]?.id) {
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
        }
    }, [
        ticketFetching,
        ticketSuccess,
        singleVendor?.id,
        commentsSuccess,
        orderSuccess,
        vendorsSuccess,
        vendorSuccess,
        vendorsListSuccess,
        isUpdateComment,
    ]);


    const objectFunc = (name, idx, ...args) => {

        setCommentaryMap((prevState) => ({
            ...prevState,
            [idx]: {
                [name]: ''
            }
        }))


    }


    const handleChangeButton = (id, e) => {

        if (e.target.innerText === 'Редактировать') {
        } else {
            const forUpdate = comments_.filter(comment => comment.id === id)[0];
            updateComments({
                body: {
                    commentTypesSet: forUpdate.commentTypes.flatMap((item) => [item.name, ...item.value])
                },
                id: forUpdate.id
            })

        }
        setUpdateComment(!isUpdateComment)
    }


    const handleSubmitRequest = async (e) => {
        const solveData = ticketData.comments
            .filter(comment=>{
                return comment.status === 'NOT_PROCESSED'
            })
            .map(comment => {

            return {
                id: comment.id,
                problemOwners: comments_.find(cum => cum.id === comment.id).problemOwners.map(v=> v.value)
            }
        })

        const sl = {
            solve: solveData
        }
        //TODO OLEG REFRESH TICKET AFTER THAT CALL.
        await confirmTicketById({id: ticketData.id, body: sl})
    }


    function handleCategory(id, prev, current) {
        let items = [...comments_];
        let index = items.findIndex(item => item.id === id);
        let item = {...items[index]};
        let prevCommentTypeIndex = item.commentTypes.findIndex(item => item.name === prev)
        item.commentTypes[prevCommentTypeIndex] = {
            name: current,
            value: []
        }
        items[index] = item;
        setComments(items);
    }


    function updateCommentProblem(id, e) {
        let items = [...comments_];
        let index = items.findIndex(item => item.id === id);
        let item = {...items[index]};
        item.problemOwners = e
        items[index] = item;
        setComments(items);
    }


    function handleSubCategory(id, mainCategory, value) {
        let items = [...comments_];
        let index = items.findIndex(item => item.id === id);
        let item = {...items[index]};
        let prevCommentTypeIndex = item.commentTypes.findIndex(item => item.name === mainCategory)
        item.commentTypes[prevCommentTypeIndex].value = value
        items[index] = item;
        setComments(items);
    }

    if (ticketLoading) return <Loader/>;
    if (!ticketData?.ord || !ticketData?.coms || !ticketData?.vendrList) return <Loader/>


    const deliveryStatus = {
        'Создан': ticketData.ord[0].dateHistory['create'],
        'Заказ обработан': ticketData.ord[0].dateHistory['assembling'],
        'Передан в доставку': ticketData.ord[0].dateHistory['send'],
        'Заказ доставлен': ticketData.ord[0].dateHistory['receive'],
        'Вручен': ticketData.ord[0].dateHistory['get'],
    }

    const commentaryStatus = {
        'NEGATIVE': 'Негативный',
        'POSITIVE': 'Положительный',
        'NEUTRAL': 'Нейтральный',
    }

    const ticketStatusLabels = {
        'OPEN': {
            name: 'Открыт', bg: 'bg-blue-500'
        },
        'PENDING': {
            name: 'В обработке', bg: 'bg-yellow-500'
        },
        'COMPLETED': {
            name: 'Выполнен', bg: 'bg-green-500'
        },
        'CANCELED': {
            name: 'Отменен', bg: 'bg-gray-500'
        }
        // {'OPEN': name: 'Открыт',}
    }
    let postamatVendor;
    if (ticketData.vend && vendorsList){
        postamatVendor = vendorsList.find(vendor=> vendor.id === ticketData.vend[0].vendorId)
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
                            <div
                                className={'flex  items-center rounded-tl-[15px] bg-[#5C5F7E]  h-[100px] rounded-tr-[15px] px-[30px] py-[10px]'}>
                                <div className={'flex w-1/2 flex-col '}>
                                    <span className={'text-white text-[18px]'}>Номер обращения</span>
                                    <div className={'flex gap-[13px] items-center'}>
                                        <h2 className={'text-[32px] text-white translate-y-0.5'}>#{ticketData.id}</h2>
                                        {
                                            Object.entries(ticketStatusLabels).map(([k, v],idx) => {
                                                if (k === ticketData.ticketStatus) {
                                                    return (
                                                        <span key={`asd_${idx}`}
                                                            className={`${ticketStatusLabels[k].bg} text-white rounded-[15px] px-[18px] pb-[1px] pt-[2px]`}>{ticketStatusLabels[k].name}</span>
                                                    )
                                                }
                                                return null
                                            })
                                        }
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
                            <div
                                className={'flex text-[18px] justify-between px-[30px] py-[20px] bg-[#21243A] h-[361px] rounded-bl-[15px] rounded-br-[15px]'}>
                                <div className={'w-1/2 flex flex-col gap-[15px]'}>
                                    <div className={'flex  gap-[70px]'}>
                                        <div className={"flex flex-col w-[200px]"}>
                                            <span className={'text-[#6C7094]'}>Номер заказа</span>
                                            <input disabled={true} className={"text-white bg-transparent "}
                                                   defaultValue={ticketData.ord[0]?.externalId}/>

                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Сумма заказа</span>
                                            <span className={'text-white break-words'}>{ticketData.ord[0]?.sum} ₽</span>
                                        </div>
                                    </div>
                                    <div className={'flex  gap-[70px]'}>
                                        <div className={'flex flex-col w-[200px]'}>
                                            <span className={'text-[#6C7094]'}>Габариты</span>
                                            <span className={'text-white break-words'}>
                                                {ticketData.ord[0]?.meta?.width}х{ticketData.ord[0]?.meta?.height}x{ticketData.ord[0]?.meta?.depth}
                                            </span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Вес</span>
                                            <span
                                                className={'text-white break-words'}>{ticketData.ord[0]?.meta?.weight}</span>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col '}>
                                        <span className={'text-[#6C7094]'}>Описание</span>
                                        <span
                                            className={'text-white break-words h-[46px]'}>{ticketData.ord[0]?.description}</span>
                                    </div>

                                    <div className={'flex flex-col mt-[10px]'}>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b
                                                className={'text-[#6C7094]'}>Срок</b></span>
                                            <span
                                                className={'text-white'}>{ticketData?.ord[0].dateHistory?.assembling ? new Date(ticketData?.ord[0].dateHistory?.assembling).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b
                                                className={'text-[#6C7094]'}>Поступление</b></span>
                                            <span
                                                className={'text-white'}>{ ticketData?.ord[0].dateHistory?.create ? new Date(ticketData?.ord[0].dateHistory?.create).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className={'flex gap-2'}>
                                            <span className={'text-white'}><b className={'text-[#6C7094]'}>Продление</b></span>
                                            <span
                                                className={'text-white'}>{ticketData?.ord[0].dateHistory?.storage[0] ? new Date(ticketData?.ord[0].dateHistory?.storage[0]).toLocaleDateString() : '-'}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className={'w-1/2 border-l border-l-gray-700 pl-[50px] flex flex-col gap-[15px]'}>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>ФИО</span>
                                        <span
                                            className={'text-white break-words'}>{ticketData.ord[0]?.person?.fullName ? ticketData.ord[0].person?.fullName : '-'}</span>
                                    </div>

                                    <div className={'flex  gap-[70px]'}>
                                        <div className={'flex flex-col w-[150px]'}>
                                            <span className={'text-[#6C7094]'}>Дата рождения</span>
                                            <span
                                                className={'text-white break-words'}>{ticketData.ord[0]?.person?.date ? new Date(ticketData.ord[0]?.person?.date).toLocaleDateString() : '-'}</span>
                                        </div>
                                        <div className={'flex flex-col'}>
                                            <span className={'text-[#6C7094]'}>Пол</span>
                                            <span
                                                className={'text-white break-words'}>{ticketData.ord[0]?.person?.sex ? 'М' : 'Ж'}</span>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>Телефон</span>
                                        <div className={'flex items-center justify-between'}>
                                            <span
                                                className={'text-white break-words'}>{ticketData.ord[0]?.person?.phone ? ticketData.ord[0]?.person?.phone : '-'}</span>
                                            <img src={edit}/>
                                        </div>
                                    </div>

                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>E-mail</span>
                                        <div className={'flex items-center justify-between'}>
                                            <span
                                                className={'text-white break-words'}>{ticketData.ord[0]?.person?.email ? ticketData.ord[0]?.person?.email : '-'}</span>
                                            <img src={edit}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*COMMENTS SECTION*/}
                        <div className={'mt-[28px]'}>
                            <div
                                className={'flex  items-center text-white rounded-tl-[15px] bg-[#5C5F7E]  h-[100px] rounded-tr-[15px] px-[30px] py-[10px]'}>
                                <h2 className={'text-[32px]'}>История отзыва</h2>
                            </div>
                            <div
                                className={' flex flex-col w-full text-white text-[18px] gap-[27px] px-[30px]  bg-[#21243A] rounded-bl-[15px] rounded-br-[15px] pb-[10px]'}>
                                {
                                    comments_.map((comment, idx) => {
                                        return (
                                            <div key={comment.id} className={'mt-[32px] flex w-full gap-[29px] py-[40px] border-opacity-30 border-b border-b-[#6C7094]'}>
                                                <img className={'self-start'} src={profilePic}/>
                                                <div className={'flex w-full flex-col'}>
                                                    <div className={'flex items-center justify-between'}>
                                                        <div className={'flex flex-col'}>
                                                            <span>{new Date(comment.createDate).toLocaleDateString()}</span>
                                                            <span>{ticketData.ord[0].person?.fullName ? ticketData.ord[0].person?.fullName : '-'}</span>
                                                        </div>
                                                        <div className={'flex gap-[32px]'}>
                                                            <div className={'flex items-center gap-2'}>

                                                                {
                                                                    comment.rate === 5
                                                                        ?
                                                                        [...Array(5)].map(x => {
                                                                            return(
                                                                                <div  className={'w-[27px] h-[27px]'}>
                                                                                    <img src={star}/>
                                                                                </div>
                                                                            )
                                                                        })
                                                                        :
                                                                        <>
                                                                            {
                                                                                [...Array(comment.rate)].map(x => {
                                                                                    return(
                                                                                        <div  className={'w-[27px] h-[27px]'}>
                                                                                            <img src={star}/>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                            {
                                                                                [...Array(5 - comment.rate)].map(x => {
                                                                                    return(
                                                                                        <div className={'w-[27px] h-[27px]'}>
                                                                                            <img src={whiteStar}/>
                                                                                        </div>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </>
                                                                }
                                                            </div>
                                                            <span
                                                                className={'border border-[#F62E46] rounded-[15px] h-[45px] px-[24px] pt-[8px]'}>
                                                                {
                                                                    Object.entries(commentaryStatus).map(([k, v]) => {
                                                                        if (k === comment.mood) {
                                                                            return commentaryStatus[k]
                                                                        } else {
                                                                            return null
                                                                        }
                                                                    })
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/*COMMENT*/}
                                                    <div
                                                        className={'break-words bg-[#373A54] px-[20px] py-[18px] rounded-[15px] mt-[21px]'}>
                                                        <span>{comment?.comment}</span>
                                                    </div>
                                                    {
                                                        isUpdateComment
                                                            ?
                                                            <>
                                                                <CategoriesEditor comment={comment}
                                                                                  category={(prev, current) => {
                                                                                      handleCategory(comment.id, prev, current)
                                                                                  }}
                                                                                  subCategory={(category, current) => {
                                                                                      handleSubCategory(comment.id, category, current)
                                                                                  }}
                                                                />
                                                            </>
                                                            :
                                                            <>
                                                                <div className={'flex mt-[30px]'}>
                                                                    <div className={'w-5/12 flex flex-col '}>
                                                                        {
                                                                            comment.commentTypes.map((commentType, idx) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`${commentType.name}_${idx}`}
                                                                                        className={'last:border-b-[#21243A] flex flex-col h-[100px] relative   gap-1 flex-col border-b border-b-[#6C7094] pt-[10px] pb-[10px]'}>
                                                                                        <span className={'text-[#6C7094]'}>Категория</span>
                                                                                        <span className={'flex items-center'}>{reference[commentType.name]}</span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <div className={'w-7/12 flex flex-col'}>
                                                                        {
                                                                            comment.commentTypes.map((commentType, idx) => {
                                                                                return (
                                                                                    <div
                                                                                        key={`${commentType.value}_${idx}`}
                                                                                        className={'flex gap-1 h-[100px] flex-col border-b border-b-[#6C7094] pt-[10px] last:border-b-[#21243A]'}>
                                                                                        <span
                                                                                            className={'text-[#6C7094]'}>Подкатегория</span>
                                                                                        <span>{commentType.value.length === 0 ? '-' : commentType.value.map(v => reference[v]).join(', ')}</span>
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </>
                                                    }

                                                    {
                                                        comment.statusInTicket === 'NOT_PROCESSED'
                                                            ?
                                                            <>
                                                                <Delivery problemOwners={comment.problemOwners}
                                                                          update={e => {
                                                                              updateCommentProblem(comment.id, e)
                                                                          }}
                                                                          comment={comment.id}/>
                                                                <div className={'mt-[60px] flex justify-between'}>
                                                                    <button
                                                                        className={' px-[33px] py-[18px] border rounded-[15px]'}
                                                                        onClick={(e) => {
                                                                            handleChangeButton(comment.id, e)
                                                                        }}>
                                                                        {isUpdateComment ? 'Сохранить' : 'Редактировать'}
                                                                    </button>
                                                                </div>
                                                            </>
                                                            : null
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    ticketData.ticketStatus === 'OPEN'
                                        ? <button
                                            className={'w-[288px]  ml-[121px] bg-[#F62E46] h-[60px] px-[33px] py-[18px] border rounded-[15px]'}
                                            onClick={handleSubmitRequest}>
                                            Отправить обращение
                                        </button>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col ml-[40px] w-[450px] '}>
                        {/*STORY SECTION*/}
                        <div className={'h-[461px] bg-[#21243A] text-white px-[29px] py-[30px] rounded-[15px]'}>
                            <h1 className={'text-white text-[32px]'}>Статус доставки</h1>
                            <div className={'flex flex-col gap-[20px] mt-[30px]'}>
                                {
                                    Object.entries(deliveryStatus).map(([k, v], idx) => {
                                        moment.locale('ru-RU')
                                        return (
                                            <div key={idx}>
                                                {
                                                    deliveryStatus[k] &&
                                                    <div className={'flex gap-[16px] items-start h-[40px]'}>
                                                        <img src={elipse}/>
                                                        <div className={'flex-col flex'}>
                                                            <span>{k}</span>
                                                            <span
                                                                className={'text-[#6C7094]'}>{moment(deliveryStatus[k]).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        {/*OWNER INFO*/}
                        <div className={'text-white px-[30px] py-[30px] mt-[26px] bg-[#21243A] rounded-[15px]'}>
                            <div className={'flex-col flex gap-[18px]'}>
                                <span className={'text-[32px]'}>Вендор</span>
                                <div className={'flex flex-col'}>
                                    <span className={'text-[#6C7094]'}>Наименование</span>
                                    {
                                        singleVendor &&
                                        <span>{singleVendor[0].name}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*MACHINE INFO*/}
                        {
                            ticketData?.vend &&
                            <div className={'text-white px-[30px] py-[30px] mt-[26px] bg-[#21243A] rounded-[15px]'}>

                                <div className={'flex-col flex gap-[18px]'}>
                                    <div className={'flex justify-between'}>
                                        <div className={'flex flex-col text-white '}>
                                            <span className={'text-[32px]'}>Постамат</span>
                                            <span>#{ticketData.vend[0].externalId}</span>
                                        </div>
                                        <div className={''}>
                                            <button
                                                className={'py-[11px] px-[25px] border border-white bg-[#21243A] rounded-[15px]'}>
                                                {/*<img alt={'#'} />*/}
                                                <span>На карте</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>Вендор</span>
                                        {
                                            <span>{postamatVendor?.name}</span>
                                        }

                                    </div>
                                    <div className={'flex flex-col'}>
                                        <span className={'text-[#6C7094]'}>Адрес</span>
                                        <span>{ticketData.vend[0].location.address}</span>
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            }
        </>

    );
};
export default Ticket;
