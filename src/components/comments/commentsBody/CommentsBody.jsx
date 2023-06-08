import React from 'react';
import {Link} from "react-router-dom";
import whiteStar from '../../../assets/ico/comments/whiteStar.svg'
import transparent from '../../../assets/ico/comments/transparentStar.svg'


const CommentsBody = ({comments}) => {
    const status = {
        'POSITIVE': 'bg-gradient-open',
        'PENDING': 'bg-gradient-pending',
        'COMPLETED': 'bg-gradient-completed',
        'CANCELED': 'bg-[#373A54] text-gray-500'

    }
    return(
        <div className={'flex flex-col gap-2'}>
            {
                comments.map((comment) => {
                    const color = Object.entries(status).map(([k,v]) =>{
                        if (k === comment.mood) {
                            return status[k]
                        } else {
                            return null
                        }
                    })
                    const crop = color.filter((i) => i !== null)
                    return(
                        <Link key={comment.id} to={`#`} className={`flex flex-col ${crop} w-full font-primary justify-around gap-2 text-white px-[30px] py-[24px] text-[18px] rounded-[15px] hover:bg-[#373A54] `} >
                            <div className={'flex w-full pb-[10px] border-b border-b-gray-500'}>
                                <div className={' w-8/12 text-[32px] translate-y-0.5'}>Яндекс Маркет</div>
                                <div className={' w-2/12 text-center translate-x-[30px] translate-y-[5px]'}>
                                    <div className={'flex gap-[5px]'}>
                                        {
                                            comment.rate === 5
                                                ?
                                                [...Array(5)].map((x, idx) => {
                                                    return(
                                                        <div key={`${idx}_${comment.id}`}  className={'w-[27px] h-[27px]'}>
                                                            <img src={whiteStar}/>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <>
                                                    {
                                                        [...Array(comment.rate)].map((x, idx) => {
                                                            return(
                                                                <div key={`${idx}_${comment.mood}`}  className={'w-[27px] h-[27px]'}>
                                                                    <img src={whiteStar}/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        [...Array(5 - comment.rate)].map((x, idx) => {
                                                            return(
                                                                <div key={`${idx}_${comment.rate}`} className={'w-[27px] h-[27px]'}>
                                                                    <img src={transparent}/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className={' w-2/12 text-center translate-x-[20px] text-[32px]'}>{new Date(comment.createDate).toLocaleDateString()}</div>
                            </div>
                            <div className={'translate-y-0.5 text-[16px]'}>{comment.comment}</div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default CommentsBody;