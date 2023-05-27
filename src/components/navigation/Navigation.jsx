import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import vendors from "../../assets/ico/vendors.svg";
import postamat from "../../assets/ico/postamat.svg";
import tickets from "../../assets/ico/tickets.svg";
import comments from "../../assets/ico/comments.svg";

const Navigation = () => {
    const [selected, setSelected] = useState();
    const links = [
        { id: 0, linkTo: "/view/dashboard", source: vendors, title: "Главная" },
        { id: 1, linkTo: "/view/vendors", source: vendors, title: "Вендоры" },
        { id: 2, linkTo: "/view/tickets", source: tickets, title: "Обращения" },
        {
            id: 3,
            linkTo: "/view/comments",
            source: comments,
            title: "Комментарии"
        },
        {
            id: 4,
            linkTo: "/view/postamates",
            source: postamat,
            title: "Постаматы"
        },
        {
            id: 5,
            linkTo: "/view/files",
            source: postamat,
            title: "Импорт/Экспорт"
        }
    ];

    const handleLink = (id) => {
        console.log(id);
        setSelected(id);
    };

    return (
        <nav
            className={
                "sticky lg:top-[0px] lg:w-[330px]  flex flex-col h-screen  bg-[#21243A]  lg:pt-[41px] font-primary text-white text-[18px] hidden lg:block "
            }
        >
            <img className={"px-[38px] w-fit h-fit"} src={logo} />
            <div className={"mt-[50px] flex flex-col gap-1  px-[20px]"}>
                {links.map((el, idx) => {
                    return (
                        <Link
                            key={el.id}
                            to={`${el.linkTo}`}
                            className={`${
                                el.id === selected ? "bg-[#F62E46]" : ""
                            }  flex h-[60px] px-[18px] py-[18px] hover:bg-[#F62E46] hover:shadow-primary rounded-[15px] transition duration-500 ease-in-out`}
                            onClick={() => handleLink(el.id)}
                        >
                            <img className={"20px"} src={`${el.source}`} />
                            <span className={"ml-[20px]"}>{el.title}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default Navigation;
