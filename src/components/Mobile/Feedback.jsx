import React, {useState} from 'react';
import mobileLogo from '../../assets/ico/mobile/logoMobile.svg'
import mobileStarWhite from '../../assets/ico/mobile/mobileStartWhite.svg'
import mobileStar from '../../assets/ico/mobile/star2.svg'
import photo from '../../assets/ico/mobile/photo.svg'
import {useCreateCommentMutation} from "../../redux/postamatApi";
import queryString from "query-string";
import {useLocation, useParams} from "react-router-dom";
import Loader from "../loader/Loader";



const Feedback = (props) => {
    const {code} = useParams()
    const { search } = useLocation()
    const values = queryString.parse(search)
    const [createRequest, {isSuccess}] = useCreateCommentMutation()

    const [rate, setRate] = useState()
    const [area, setArea] = useState()

    const handleUserRequest = () => {
        if (rate !== undefined || area !== undefined) {
            createRequest({
                "source": Object.keys(values)[0].toUpperCase(),
                "code": code,
                "comment": area,
                "rate": rate,
                "types": [],
            })
        } else {
            alert('Комментарий или Рейтинг не были заполнены')
        }
    }
    if (isSuccess) return <Loader />
    return(
        <div className={'w-full flex flex-col text-[18px] text-white font-primary'}>
            <div className={'mt-[59px] mb-[29px] px-[30px]'}>
                <div className={'flex items-center justify-center'}>
                    <img src={mobileLogo} />
                </div>
            </div>
            <div className={'h-screen bg-[#101427] flex flex-col px-[30px]'}>
                <div className={'rounded-[15px] border border-[#373A54] flex py-[19px] px-[19px] items-center  mt-[28px] '}>
                    {/*<div className={'w-[50px] h-[50px] rounded-[10px] bg-[#5C5F7E]'}>*/}

                    {/*</div>*/}
                    <div className={'flex flex-col ml-[22px]'}>
                        <span>г. Москва, м. Первомайская, Измайловский бульвар, д. 43</span>
                        <span className={'text-[#6C7094] text-[14px] '}>19.05.2023</span>
                    </div>
                </div>

                <div className={'flex flex-col mt-[30px]'}>
                    <span className={'text-[32px]'}>Мы ценим <br />ваше мнение!</span>
                    <div className={'mt-[33px] rounded-[15px] py-[20px] px-[45px] bg-[#21243A] flex gap-[10px] items-center justify-center'}>

                        {
                            rate
                            ?
                                rate === 5
                                ?<>
                                        {
                                            [...Array(5)].map(x =>{
                                                return (
                                                    <div className={''}>
                                                        <img src={mobileStar} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                                :
                                    <>
                                        {
                                            [...Array(rate)].map(x => {
                                                return (
                                                    <div className={''}>
                                                        <img src={mobileStar} />
                                                    </div>
                                                )
                                            })
                                        }
                                        {
                                            [...Array(5 - rate)].map(x => {
                                                return (
                                                    <div className={''}>
                                                        <img src={mobileStarWhite} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </>
                            : <>
                                    {
                                        [...Array(5)].map((i, idx) =>{
                                            return(
                                                <div className={''}>
                                                    <img  name={`${idx+1}`} onClick={() => setRate(idx+1)} src={mobileStarWhite} />
                                                </div>
                                            )
                                        })
                                    }
                            </>
                        }
                    </div>
                    <div className={'py-[19px] px-[19px] bg-[#21243A] mt-[20px] rounded-[15px]'}>
                        <textarea onChange={(e) => setArea(e.target.value)} className={'w-full bg-transparent resize-none'} placeholder={'Поделитесь впечатлениями о товаре и работе постамата:'} />
                    </div>

                    <div className={'flex flex-col gap-[20px] mt-[20px]'}>
                        <div className={'w-[60px] h-[80px] bg-[#21243A] flex justify-center rounded-[10px]'}>
                            <img  className={'translate-y-6 translate-x-0.5 w-[30px] h-[30px]'} src={photo}/>
                        </div>
                        <span className={'text-[#5C5F7E] text-[13px]'}>Максимум 3 фото</span>
                    </div>

                    <button onClick={handleUserRequest} className={'w-full mt-[50px] bg-[#F62E46] text-center rounded-[15px] py-[15px]'}>Отправить</button>

                </div>
            </div>

        </div>
    )
}

export default Feedback;