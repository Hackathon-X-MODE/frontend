import React from 'react';

const Loader = (props) => {
    console.log('КРИНЖ')
    return(
        <div className={'w-[100px] h-[100px]'}>
            <div className={'animate-load w-[100%] h-[100%] h-[100px] bg-no-repeat bg-cover bg-center bg-fixed"'}>

            </div>
        </div>
    )
}

export default Loader;