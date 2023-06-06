import React from 'react';
import TicketDescriptionHeader from "./TicketDescriptionHeader";
import TicketCommentContent from "./TicketCommentContent";
import Categories from "./category/Categories";

const TicketComment = ({ticket, order, comment}) => {
    // console.log(comment)
    return(
        <div className={'w-full'}>
            <TicketDescriptionHeader
                fullName={order.person?.fullName}
                createdDate={comment.createDate}
                mood={comment.mood}
                rate={comment.rate}
            />
            <TicketCommentContent comment={comment.comment} />
            <Categories comment={comment} order={order} />
        </div>
    )
}

export default TicketComment;