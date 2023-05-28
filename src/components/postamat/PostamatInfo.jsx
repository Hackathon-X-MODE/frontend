import React from 'react';
import Loader from "../loader/Loader";

const PostamatInfo = ({isActive,postamatData}) => {
    console.log(postamatData)
    return(
        <div className={`${isActive ? 'translate-x-[0px] ' : 'translate-x-[1000px]'} transition duration-500 ease-in-out absolute font-primary text-[18px] flex flex-col w-[330px] text-white h-screen right-0 bg-[#373A54]  top-0 bg-[##373A54] px-[25px] py-[54px]`}>
            {
                postamatData ? <>
                    <div className={'flex flex-col text-[32px] border-b border-b-[#6C7094] pb-[27px]'}>
                        <span>Постамат</span>
                        <span>№{postamatData.externalId}</span>
                    </div>
                    <div className={'flex flex-col mt-[30px] gap-[15px]'}>
                        <div className={'flex flex-col'}>
                            <span className={'text-[#6C7094]'}>Вендор</span>
                            <span className={''}>{postamatData[0]?.name}</span>
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-[#6C7094]'}>Количество ячеек</span>
                            <span className={''}>{postamatData.size}</span>
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-[#6C7094]'}>Загруженность постомата</span>
                            <span className={''}>-</span>
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-[#6C7094]'}>Последняя дата обращения</span>
                            <span className={''}>{new Date(postamatData.lastDateActivity).toLocaleString()}</span>
                        </div>
                        <div className={'flex flex-col'}>
                            <span className={'text-[#6C7094]'}>Установка постамата</span>
                            <span className={''}>{new Date(postamatData.postamatInit).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <a href={`${postamatData.videoLink}`} className={'bg-[#F62E46] py-[18px] rounded-[15px] mt-[60px] text-center'}>Трансляция с камеры</a>
                </>
                    : <Loader />
            }

        </div>
    )
}

export default PostamatInfo;