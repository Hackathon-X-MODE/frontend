import React, {useEffect, useState} from 'react';
import download from "../../assets/ico/dashboard/download.svg";
import {useGetExportsQuery, useRequestExportsMutation} from "../../redux/postamatApi";

const ExportComponent = (props) => {
    const {data = [], isLoading} = useGetExportsQuery('0',{
        pollingInterval: 5000
    })
    const [updateExports, isFetching, isSuccess] = useRequestExportsMutation()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (isFetching) {
            setLoad(true)
        }
    },[isFetching])

    if (isSuccess) setLoad(false)

    console.log(load)
    return(
        <div className={'flex flex-col px-[20px] py-[24px] mt-[24px] w-[315px] h-[780px] bg-[#21243A] rounded-[15px] overflow-y-scroll'}>
            <div className={'flex flex-col'}>
                <span className={'text-[32px] text-center'}>Экспорт</span>
                <button onClick={updateExports} className={'w-full h-[60px] text-[18px] bg-[#F62E46] rounded-[15px] mt-[18px]'}>Получить данные</button>
            </div>
            <div className={'mt-[44px]'}>
                <div>
                    <span>Дата экспорта</span>
                </div>
                {
                    data.map((files) => {
                        return(
                            <div key={files.id} className={'flex justify-between items-center text-[18px] mt-[15px]'}>
                                <div className={'w-[215px] h-[60px] bg-[#373A54] rounded-[15px] flex justify-center items-center'}>{new Date(files.createDate).toLocaleString()}</div>
                                {
                                    files.path === null
                                        ? <div className={'bg-[#F62E46]  rounded-[10px] w-[40px] h-[40px]' }>
                                        <div className={'translate-x-1 translate-y-1'}>
                                            <svg aria-hidden="true"
                                                 className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                                 viewBox="0 0 100 101" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"/>
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"/>
                                            </svg>
                                        </div>
                                        </div>
                                        : <a href={files.path} target={'_blank'} className={'w-[40px] h-[40px] bg-[#F62E46] rounded-[10px] flex items-center justify-center'}>
                                              <img src={download} />
                                          </a>

                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExportComponent;