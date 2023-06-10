import React from 'react';
import ascDesc from '../../../../assets/comments/deskAsc.svg';

const TicketHeader = ({sort, sortMethod, onSort}) => {
    return(
        <div className={'sticky top-0 bg-[#21243A] z-10 flex w-full justify-around  gap-2  text-white text-[18px] px-[30px] py-[24px]'}>
             <div className={'w-1/4 text-center'}>Номер</div>
             <div className={'w-1/4 text-center'}>Вендор</div>
             <button onClick={(e) => onSort(e)} name={'createDate'} className={`w-1/4 ${sortMethod === 'createDate' ? 'bg-[#5C5F7E]': ''} text-center flex items-center gap-[5px] translate-x-[50px] rounded-[12px] px-[7px]`}><img src={ascDesc}/>Дата обращения</button>
             <button onClick={(e) => onSort(e)} name={'deadline'} className={`w-1/4 ${sortMethod === 'deadline' ? 'bg-[#5C5F7E]': ''} text-center flex items-center gap-[5px] translate-x-[50px] rounded-[12px] px-[7px]`}><img src={ascDesc}/>Срок обращения</button>
        </div>
    )
}

export default TicketHeader;