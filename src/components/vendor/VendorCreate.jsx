import React, {useState} from 'react';

const VendorCreate = ({isRegistrationVendor ,updateInput, handleForm, registrationData}) => {


    return(
        <>
            {/*Заглушка*/}
            <div className={`absolute h-screen w-full bg-[#0A0C1D] top-0  -z-10 ${isRegistrationVendor ? ' opacity-60 z-20':'opacity-0'} transition duration-500 ease-in-out`}>
            </div>
            {/*Заглушка*/}
            <div className={`z-50 absolute right-0 top-0 w-[533px] h-screen text-white bg-[#373A54] opacity-100 ${isRegistrationVendor ? '  translate-x-0':' translate-x-[500px]'} transition duration-500 ease-in-out `}>
                <form
                    onSubmit={(e) => handleForm(e)}
                    className={
                        "absolute w-[450px] h-[602px] flex flex-col  px-[40px] top-[240px] font-primary text-[18px]"
                    }
                >
                <span className={" text-[32px] "}>
                    Регистрация Вендора
                </span>
                    <div className={'flex flex-col mt-[33px]'}>
                        <label className={'ml-[35px]'}>Буквенный код</label>
                        <input
                            className={'w-[450px] h-[60px] px-[35px] text-[#373A54] bg-[#5C5F7E] rounded-[15px]'}
                            placeholder={'Введите данные'}
                            required
                            name={"code"}
                            value={registrationData.code}
                            onChange={(e) => updateInput(e)}
                        />
                    </div>
                    <div className={'flex flex-col mt-[22px]'}>
                        <label className={'ml-[35px]'}>Наименовани</label>
                        <input
                            className={'w-[450px] h-[60px] px-[35px] text-[#373A54] bg-[#5C5F7E] rounded-[15px]'}
                            placeholder={'Введите данные'}
                            required
                            name={"name"}
                            value={registrationData.name}
                            onChange={(e) => updateInput(e)}
                        />
                    </div>
                    <div className={'flex flex-col mt-[22px]'}>
                        <label className={'ml-[35px]'}>Webhook(URL)</label>
                        <input
                            className={'w-[450px] h-[60px] px-[35px] text-[#373A54] bg-[#5C5F7E] rounded-[15px]'}
                            placeholder={'Введите данные'}
                            required
                            type={"url"}
                            name={"webhook"}
                            value={registrationData.webhook}
                            onChange={(e) => updateInput(e)}
                        />
                    </div>
                    <div className={'flex flex-col mt-[22px]'}>
                        <label className={'ml-[35px]'}>Реквезиты</label>
                        <input
                            className={'w-[450px] h-[60px] px-[35px] text-[#373A54] bg-[#5C5F7E] rounded-[15px]'}
                            placeholder={'Введите данные'}
                            required
                            name={"legalEntity"}
                            value={registrationData.legalEntity}
                            onChange={(e) => updateInput(e)}
                        />
                    </div>
                    <button
                        className={
                            "w-[196px] h-[60px]  bg-[#F62E46] mt-[50px] rounded-[15px] p-2 rounded text-third hover:text-white hover:bg-secondary duration-700 ease-in-out "
                        }
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </>
    )
}

export default VendorCreate;