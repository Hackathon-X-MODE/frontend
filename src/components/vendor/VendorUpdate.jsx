import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useGetVendorByIdQuery, useUpdateVendorMutation} from "../../redux/postamatApi";
import Input from "../form/Input";

const VendorUpdate = (props) => {
    const history = useHistory()
    const {id} = useParams()
    const {data = [], isLoading} = useGetVendorByIdQuery(id)
    const [updateVendor, {isSuccess, isError}] = useUpdateVendorMutation()
    const [vendorData, setVendorData] = useState({})

    useEffect(() => {
        setVendorData({
            code: `${data.code}`,
            legalEntity: `${data.legalEntity}`,
            webhook: `${data.webhook}`,
            name: `${data.name}`
        })
    }, [data])

    if (isLoading) return <div>Loading..</div>

    const updateInput = (e) => {
        setVendorData({
            ...vendorData,
            [e.target.name]: e.target.value
        })
    }

    const handleForm = async(e) => {
        e.preventDefault()
        if (vendorData) {
            console.log(vendorData, id)
            try {
                await updateVendor({...vendorData, id}).unwrap()
            } catch (e) {
                console.log(e)
            }
        }
    }

    if (isSuccess) {
        history.push("/view/vendors")
    }

    return(
        <form onSubmit={handleForm} className={'w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2  p-2'}>
            <span className={'text-center font-bold'}>Обновлние /Вендора/</span>
            <div>
                <label>Буквенный ID</label>
                <Input name={'code'} contentValue={vendorData.code} updateFunc={updateInput} />
            </div>
            <div>
                <label>Наименовани</label>
                <Input name={'name'} contentValue={vendorData.name} updateFunc={updateInput}   />
            </div>
            <div>
                <label>Webhook(URL)</label>
                <Input name={'webhook'} contentValue={vendorData.webhook} updateFunc={updateInput} />
            </div>
            <div>
                <label>Реквезиты</label>
                <Input name={'legalEntity'} contentValue={vendorData.legalEntity} updateFunc={updateInput} />
            </div>
            <button className={'bg-primary p-2 rounded text-third hover:text-white hover:bg-secondary duration-700 ease-in-out '}>Обновить</button>
        </form>
    )
}

export default VendorUpdate;