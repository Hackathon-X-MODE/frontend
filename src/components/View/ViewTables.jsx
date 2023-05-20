import React from 'react';
import {Link} from "react-router-dom";

const ViewTables = (props) => {
    return(
        <ul className={'flex gap-2 flex-wrap rounded bg-third m-2'}>
            <li className={'p-5'}>
                <Link className={' border border-secondary text-center cursor-pointer rounded p-5 bg-white'} to={'/view/vendors'}>Вендоры</Link>
            </li>
            <li className={'p-5'}>
                <Link className={' border border-secondary text-center cursor-pointer rounded p-5 bg-white'} to={'#'}>Постоматы</Link>
            </li>
        </ul>
    )
}

export default ViewTables;