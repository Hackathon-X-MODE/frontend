import React, { useEffect, useState } from "react";
import edit from "../../assets/ico/vendors/edit.svg";
import postaIco from "../../assets/ico/vendors/postaIco.svg";
import { useUpdateVendorMutation } from "../../redux/postamatApi";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const VendorUpdate = ({ vendor, handleUpdateVendor }) => {
    const [updateVendor, { isSuccess, isError, isLoading }] =
        useUpdateVendorMutation();
    const [isActive, setActive] = useState(true);
    const [vendorData, setVendorData] = useState({});

    useEffect(() => {
        setVendorData({
            id: `${vendor.id}`,
            code: `${vendor.code}`,
            legalEntity: `${vendor.legalEntity}`,
            name: `${vendor.name}`,
            webhook: `${vendor.webhook}`
        });
    }, []);

    const updateDataFunc = (e) => {
        setVendorData({
            ...vendorData,
            [e.target.name]: e.target.value
        });
    };

    const handleBtn = async (e) => {
        if (e.target.innerHTML === "Редактивровать") {
            setActive(!isActive);
        } else {
            if (vendorData) {
                try {
                    await updateVendor({
                        ...vendorData,
                        id: vendorData.id
                    }).unwrap();
                    // setVendorData(null)
                } catch (e) {
                    console.log(e);
                }
                setActive(!isActive);
            }
        }
    };

    return (
        <li
            className={
                "w-[450px] h-[610px] bg-[#21243A] flex flex-col  pt-[25px] rounded-[15px] font-primary relative"
            }
            key={vendor.id}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className={`flex justify-between px-[20px] `}>
                        <div className={"flex flex-col w-full"}>
                            <label
                                className={"text-white text-[18px] ml-[20px]"}
                            >
                                Наименование
                            </label>
                            <textarea
                                name={"name"}
                                onChange={updateDataFunc}
                                disabled={isActive}
                                className={`w-5/6 bg-transparent text-white outline-0 text-[32px] px-[18px] rounded-[15px]  resize-none ${
                                    isActive
                                        ? "bg-transparent"
                                        : " w-[340px]  bg-[#8C91B8] text-gray-900"
                                }`}
                                value={vendorData.name}
                            />
                        </div>
                        <img src={edit} className={"self-start"} />
                    </div>
                    <div className={"px-[20px] mt-[30px]"}>
                        <div className={"flex flex-col "}>
                            <div className={"flex flex-col gap-[5px] "}>
                                <label
                                    className={
                                        "text-white text-[18px] ml-[20px]"
                                    }
                                >
                                    Буквенный код
                                </label>
                                <div className={"flex justify-between "}>
                                    <input
                                        name={"code"}
                                        onChange={updateDataFunc}
                                        disabled={isActive}
                                        className={`w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px]  rounded-[15px] text-[18px] ${
                                            isActive
                                                ? "bg-[#5C5F7E]"
                                                : " bg-[#8C91B8]"
                                        }`}
                                        defaultValue={vendorData.code}
                                    />
                                    <img src={edit} className={"self-center"} />
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col mt-[20px]"}>
                            <div className={"flex flex-col gap-[5px]  "}>
                                <label
                                    className={
                                        "text-white text-[18px] ml-[20px]"
                                    }
                                >
                                    Webhook
                                </label>
                                <div className={"flex justify-between "}>
                                    <input
                                        name={"webhook"}
                                        onChange={updateDataFunc}
                                        disabled={isActive}
                                        className={`w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px] ${
                                            isActive
                                                ? "bg-[#5C5F7E]"
                                                : " bg-[#8C91B8]"
                                        }`}
                                        defaultValue={vendorData.webhook}
                                    />
                                    <img src={edit} className={"self-center"} />
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col mt-[20px]"}>
                            <div className={"flex flex-col gap-[5px]  "}>
                                <label
                                    className={
                                        "text-white text-[18px] ml-[20px]"
                                    }
                                >
                                    Реквизиты
                                </label>
                                <div className={"flex justify-between "}>
                                    <input
                                        name={"legalEntity"}
                                        onChange={updateDataFunc}
                                        disabled={isActive}
                                        className={`w-[358px] h-[60px] px-[18px] py-[10px] bg-[#5C5F7E] text-black outline-0 text-[18px] bg-[#5C5F7E] rounded-[15px] text-[18px] ${
                                            isActive
                                                ? "bg-[#5C5F7E]"
                                                : " bg-[#8C91B8]"
                                        }`}
                                        defaultValue={vendorData.legalEntity}
                                    />
                                    <img src={edit} className={"self-center"} />
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                "flex justify-between gap-[20px] mt-[40px]"
                            }
                        >
                            <button
                                onClick={handleBtn}
                                className={
                                    "py-[18px] px-[25px] w-[196px] h-[60px] text-white text-[18px] bg-[#F62E46] rounded-[15px] hover:shadow-primary transition duration-500 ease-in-out"
                                }
                            >
                                {isActive ? "Редактивровать" : "Обновить"}
                            </button>
                            <Link
                                to={`/view/vendors/${vendor.id}`}
                                className={
                                    "flex items-center justify-center w-[196px] h-[60px] py-[18px] px-[25px] gap-[10px] text-white text-[18px] bg-transparent rounded-[15px] border"
                                }
                            >
                                <img src={postaIco} />
                                <span>Постаматы</span>
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </li>
    );
};

export default VendorUpdate;
