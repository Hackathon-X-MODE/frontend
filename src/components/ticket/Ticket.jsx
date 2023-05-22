import React from 'react';
import edit from "../../assets/ico/vendors/edit.svg";



const Ticket = (props) => {
    return(
        <>
            <h1 className={'text-4xl text-white'}>TEST VERSION</h1>
            <li
                className={
                    "w-[450px] bg-[#21243A] flex flex-col  pt-[25px] rounded-[15px] font-primary absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  "
                }
                // key={vendor.id}
            >
                <div className={"px-[20px] mt-[30px]"}>
                    <div className={"flex flex-col "}>
                        <div className={"flex flex-col gap-[5px] "}>
                            <label className={"text-white text-[18px] ml-[20px]"}>
                                Статус
                            </label>
                            <div className={"flex justify-between "}>
                                <input
                                    // name={"code"}
                                    // onChange={updateDataFunc}
                                    // disabled={isActive}
                                    className={
                                        "w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]"
                                    }
                                    defaultValue={'Open'}
                                />
                                <img src={edit} className={"self-center"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] mt-[30px]"}>
                    <div className={"flex flex-col "}>
                        <div className={"flex flex-col gap-[5px] "}>
                            <label className={"text-white text-[18px] ml-[20px]"}>
                                Постамат Номер(или чета такое)
                            </label>
                            <div className={"flex justify-between "}>
                                <input
                                    // name={"code"}
                                    // onChange={updateDataFunc}
                                    // disabled={isActive}
                                    className={
                                        "w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]"
                                    }
                                    defaultValue={'123-456-789...'}
                                />
                                <img src={edit} className={"self-center"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] mt-[30px]"}>
                    <div className={"flex flex-col "}>
                        <div className={"flex flex-col gap-[5px] "}>
                            <label className={"text-white text-[18px] ml-[20px]"}>
                                Создатель заявки
                            </label>
                            <div className={"flex justify-between "}>
                                <input
                                    // name={"code"}
                                    // onChange={updateDataFunc}
                                    // disabled={isActive}
                                    className={
                                        "w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]"
                                    }
                                    defaultValue={'Иванов Иван Иванович'}
                                />
                                <img src={edit} className={"self-center"} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"px-[20px] mt-[30px]"}>
                    <div className={"flex flex-col "}>
                        <div className={"flex flex-col gap-[5px] "}>
                            <label className={"text-white text-[18px] ml-[20px]"}>
                                Коментарии
                            </label>
                            Тут значит коментарии как то разметсить надо где-то
                            <div className={'flex flex-col   border rounded p-2 items-center'}>
                                <div className={' w-full flex text-white justify-between'}>
                                    <span>Статус: <b className={'text-red-800'}>NEGATIVE</b></span>
                                    <span>Оценка: 1</span>
                                </div>

                                <div className={' w-full flex flex-col text-white text-[12px]'}>
                                    <span>Cтатус коментариев: <b className={'text-yellow-500'}>NOT_PROCESSED</b></span>
                                    <span>Описание проблемы <b className={'text-yellow-500'}>MARKET_PLACE, POSTAMAT</b></span>
                                </div>
                                <div className={'border w-full p-2'}>
                                    <div className={' w-full flex flex-col text-white text-[12px]'}>
                                        <span>Описание проблемы Заказа: <b className={'text-yellow-500'}>PACKING</b></span>
                                        <span>Описание проблемы Продукта: <b className={'text-yellow-500'}>DESCRIPTION, QUALITY</b></span>
                                    </div>
                                    <textarea className={'w-full resize-none overflow-y-scroll mt-2'}>Я заказывала в банке 1кг ваниш, а привезли в пакете, уже не первый раз такое!</textarea>
                                    <div className={' w-full flex flex-col text-white text-[12px]'}>
                                        <span>Описание проблемы Заказа: <b className={'text-yellow-500'}>PACKING</b></span>
                                        <span>Описание проблемы Продукта: <b className={'text-yellow-500'}>DESCRIPTION, QUALITY</b></span>
                                    </div>
                                    <textarea className={'w-full resize-none overflow-y-scroll mt-2'}>ОПЯТЬ ХЕРЬ </textarea>
                                </div>
                            </div>
                            <div className={'flex items-center justify-between text-white'}>
                                <span>Deadline: 01.12.2024</span>
                                <span>Дата создания: 29.12.2023</span>

                            </div>
                            {/*<div className={"flex justify-between "}>*/}
                            {/*    <input*/}
                            {/*        // name={"code"}*/}
                            {/*        // onChange={updateDataFunc}*/}
                            {/*        // disabled={isActive}*/}
                            {/*        className={*/}
                            {/*            "w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]"*/}
                            {/*        }*/}
                            {/*        defaultValue={'123-456-789...'}*/}
                            {/*    />*/}
                            {/*    <img src={edit} className={"self-center"} />*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}
export default Ticket;

