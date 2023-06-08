import React from 'react';

const CommentsHeader = (props) => {
    return(
        <div className={'sticky top-0 bg-[#21243A] z-10 flex w-full justify-around  gap-2  text-white text-[18px] px-[30px] py-[24px]'}>
            <div className={'w-6/12 '}>Все фильтры</div>
            <div className={'w-2/12 text-center'}>Вендор</div>
            <div className={'w-2/12 text-center'}>Оценка</div>
            <div className={'w-2/12 text-center translate-x-[20px]'}>Дата публикация</div>
        </div>
    )
}

export default CommentsHeader;