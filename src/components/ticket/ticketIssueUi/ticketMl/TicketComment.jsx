import React from 'react';
import TicketDescriptionHeader from "./TicketDescriptionHeader";
import TicketCommentContent from "./TicketCommentContent";
import Categories from "./category/Categories";
import {default as ReactSelect} from "react-select";
import Option from "../../../form/CustomInput";

const placeRef = [
    {value: 'POSTAMAT', label: "Технический отдел Московский постомат"},
    {value: 'MARKET_PLACE', label: "Направить в Маркетплэйс"},
]

const TicketComment = ({ticket, order, comment, selectHandler,activeBtn }) => {
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: '#fff',
            backgroundColor: "#21243A",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,

            backgroundColor: "#5C5F7E",
            height: '50px',
            borderRadius: "15px",
            overflowY: 'scroll',
            border: "1px solid #5C5F7E",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
    };
    // console.log('comment', comment)
    return(
        <div className={'w-full border-b border-b-gray-700 pb-[20px] last:border-b-0'}>
            <TicketDescriptionHeader
                fullName={order.person?.fullName}
                createdDate={comment.createDate}
                mood={comment.mood}
                rate={comment.rate}
            />
            <TicketCommentContent comment={comment.comment} />
            <Categories activeBtn={activeBtn} comment={comment} order={order} selectHandler={selectHandler} />
            <div className={'flex flex-col mt-[10px] ml-[120px] '}>
                <span className={'text-[#6C7094]'}>Место отправки</span>
                <ReactSelect
                    isMulti={true}
                    options={placeRef}
                    components={{
                        Option
                    }}
                    placeholder={'Место отправки'}
                    value={comment.problemOwners}
                    styles={customStyles}
                    onChange={(e) => selectHandler(e, comment.id,'item','delivery')}
                />
            </div>
        </div>
    )
}

export default TicketComment;