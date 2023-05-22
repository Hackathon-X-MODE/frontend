import React, {useState} from 'react';
import {useGetVendorsQuery} from "../../redux/postamatApi";
import {Link} from "react-router-dom";

import edit from '../../assets/ico/vendors/edit.svg'
import reg from '../../assets/ico/vendors/reg.svg'
import search from '../../assets/ico/vendors/search.svg'
import postaIco from '../../assets/ico/vendors/postaIco.svg'
import VendorUpdate1 from "../vendor/VendorUpdate1";

const Vendors = (props) => {
    const {data = [], isLoading} = useGetVendorsQuery()
    const [isActive, setActive] = useState(true)

    if (isLoading) return  <div>Loading data....</div>
    return(
        <div className={'w-full flex flex-col gap-5 px-[77px] py-[48px] font-primary max-h-screen overflow-y-scroll'}>
            <div className={'flex justify-between'}>
                <button className={'w-max-[290px] flex gap-5 text-white px-[20px] py-[18px] border rounded-[15px] text-[18px] items-center '}>
                    <img src={reg} />
                    <span className={'text-[18px] translate-y-1'}>Регистрация вендора</span>
                </button>
                <div className={' border w-[450px] rounded-[15px] flex gap-5 items-center px-[20px] py-[20px] border-[#6C7094] text-white'}>
                    <img src={search}/>
                    <input className={'outline-0 bg-transparent translate-y-0.5 text-[18px]'} placeholder={'Поиск по вендорма...'}/>
                </div>
            </div>
            {
                data &&
                <ul className={'w-full flex gap-[40px] flex-wrap justify-between'}>
                    {
                        data.map((vendor) => {
                            return(
                                <VendorUpdate1 key={vendor.id} vendor={vendor} />
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default Vendors;