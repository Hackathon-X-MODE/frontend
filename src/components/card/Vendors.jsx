import React, { useState } from "react";
import {
    useAddVendorMutation,
    useGetVendorsQuery
} from "../../redux/postamatApi";
import { Link } from "react-router-dom";

import reg from "../../assets/ico/vendors/reg.svg";
import search from "../../assets/ico/vendors/search.svg";
import VendorUpdate from "../vendor/VendorUpdate";
import Input from "../form/Input";
import VendorCreate from "../vendor/VendorCreate";

const Vendors = (props) => {
    const { data = [], isLoading } = useGetVendorsQuery();
    const [addVendor, { isSuccess, isError }] = useAddVendorMutation();

    const [registrationData, setRegistrationData] = useState({
        code: "",
        name: "",
        webhook: "",
        legalEntity: ""
    });
    const [isRegistrationVendor, setRegistrationVendorForm] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        if (registrationData) {
            try {
                await addVendor({ ...registrationData }).unwrap();
                setRegistrationData({
                    code: "",
                    name: "",
                    webhook: "",
                    legalEntity: ""
                });
                setRegistrationVendorForm(!isRegistrationVendor);
            } catch (e) {
                console.log(e);
            }
        }
    };

    const updateInput = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading) return <div>Loading data....</div>;
    return (
        <>
            <div
                className={
                    "w-full relative flex flex-col gap-5 px-[77px] py-[48px] font-primary max-h-screen overflow-y-scroll z-0"
                }
            >
                <div className={"flex justify-between"}>
                    <button
                        onClick={() =>
                            setRegistrationVendorForm(!isRegistrationVendor)
                        }
                        className={
                            "w-max-[290px] h-[60px] flex gap-[25px] text-white px-[22px] pr-[36px] pl-[18px] border rounded-[15px] text-[18px] items-center "
                        }
                    >
                        <img src={reg} />
                        <span className={"text-[18px] translate-y-0.5"}>
                            Регистрация вендора
                        </span>
                    </button>
                    <div
                        className={
                            " border w-[450px] rounded-[15px] flex gap-5 items-center px-[20px] py-[20px] border-[#6C7094] text-white"
                        }
                    >
                        <img src={search} />
                        <input
                            className={
                                "outline-0 bg-transparent translate-y-0.5 text-[18px]"
                            }
                            placeholder={"Поиск по вендорма..."}
                        />
                    </div>
                </div>
                {data && (
                    <ul className={"w-full flex gap-[43px] flex-wrap "}>
                        {data.map((vendor) => {
                            return (
                                <VendorUpdate
                                    key={vendor.id}
                                    vendor={vendor}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
            <VendorCreate
                registrationData={registrationData}
                handleForm={handleForm}
                updateInput={updateInput}
                isRegistrationVendor={isRegistrationVendor}
            />
        </>
    );
};

export default Vendors;
