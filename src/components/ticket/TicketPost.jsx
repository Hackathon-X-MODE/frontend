import React, {forwardRef} from 'react';
import {Link} from "react-router-dom";


const TicketPost = forwardRef((props, ref) => {
    const status = {
        'OPEN': 'bg-gradient-open',
        'PENDING': 'bg-gradient-pending',
        'COMPLETED': 'bg-gradient-completed',
        'CANCELED': 'bg-gradient-closed'

        // background: linear-gradient(270deg, #2496FF 0%, rgba(92, 95, 126, 0) 100%);
    }
    const color = Object.entries(status).map(([k,v]) =>{
       if (k === props.bg) {
           return status[k]
       } else {
           return null
       }
    })
    return(
        <Link to={`/view/tickets/${props.id}`} className={`${color[0]}   w-full py-[20px]  flex items-center text-[32px] rounded-[15px]`} ref={ref}>
            <div className={'flex'}>
                <div className={'w-[166px] ml-[45px]'}>#{props.id}</div>
                <div className={'w-[236px] ml-[115px]'}>{props.name}</div>
            </div>
            <div className={' ml-[269px] flex'}>
                <div className={'w-[180px]'}>{new Date(props.created).toLocaleDateString()}</div>
                <div className={'w-[192px] ml-[52px]'}>{new Date(props.deadline).toLocaleDateString()}</div>
            </div>

        </Link>
    )
})


export default TicketPost;