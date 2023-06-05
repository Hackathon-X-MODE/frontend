import React from 'react';
import {Link} from "react-router-dom";

const TicketBody = ({tickets}) => {
    const status = {
        'OPEN': 'bg-gradient-open',
        'PENDING': 'bg-gradient-pending',
        'COMPLETED': 'bg-gradient-completed',
        'CANCELED': 'bg-[#373A54] text-gray-500'

        // background: linear-gradient(270deg, #2496FF 0%, rgba(92, 95, 126, 0) 100%);
    }



    // console.log(tickets)
    return(
        <div className={'flex flex-col gap-2'}>
            {
                tickets[0].content.map((ticket) => {
                    const color = Object.entries(status).map(([k,v]) =>{
                        if (k === ticket.ticketStatus) {
                            return status[k]
                        } else {
                            return null
                        }
                    })
                    const crop = color.filter((i) => i !== null)
                    return(
                        <Link key={ticket.id} to={`/view/tickets/${ticket.id}`} className={`flex ${crop} w-full justify-around gap-2 text-white px-[30px] py-[24px] text-[32px] rounded-[15px] hover:bg-[#373A54] `} >
                            <div className={' w-1/4 text-center translate-y-0.5'}>#{ticket.id}</div>
                            <div className={' w-1/4 text-center translate-y-0.5'}>{ticket.order.vendor.name}</div>
                            <div className={' w-1/4 text-center translate-y-0.5'}>{new Date(ticket.createDate).toLocaleDateString()}</div>
                            <div className={' w-1/4 text-center translate-y-0.5'}>{new Date(ticket.deadline).toLocaleDateString()}</div>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default TicketBody;