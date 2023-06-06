import React from 'react';

const TicketCommentContent = ({comment}) => {
    return(
        <div className={'w-full p-2 text-white font-primary pl-[120px]'}>
            <div className={'w-full bg-[#373A54] p-[20px] rounded-[15px]'}>
                {comment}
            </div>
        </div>
    )
}

export default TicketCommentContent;