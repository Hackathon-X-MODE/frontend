import React from 'react';
import {Link} from "react-router-dom";
import whiteStar from '../../../assets/ico/comments/whiteStar.svg'
import transparent from '../../../assets/ico/comments/transparentStar.svg'


const CommentsBody = ({comments}) => {
    const status = {
        'POSITIVE': 'bg-gradient-positive',
        'NEGATIVE': 'bg-gradient-negative',
        'NEUTRAL': 'bg-gradient-neutral',
    }
    // console.log(comments)
    return(
        <div className={'flex flex-col gap-2'}>
            {
                comments.map((comment) => {
                    const color = Object.entries(status).map(([k,v]) =>{
                        if (k === comment.comment.mood) {
                            return status[k]
                        } else {
                            return null
                        }
                    })
                    const crop = color.filter((i) => i !== null)
                    return(
                        <Link key={comment.comment.id} to={`#`} className={`flex flex-col ${crop} w-full font-primary justify-around gap-2 text-white px-[30px] py-[24px] text-[18px] rounded-[15px] hover:bg-[#373A54] `} >
                            <div className={'flex w-full pb-[10px] border-b border-b-gray-500'}>
                                <div className={' w-8/12 text-[32px] translate-y-0.5'}>Яндекс Маркет</div>
                                <div className={' w-2/12 text-center translate-x-[30px] translate-y-[5px]'}>
                                    <div className={'flex gap-[5px]'}>
                                        {
                                            comment.comment.rate === 5
                                                ?
                                                [...Array(5)].map((x, idx) => {
                                                    return(
                                                        <div key={`${idx}_${comment.comment.id}`}  className={'w-[27px] h-[27px]'}>
                                                            <img src={whiteStar}/>
                                                        </div>
                                                    )
                                                })
                                                :
                                                <>
                                                    {
                                                        [...Array(comment.comment.rate)].map((x, idx) => {
                                                            return(
                                                                <div key={`${idx}_${comment.comment.mood}`}  className={'w-[27px] h-[27px]'}>
                                                                    <img src={whiteStar}/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        [...Array(5 - comment.comment.rate)].map((x, idx) => {
                                                            return(
                                                                <div key={`${idx}_${comment.comment.rate}`} className={'w-[27px] h-[27px]'}>
                                                                    <img src={transparent}/>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className={' w-2/12 text-center translate-x-[20px] text-[32px]'}>{new Date(comment.comment.createDate).toLocaleDateString()}</div>
                            </div>
                            <div className={'translate-y-0.5 text-[16px]'}>{comment.comment.comment}</div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default CommentsBody;