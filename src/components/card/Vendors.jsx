import React from 'react';
import {useGetVendorsQuery} from "../../redux/postamatApi";
import {Link} from "react-router-dom";

const Vendors = (props) => {
    const {data = [], isLoading} = useGetVendorsQuery()

    if (isLoading) return  <div>Loading data....</div>
    return(
        <div className={'w-5/6 flex flex-col gap-5'}>
            <h1 className={'text-center text-4xl font-bold'}>Вендоры</h1>
            {
                data &&
                <ul className={'w-full flex gap-3 flex-wrap p-2'}>
                    {
                        data.map((vendor) => {
                            return(
                                <Link
                                    to={`/view/vendors/${vendor.id}`}
                                    className={'flex flex-col h-fit p-2 gap-2 rounded bg-white cursor-pointer hover:bg-secondary hover:text-white transition duration-500 ease-in-out'}
                                    key={vendor.id}
                                >
                                    <div className={'text-sm font-bold'}>Код: {vendor.code}</div>
                                    <div className={'text-lg '}>Наименование: {vendor.name}</div>
                                    <div className={'text-sm '}>Webhook: {vendor.webhook}</div>
                                    <div className={'text-sm '}>Реквезиты: {vendor.legalEntity}</div>
                                </Link>
                            )
                        })
                    }
                </ul>
            }
        </div>
    )
}

export default Vendors;