import React from 'react';

const CommentsStatus = ({status, handleFilter}) => {
    return(
        <div className={'absolute right-[135px]  overflow-y-hidden  bg-[#373A54]'}>
            <div className={` w-[70px] h-[150px]  text-white text-[18px] flex ${status === '' ? 'bg-[#21243A]': 'bg-[#101427]'} rounded-[15px] rounded-tl-[0px] rounded-bl-[0px] `}>
                <div className={'flex flex-col items-center justify-center '}>
                    <button name={''} onClick={(e) => handleFilter(e)}  className={'rotate-[90deg] -translate-x-1.5'}>Отзывы</button>
                    {/*{*/}
                    {/*    status === 'OPEN' ? <div className={'rotate-[90deg] w-[20px] h-[20px] bg-[#2496FF] shadow-blue rounded-full translate-y-11 -translate-x-1.5'}></div> :null*/}
                    {/*}*/}
                </div>
            </div>
            <div className={`relative mt-[7px] w-[70px] h-[200px] ${status === 'POSITIVE' ? 'bg-[#21243A]': 'bg-[#101427]'}   text-white text-[18px] flex flex-wrap rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]`}>
                <div className={'flex flex-col items-center justify-center'}>
                    <button name={'POSITIVE'} onClick={(e) => handleFilter(e)}  className={'rotate-[90deg] w-[120px] -translate-x-[25px]'}>Положительные</button>
                    {/*{*/}
                    {/*    status === 'PENDING' ? <div className={'rotate-[90deg] w-[20px] h-[20px] bg-[#FF9900] shadow-yel rounded-full translate-y-[55px] -translate-x-[25px]'}></div> : null*/}
                    {/*}*/}
                </div>
            </div>
            <div className={`mt-[7px] w-[70px] h-[180px] text-white text-[18px] ${status === 'NEGATIVE' ? 'bg-[#21243A]': 'bg-[#101427]'} flex  rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]`}>
                <div className={'flex flex-col  items-center justify-center '}>
                    <button name={'NEGATIVE'} onClick={(e) => handleFilter(e)}   className={'rotate-[90deg] -translate-x-5'}>Негативные</button>
                    {/*{*/}
                    {/*    status === 'COMPLETED' ? <div className={'rotate-[90deg] w-[20px] h-[20px] bg-[#3FC955] shadow-green rounded-full translate-y-[55px] -translate-x-[20px]'}></div> : null*/}
                    {/*}*/}
                </div>
            </div>
            <div className={`mt-[7px] w-[70px] h-[180px] text-white text-[18px] flex ${status === 'NEUTRAL' ? 'bg-[#21243A]': 'bg-[#101427]'} rounded-[15px] rounded-tl-[0px] rounded-bl-[0px]`}>
                <div className={'flex  flex-col items-center justify-center '}>
                    <button name={'NEUTRAL'} onClick={(e) => handleFilter(e)}   className={'rotate-[90deg] -translate-x-5'}>Нейтральные</button>
                    {/*{*/}
                    {/*    status === 'CANCELED' ? <div className={'rotate-[90deg] w-[20px] h-[20px] bg-[#5D6182] shadow-gry rounded-full translate-y-[55px] -translate-x-[20px]'}></div> : null*/}
                    {/*}*/}
                </div>
            </div>
        </div>
    )
}

export default CommentsStatus;