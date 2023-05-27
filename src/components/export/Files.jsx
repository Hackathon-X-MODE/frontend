import React, {useState} from 'react';
import {useGetExportsQuery, useRequestExportsMutation, useUpdateExportsMutation} from "../../redux/postamatApi";
import FileComponent from "./File";

const Files = (props) => {
    // const {data = [], isLoading} = useGetExportsQuery()
    // const [updateExports] = useRequestExportsMutation()
    //
    // const [file, setFile] = useState();
    //
    // const handleFileChange = (e) => {
    //     if (e.target.files) {
    //         setFile(e.target.files[0]);
    //     }
    // };
    //
    // const handleUploadClick = () => {
    //     if (!file) {
    //         return;
    //     }
    //
    //     const formData = new FormData();
    //     formData.append("file", file)
    //     formData.append("X-External-System-ID", 'YM')
    //     fetch('https://back-hack.bigtows.org/orders/import/xlsx', {
    //         mode: 'no-cors',
    //         method: 'POST',
    //         body: formData
    //     })
    //         .then((res) => alert("Файл успешно отправлен, время обработки зависит от размера"))
    //         .then((data) => console.log(data))
    //         .catch((err) => console.error(err));
    // };

    return (
        <div className={'w-full flex'}>
            {/*<div>*/}
            {/*    <input type="file" onChange={handleFileChange}/>*/}

            {/*    <div>{file && `${file.name} - ${file.type}`}</div>*/}

            {/*    <button onClick={handleUploadClick}>Upload</button>*/}
            {/*</div>*/}


            {/*<div>*/}
            {/*    <div onClick={updateExports}>ЗАКАЗАТЬ</div>*/}
            {/*</div>*/}
            {/*{*/}
            {/*    data.map((item) => {*/}
            {/*        return <FileComponent key={item.id} id={item.id} path={item.path}/>*/}
            {/*    })*/}
            {/*}*/}
        </div>

    )
}

export default Files;