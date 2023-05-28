import React, {useEffect, useRef} from 'react';
import {useGetImportMutation} from "../../redux/fileApi";

const ImportComponent = (props) => {

    const [getImport] = useGetImportMutation()

    const ref = useRef()

    const handleFileChange = (e) => {
        if (e.target.files) {
            const formData = new FormData();
            formData.append("file", e.target.files[0])
            formData.append("X-External-System-ID", 'YM')
            getImport(formData)
        }
    };



    const handleBtn = () => {
        ref.current.click()
    }

    return(
        <div className={'flex flex-col bg-[#21243A] rounded-[15px] w-[315px] px-[20px]'}>
            <span className={'text-[32px] text-center mt-[29px]'}>Импорт</span>
                <button onClick={handleBtn} className={'h-[60px] w-full mt-[28px] mb-[22px] bg-[#F62E46] rounded-[15px]'}>Загрузить</button>
                <input ref={ref} type="file" onChange={handleFileChange} className={'hidden'} />
        </div>
    )
}

export default ImportComponent;