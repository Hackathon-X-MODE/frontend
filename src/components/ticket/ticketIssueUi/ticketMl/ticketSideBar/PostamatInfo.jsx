import React from 'react';
import {Link} from "react-router-dom";

const PostamatInfo = ({vendors, vendorsList}) => {
    console.log(vendors)
    // console.log(vendors, vendorsList)
    let postamatVendor;
    if (vendors && vendorsList){
        postamatVendor = vendorsList.find(vendor=> vendor?.id === vendors?.vendorId)
    }
    return(
        <div className={'text-white px-[30px] py-[30px] mt-[26px] bg-[#21243A] rounded-[15px]'}>
            <div className={'flex-col flex gap-[18px]'}>
                <div className={'flex 2xl:flex-row flex-col 2xl:items-center justify-between'}>
                    <div className={'flex 2xl:flex-col flex-row items-center 2xl:items-stretch 2xl:gap-[0px] gap-[10px] text-white '}>
                        <span className={'text-[32px]'}>Постамат</span>
                        <span className={'2xl: text-[18px] text-[30px]'}>#{vendors.externalId}</span>
                    </div>
                    <div className={'flex'}>
                        <Link
                            to={`/view/postamates?postamate=${vendors.id}`}
                            className={'py-[11px] px-[25px] border border-white bg-[#21243A] rounded-[15px]'}>
                            {/*<img alt={'#'} />*/}
                            <span>На карте</span>
                        </Link>
                    </div>
                </div>
                <div className={'flex flex-col'}>
                    <span className={'text-[#6C7094]'}>Вендор</span>
                    {
                        <span>{postamatVendor?.name}</span>
                    }

                </div>
                <div className={'flex flex-col'}>
                    <span className={'text-[#6C7094]'}>Адрес</span>
                    <span>{vendors?.location?.address}</span>
                </div>
            </div>

        </div>
    )
}

export default PostamatInfo;