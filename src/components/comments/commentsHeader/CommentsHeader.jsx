import React from 'react';
import ascDesc from '../../../assets/comments/deskAsc.svg'

const CommentsHeader = ({total, handleFilter, status}) => {
    return(
        <div className={'sticky top-0 bg-[#21243A] z-10 flex w-full justify-around  gap-2  text-white text-[18px] px-[30px] py-[24px]'}>
            <div className={'w-6/12 px-[7px] '}>Всего комментариев: {total}</div>
            <div className={'w-2/12 text-center px-[7px]'}>Вендор</div>
            <button onClick={(e) => handleFilter(e)} name={'rate'} className={`w-2/12 ${status === 'rate' ? 'bg-[#5C5F7E]': '' } rounded-[12px] px-[7px] text-center flex items-center gap-[5px]`}><img src={ascDesc} />Оценка</button>
            <button onClick={(e) => handleFilter(e)} name={'createDate'} className={`w-2/12 text-center ${status === 'createDate' ? 'bg-[#5C5F7E]': '' } rounded-[12px] px-[7px] translate-x-[20px] flex items-center gap-[5px]`}><img src={ascDesc} />Дата публикация</button>
        </div>
    )
}

export default CommentsHeader;