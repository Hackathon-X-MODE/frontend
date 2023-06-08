import React from 'react';

const CommentsPagination = ({pageHandler}) => {
    return(
        <div className={'w-full flex items-center justify-center mt-[10px] font-primary gap-5'}>
            <button className={'py-[10px] px-[15px] bg-[#21243A] rounded-[10px] text-white text-[18px]'} onClick={() => pageHandler('prev')}>Prev</button>
            <button className={'py-[10px] px-[15px] bg-[#21243A] rounded-[10px] text-white text-[18px]'} onClick={() => pageHandler('next')}>Next</button>
        </div>
    )
}

export default CommentsPagination;