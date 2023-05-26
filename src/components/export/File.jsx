import React from 'react';

const File = ({id, path}) => {
    return (
        <>
            <ul className={'bg-white'}>
                <li>ID: {id}</li>
                <li>PATH: {
                    path === null ? 'Не готов' : (
                        <>
                            <a href={"https://back-hack.bigtows.org/comments/exports/" + id} target="_blank">Скачать</a>
                        </>
                    )
                }</li>
            </ul>
        </>
    )
}

export default File;