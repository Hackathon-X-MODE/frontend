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
const Selector = ({selected, existedCategories, callable}) => {
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: '#fff',
            backgroundColor: "#21243A",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,

            backgroundColor: "#5C5F7E",
            height: '5px',
            borderRadius: "15px",
            overflow: 'hidden',
            // padding: "10px",
            border: "1px solid #5C5F7E",
            boxShadow: "none",
        }),
        singleValue: (defaultStyles) => ({...defaultStyles, color: "#fff"}),
    };

    const prev = selected;

    const selectValues = reactSelectValues.filter(v => existedCategories.indexOf(v.value) === -1 || v.value === selected)
    const handleReactSelect = (value) => {
        callable(prev, value)
    }

    return (
        <>
            {
                <div className={'flex w-5/6 gap-1 flex-col py-[10px]'}>
                    <span className={'text-white'}>Категории</span>
                    <ReactSelect
                        name={selected}
                        options={selectValues}
                        //  options={reactSelectValues}
                        components={{
                            Option
                        }}
                        styles={customStyles}
                        onChange={(e) => handleReactSelect(e.value)}
                        value={
                            reactSelectValues.filter(refCurrent => selected.includes(refCurrent.value))[0]
                        }
                    />
                </div>
            }
        </>
    )
}

export default Selector