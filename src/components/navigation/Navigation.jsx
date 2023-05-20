import React from 'react';
import {Link} from "react-router-dom";

const Navigation = () => {
    return(
        <nav className={'w-1/6 items-center flex flex-col h-screen border border-t-0 border-r-primary bg-secondary'}>
            <h1 className={'text-white'}>Постаматинг LOGO</h1>
            <ul className={'flex flex-col items-center'}>
                <li className={'text-white p-2 cursor-pointer hover:text-gray-400'}>
                    <Link to={'/registration'}>Регистрация</Link>
                </li>
                <li className={'text-white p-2 cursor-pointer hover:text-gray-400'}>
                    <Link to={'/view'}>Просмотр</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;