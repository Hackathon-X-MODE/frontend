import React from 'react';
import searchBlack from '../../assets/ico/postamates/serchBlack.svg'

const PostamatFilter = ({vendors, handleFilter}) => {
    // console.log(vendors)
    return(
        <div className={'absolute top-0 left-0 h-screen w-[330px]  text-white z-50 px-[25px] py-[54px] bg-[#373A54]'}>
            <div className={'flex flex-col text-[32px]  pb-[27px]'}>
                <span>Фильтрация</span>
            </div>
            <div className={'flex flex-col text-[18px] gap-[15px]  pb-[27px]'}>
                <span>Вендор</span>
                <div className={'bg-[#5C5F7E] flex items-center py-[11px] px-[16px] rounded-[15px] gap-[15px]'}>
                    <img className={'w-[17px] h-[17px]'} src={searchBlack} />
                    <input className={'bg-[#5C5F7E] focus:outline-0 border-none'} placeholder={'Поиск...'}/>
                </div>
            </div>
            <div className={'flex flex-col text-[18px] gap-[15px]  pb-[27px]'}>
                {
                    vendors &&
                    vendors.map((item) => {
                        return(
                            <div key={item.id} className={'flex items-center  gap-[15px]'}>
                                <input name={`${item.name}`} type={'checkbox'} checked={item.checked} onChange={(e) => handleFilter(e, item.id)} value={item.id} />
                                <label>{item.name}</label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PostamatFilter;