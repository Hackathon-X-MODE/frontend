import {default as ReactSelect} from "react-select";
import Option from "./CustomInput";

const reactSelectValues = [
    {value: 'PRODUCT_DESCRIPTION', label: 'Описание товара на сайте интернет-магазина'},
    {value: 'GETTING_ORDER', label: 'Получение заказа'},
    {value: 'GOT_ORDER', label: 'Полученный заказ'},
    {value: 'PRODUCT', label: 'Товар'},
    {value: 'POST_BOX', label: 'Работа постамата'},
    {value: 'DELIVERY', label: 'Доставка'},
    {value: 'NOTIFICATION', label: 'Уведомления'},
    {value: 'OTHER', label: 'Иное'},
    {value: 'PREPARE_ORDER', label: 'Оформление заказа'},
]
const Selector = ({selected, callable}) => {

    const prev = selected;

    const handleReactSelect = (value) => {
        console.log(prev, value)
        callable(prev,value)
    }

    return (
        <>
            {
                <div className={'flex w-5/6 gap-1 flex-col py-[10px]'}>
                    <span className={'text-white'}>Категории</span>
                    <ReactSelect
                        name={selected}
                        options={reactSelectValues}
                        //  options={reactSelectValues}
                        components={{
                            Option
                        }}
                        // styles={customStyles}
                        onChange={(e) => handleReactSelect(e.value)}
                        value={selected}
                    />
                </div>
            }
        </>
    )
}

export default Selector