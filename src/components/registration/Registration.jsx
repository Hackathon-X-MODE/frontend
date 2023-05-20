import React, {useState} from 'react';
import Input from "../form/Input";
import {useAddVendorMutation} from "../../redux/postamatApi";

const Registration = (props) => {
    const [registrationData, setRegistrationData] = useState({
        code: '',
        name: '',
        webhook: '',
        legalEntity: ''
    })

    const [addVendor, {isSuccess, isError}] = useAddVendorMutation()

    const updateInput = (e) => {
        const val = e.target.value
        const name = e.target.name
        setRegistrationData({
            ...registrationData,
            [name]: val
        })
    }

    const handleForm = async (e) => {
        e.preventDefault()
        if (registrationData) {
            try {
                await addVendor({...registrationData}).unwrap()
                setRegistrationData({
                    code: '',
                    name: '',
                    webhook: '',
                    legalEntity: ''
                })
            } catch (e) {
                console.log(e)
            }
        }
    }

    return(
        <>
            {
                isError &&
                <div>
                    Something went wrong
                </div>
            }
            {
                isSuccess &&
                <div>
                    Success
                </div>
            }
            <form onSubmit={handleForm} className={'w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2  p-2'}>
                <span className={'text-center font-bold'}>Регистрация /Вендора/</span>
                <div>
                    <label>Буквенный ID</label>
                    <Input name={'code'} contentValue={registrationData.code} updateFunc={updateInput} />
                </div>
                <div>
                    <label>Наименовани</label>
                    <Input name={'name'} contentValue={registrationData.name} updateFunc={updateInput}   />
                </div>
                <div>
                    <label>Webhook(URL)</label>
                    <Input name={'webhook'} contentValue={registrationData.webhook} updateFunc={updateInput} />
                </div>
                <div>
                    <label>Реквезиты</label>
                    <Input name={'legalEntity'} contentValue={registrationData.legalEntity} updateFunc={updateInput} />
                </div>
                <button className={'bg-primary p-2 rounded text-third hover:text-white hover:bg-secondary duration-700 ease-in-out '}>Отправить</button>
            </form>
        </>
    )
}

export default Registration;