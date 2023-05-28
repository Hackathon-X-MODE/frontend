import React, {forwardRef} from 'react';
import {Link} from "react-router-dom";


const TicketPost = forwardRef((props, ref) => {
    const status = {
        'OPEN': 'bg-gradient-open',
        'PENDING': 'bg-gradient-pending',
        'COMPLETED': 'bg-gradient-completed',
        'CANCELED': 'bg-[#373A54] text-gray-500'

        // background: linear-gradient(270deg, #2496FF 0%, rgba(92, 95, 126, 0) 100%);
    }
    const color = Object.entries(status).map(([k,v]) =>{
       if (k === props.bg) {
           return status[k]
       } else {
           return null
       }
    })
    const crop = color.filter((i) => i !== null)
    return(
        <Link to={`/view/tickets/${props.id}`} className={`${crop} w-full py-[20px]  flex items-center text-[32px] rounded-[15px] hover:bg-[#373A54] `} ref={ref}>
            <div className={'flex'}>
                <div className={'w-[166px]  translate-y-0.5 ml-[45px]'}>#{props.id}</div>
                <div className={'w-[236px] translate-y-0.5 ml-[115px]'}>{props.name}</div>
            </div>
            <div className={' ml-[269px] flex'}>
                <div className={'w-[180px] translate-y-0.5'}>{new Date(props.created).toLocaleDateString()}</div>
                <div className={'w-[192px] ml-[52px] translate-y-0.5'}>{new Date(props.deadline).toLocaleDateString()}</div>
            </div>

        </Link>
    )
})


export default TicketPost;