import React, {useEffect, useState} from 'react';
import edit from "../../assets/ico/vendors/edit.svg";
import postaIco from "../../assets/ico/vendors/postaIco.svg";
import {useUpdateVendorMutation} from "../../redux/postamatApi";

const VendorUpdate1 = ({vendor, handleUpdateVendor}) => {
    const [updateVendor, {isSuccess, isError}] = useUpdateVendorMutation()
    const [isActive, setActive] = useState(true)
    const [vendorData, setVendorData] = useState({})

    useEffect(() => {
        setVendorData({
            id: `${vendor.id}`,
            code: `${vendor.code}`,
            legalEntity: `${vendor.legalEntity}`,
            name: `${vendor.name}`,
            webhook: `${vendor.webhook}`
        })
    },[])

    const updateDataFunc = (e) => {
        setVendorData({
            ...vendorData,
            [e.target.name]: e.target.value
        })
    }

    const handleBtn = async() => {
        if (vendorData) {
            try {
                await updateVendor({...vendorData, id: vendorData.id}).unwrap()
                // setVendorData(null)
            } catch (e) {
                console.log(e)
            }
        }
        setActive(!isActive)
    }

    return(
        <li
            className={'w-[450px] bg-[#21243A] flex flex-col px-[37px] py-[25px] rounded-[15px] font-primary'}
            key={vendor.id}
        >
            <div className={'flex justify-between'}>
                <div className={'flex flex-col w-full'}>
                    <label className={'text-white text-[18px]'}>Наименование</label>
                    <textarea name={'name'} onChange={updateDataFunc} disabled={isActive} className={'w-5/6 bg-transparent text-white outline-0 text-[32px]'} value={vendorData.name}/>
                </div>
                <img src={edit} className={'self-start'} />
            </div>
            <div className={'flex flex-col mt-[70px]'}>
                <div className={'flex flex-col gap-1 '}>
                    <label className={'text-white text-[18px] ml-[20px]'}>Буквенный код</label>
                    <div className={'flex justify-between '}>
                        <input name={'code'} onChange={updateDataFunc} disabled={isActive} className={'w-[340px] px-[18px] py-[10px] bg-transparent text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]'} defaultValue={vendorData.code}/>
                        <img src={edit} className={'self-center'} />
                    </div>
                </div>
            </div>
            <div className={'flex flex-col mt-[20px]'}>
                <div className={'flex flex-col gap-1 '}>
                    <label className={'text-white text-[18px] ml-[20px]'}>Webhook</label>
                    <div className={'flex justify-between '}>
                        <input name={'webhook'} onChange={updateDataFunc} disabled={isActive} className={'w-[340px] px-[18px] py-[10px] bg-transparent text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]'} defaultValue={vendorData.webhook}/>
                        <img src={edit} className={'self-center'} />
                    </div>
                </div>
            </div>
            <div className={'flex flex-col mt-[20px]'}>
                <div className={'flex flex-col gap-1 '}>
                    <label className={'text-white text-[18px] ml-[20px]'}>Реквизиты</label>
                    <div className={'flex justify-between '}>
                        <input name={'legalEntity'} onChange={updateDataFunc} disabled={isActive} className={'w-[340px] px-[18px] py-[10px] bg-transparent text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px]'} defaultValue={vendorData.legalEntity}/>
                        <img src={edit} className={'self-center'} />
                    </div>
                </div>
            </div>
            <div className={'flex justify-between gap-[20px] mt-[50px]'}>
                <button onClick={handleBtn} className={'py-[18px] px-[25px] w-[200px] text-white text-[18px] bg-[#F62E46] rounded-[15px]'}>{isActive ? 'Редактивровать' : 'Обновить'}</button>
                <button className={'flex items-center justify-center py-[18px] px-[25px] gap-[10px] text-white text-[18px] bg-transparent rounded-[15px] border'}>
                    <img src={postaIco}/>
                    <span>Постаматы</span>
                </button>
            </div>
            {/*<div className={'text-sm font-bold'}>Код: {vendor.code}</div>*/}
            {/*<div className={'text-lg '}>Наименование: {vendor.name}</div>*/}
            {/*<div className={'text-sm '}>Webhook: {vendor.webhook}</div>*/}
            {/*<div className={'text-sm '}>Реквезиты: {vendor.legalEntity}</div>*/}
            {/*<Link className={'bg-primary p-1 w-[100px] rounded text-white text-center'} to={`/view/vendors/update/${vendor.id}`}>Обновить</Link>*/}
            {/*<Link className={'bg-primary p-1 w-[100px] rounded text-white text-center'} to={`/view/vendors/${vendor.id}`}>Постоматы</Link>*/}
        </li>
    )
}

export default VendorUpdate1;