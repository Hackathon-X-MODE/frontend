import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import vendors from "../../assets/ico/vendors.svg";
import postamat from "../../assets/ico/postamat.svg";
import tickets from "../../assets/ico/tickets.svg";
import comments from "../../assets/ico/comments.svg";

const Navigation = () => {
    return (
        <nav
            className={
                " w-[330px]  flex flex-col h-screen  bg-[#21243A]  pt-[41px] font-primary text-white text-[18px]"
            }
        >
            <img className={"px-[38px]"} src={logo} />
            <div className={"mt-[50px] flex flex-col  px-[20px]"}>
                <Link
                    to={"/view/vendors"}
                    className={
                        "flex h-[60px] px-[18px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"
                    }
                >
                    <img className={"20px"} src={vendors} />
                    <span className={"ml-[20px]"}>Вендоры</span>
                </Link>
                <Link
                    to={"/tickets"}
                    className={
                        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"
                    }
                >
                    <img className={"20px"} src={tickets} />
                    <span className={"ml-[20px]"}>Тикеты</span>
                </Link>
                <Link
                    to={"/comments"}
                    className={
                        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"
                    }
                >
                    <img className={"20px"} src={comments} />
                    <span className={"ml-[20px]"}>Комментарии</span>
                </Link>
                <Link
                    to={"/postamates"}
                    className={
                        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"
                    }
                >
                    <img className={"20px"} src={postamat} />
                    <span className={"ml-[20px]"}>Постаматы</span>
                </Link>
            </div>
            {/*<h1 className={'text-white'}>Постаматинг LOGO</h1>*/}
            {/*<ul className={'flex flex-col items-center'}>*/}
            {/*    <li className={'text-white p-2 cursor-pointer hover:text-gray-400'}>*/}
            {/*        <Link to={'/registration'}>Регистрация</Link>*/}
            {/*    </li>*/}
            {/*    <li className={'text-white p-2 cursor-pointer hover:text-gray-400'}>*/}
            {/*        <Link to={'/view'}>Просмотр</Link>*/}
            {/*    </li>*/}
            {/*</ul>*/}
        </nav>
    );
};

export default Navigation;
