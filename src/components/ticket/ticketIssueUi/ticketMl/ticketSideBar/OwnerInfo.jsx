import React from 'react';

const OwnerInfo = ({vendor}) => {
    return(
        <div className={'text-white px-[30px] py-[30px] mt-[26px] bg-[#21243A] rounded-[15px]'}>
            <div className={'flex-col flex gap-[18px]'}>
                <span className={'text-[32px]'}>Вендор</span>
                <div className={'flex flex-col'}>
                    <span className={'text-[#6C7094]'}>Наименование</span>
                    {
                        vendor &&
                        <span>{vendor.name}</span>
                    }
                </div>
            </div>
        </div>
    )
}

export default OwnerInfo;