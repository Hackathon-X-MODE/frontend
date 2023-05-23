import React, {useState} from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

import vendors from "../../assets/ico/vendors.svg";
import postamat from "../../assets/ico/postamat.svg";
import tickets from "../../assets/ico/tickets.svg";
import comments from "../../assets/ico/comments.svg";

const Navigation = () => {
    const [selected, setSelected] = useState()
    const links = [
        {id: 1, linkTo: '/view/vendors', source: vendors, title: 'Вендоры'},
        {id: 2, linkTo: '/view/tickets', source: tickets, title: 'Тикеты'},
        {id: 3, linkTo: '/view/comments', source: comments, title: 'Комментарии'},
        {id: 4, linkTo: '/view/postamates', source: postamat, title: 'Постаматы'},
    ]

    const handleLink = (id) => {
        console.log(id)
        setSelected(id)
    }

    return (
        <nav
            className={
                " w-[330px]  flex flex-col h-screen  bg-[#21243A]  pt-[41px] font-primary text-white text-[18px]"
            }
        >
            <img className={"px-[38px]"} src={logo} />
            <div className={"mt-[50px] flex flex-col gap-1  px-[20px]"}>
                {
                    links.map((el, idx) => {
                        return(
                            <Link
                                key={el.id}
                                to={`${el.linkTo}`}
                                className={
                                `${el.id === selected ? 'bg-[#F62E46]' : ''}  flex h-[60px] px-[18px] py-[18px] hover:bg-[#F62E46] hover:shadow-primary rounded-[15px] transition duration-500 ease-in-out`
                                }
                                onClick={() => handleLink(el.id)}
                        >
                                <img className={"20px"} src={`${el.source}`} />
                                <span className={"ml-[20px]"}>{el.title}</span>
                            </Link>
                        )
                    })
                }
                {/*<Link*/}
                {/*    to={"/view/vendors"}*/}
                {/*    className={*/}
                {/*        "active:bg-[#F62E46]  flex h-[60px] px-[18px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"*/}
                {/*    }*/}
                {/*>*/}
                {/*    <img className={"20px"} src={vendors} />*/}
                {/*    <span className={"ml-[20px]"}>Вендоры</span>*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*    to={"/view/tickets"}*/}
                {/*    className={*/}
                {/*        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"*/}
                {/*    }*/}
                {/*>*/}
                {/*    <img className={"20px"} src={tickets} />*/}
                {/*    <span className={"ml-[20px]"}>Тикеты</span>*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*    to={"view/comments"}*/}
                {/*    className={*/}
                {/*        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"*/}
                {/*    }*/}
                {/*>*/}
                {/*    <img className={"20px"} src={comments} />*/}
                {/*    <span className={"ml-[20px]"}>Комментарии</span>*/}
                {/*</Link>*/}
                {/*<Link*/}
                {/*    to={"view/postamates"}*/}
                {/*    className={*/}
                {/*        "flex px-[18px] h-[60px] py-[18px] hover:bg-[#F62E46] rounded-[15px] transition duration-500 ease-in-out"*/}
                {/*    }*/}
                {/*>*/}
                {/*    <img className={"20px"} src={postamat} />*/}
                {/*    <span className={"ml-[20px]"}>Постаматы</span>*/}
                {/*</Link>*/}
            </div>
        </nav>
    );
};

export default Navigation;
