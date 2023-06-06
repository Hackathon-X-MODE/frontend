import React from 'react';
import profilePic from '../../../../assets/ico/ticket/profilePic.svg'
import star from "../../../../assets/ico/ticket/star.svg";
import whiteStar from "../../../../assets/ico/ticket/whiteStar.svg";

const TicketDescriptionHeader = ({fullName, createdDate, mood, rate}) => {
    const commentaryStatus = {
        'NEGATIVE': 'Негативный',
        'POSITIVE': 'Положительный',
        'NEUTRAL': 'Нейтральный',
    }
    return(
        <div className={'flex w-full justify-between'}>
            <div className={'flex gap-[28px]'}>
                <div><img className={'w-[90px] h-[90px]'} src={profilePic} /></div>
                <div className={'flex flex-col gap-[5px]'}>
                    <div>{new Date(createdDate).toLocaleDateString()}</div>
                    <div>{fullName}</div>
                </div>
            </div>
            <div className={'flex gap-[30px]'}>
                <div className={'flex'}>
                    {
                        rate === 5
                            ?
                            [...Array(5)].map((x, idx) => {
                                return(
                                    <div key={`${idx}_${createdDate}`}  className={'w-[27px] h-[27px]'}>
                                        <img src={star}/>
                                    </div>
                                )
                            })
                            :
                            <>
                                {
                                    [...Array(rate)].map((x, idx) => {
                                        return(
                                            <div key={`${idx}_${mood}`}  className={'w-[27px] h-[27px]'}>
                                                <img src={star}/>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    [...Array(5 - rate)].map((x, idx) => {
                                        return(
                                            <div key={`${idx}_${rate}`} className={'w-[27px] h-[27px]'}>
                                                <img src={whiteStar}/>
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
                <div className={''}>
                    <span className={'py-[11px] px-[15px] border border-red-600 rounded-[15px]'}>
                        {
                            Object.entries(commentaryStatus).map(([k, v]) => {
                                if (k === mood) {
                                    return commentaryStatus[k]
                                } else {
                                    return null
                                }
                            })
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TicketDescriptionHeader;