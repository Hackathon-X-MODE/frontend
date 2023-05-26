import React, {forwardRef} from 'react';


const TicketPost = forwardRef((props, ref) => {

    return(
        <div className={'w-full h-[90px] bg-green-500 flex items-center text-[32px] rounded-[15px]'} ref={ref}>
            <div className={'flex'}>
                <div className={'w-[166px] ml-[45px]'}>#{props.id}</div>
                <div className={'w-[236px] ml-[115px]'}>{props.name}</div>
            </div>
            <div className={' ml-[269px] flex'}>
                <div className={'w-[180px]'}>{new Date(props.created).toLocaleDateString()}</div>
                <div className={'w-[192px] ml-[52px]'}>{new Date(props.deadline).toLocaleDateString()}</div>
            </div>

        </div>
    )
})


export default TicketPost;