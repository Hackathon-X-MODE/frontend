import React, { useState } from "react";
import {
    useAddVendorMutation,
    useGetVendorsQuery
} from "../../redux/postamatApi";

import reg from "../../assets/ico/vendors/reg.svg";
import search from "../../assets/ico/vendors/search.svg";
import VendorUpdate from "../vendor/VendorUpdate";
import VendorCreate from "../vendor/VendorCreate";
import Loader from "../loader/Loader";

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

    const handleForm = async (e, type) => {
        if (type === "default") {
            setRegistrationData({
                code: "",
                name: "",
                webhook: "",
                legalEntity: ""
            });
            setRegistrationVendorForm(!isRegistrationVendor);
        } else {
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
        }
    };

    const updateInput = (e) => {
        setRegistrationData({
            ...registrationData,
            [e.target.name]: e.target.value
        });
    };

    if (isLoading)
        return (
            <div>
                <Loader />
            </div>
        );
    return (
        <>
            <div
                className={
                    "w-full relative flex flex-col gap-5 px-[40px] py-[48px] font-primary max-h-screen overflow-y-scroll z-0"
                }
            >
                <div className={"flex justify-between"}>
                    <button
                        onClick={() =>
                            setRegistrationVendorForm(!isRegistrationVendor)
                        }
                        className={
                            "w-max-[290px] h-[60px] flex gap-[25px] text-white px-[22px] pr-[36px] pl-[18px] border rounded-[15px] text-[18px] items-center hover:opacity-70 transition duration-500 ease-in-out"
                        }
                    >
                        <img src={reg} />
                        <span className={"text-[18px] translate-y-0.5 "}>
                            Регистрация вендора
                        </span>
                    </button>
                    <div
                        className={
                            " border w-[450px] h-[60px] rounded-[15px] flex gap-5 items-center px-[20px] py-[20px] border-[#6C7094] text-white"
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
                    <ul
                        className={
                            "w-full flex gap-[20px] justify-between flex-wrap "
                        }
                    >
                        {data.map((vendor) => {
                            return (
                                <VendorUpdate key={vendor.id} vendor={vendor} />
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
