import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const dataCard = [
    {
        img: "https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/118bb67d-83e7-42d4-bcc7-fbb7850be405file_2822025.webp",
        title: "Angry Cat",
        description: "halo catty catty when she angry its really cutie cutie but when she bitme bitme its very hurtme hurtme",
        userImg: "https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/13df34e4-ef42-44c5-b46f-835fab7a0fe7file_2822011.webp",
        username: "cat_beggin_ya",
        price: "450.00"
    },
    {
        img: "data:image/jpeg;base64,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",
        title: "path",
        description: "description Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore ab numquam illo temporibus et itaque excepturi debitis suscipit exercitationem, iusto blanditiis voluptatibus veritatis fugiat, eaque placeat voluptatem. Ratione, eveniet! lo",
        userImg: "https://i.pinimg.com/736x/10/09/4e/10094e43f8b78f4e03f756592532e561.jpg",
        username: "father",
        price: "9990.00"
    },
    {
        img: "https://images2.alphacoders.com/840/840519.jpg",
        title: "Panorama?",
        description: "description Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore ab numquam illo temporibus et itaque excepturi debitis suscipit exercitationem, iusto blanditiis voluptatibus veritatis fugiat, eaque placeat voluptatem. Ratione, eveniet! lo",
        userImg: "data:image/jpeg;base64,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",
        username: "MoonMan",
        price: "650.00"
    }
]

export const MarketCart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState();
    const getCart = () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .get(`https://api.adoppix.com/api/User/cart`, { headers })
            .then((res) => {
                setCart(res.data.data);
                console.log("data :", res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        getCart();

    }, []);

    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            <div className="container px-12 m-auto grid grid-cols-4 gap-4 pb-10">
                <div className="col-span-3">
                    <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                        <b>
                            ในตะกร้าสินค้า
                        </b>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                        <div className="py-10">
                        { cart && cart.items.map((data,dataIndex) => (
                            <div key={dataIndex} className="px-8 py-5 grid grid-cols-4 gap-4 place-items-center">
                            <div className="dark:bg-adopsoftdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex">
                                <img className="rounded-md flex-shrink-0 object-cover min-w-full min-h-full" src={`https://pix.adoppix.com/public/${data.image}`} alt="" />
                            </div>
                            <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
                                <div>
                                    <b>
                                        {data.title}
                                    </b>
                                </div>
                                <div className="text-sm py-2 overflow-y-hidden max-h-36">
                                    {data.description}
                                </div>
                                <div className="my-2 cursor-default">
                                    <div className="inline-block mx-1">
                                        <img className="outline outline-2 outline-offset-2 outline-adoplight rounded-full h-6 w-6" src={`https://pix.adoppix.com/public/${data.sellerProfile}`} alt="" />
                                    </div>
                                    <div className="inline-block text-sm mx-1 truncate max-w-fit w-72">
                                        {data.sellerUsername}
                                    </div>
                                    <div className="inline-block">
                                        <GoVerified className="text-adoppix h-5 w-5"></GoVerified>
                                    </div>
                                </div>
                                <hr />
                                <div className="mt-2">
                                    <div className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-red-400 cursor-pointer duration-300">
                                        <div className="inline-block px-1">
                                            <FaTrash className="text-lg inline-block"></FaTrash>
                                        </div>
                                        <div className="inline-block">
                                            ลบ
                                        </div>
                                    </div>
                                    <div className="inline-block px-2 cursor-default text-adoplighticon">
                                        |
                                    </div>
                                    <div className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-adoppix cursor-pointer duration-300">
                                        <div className="inline-block px-1">
                                            <AiFillStar className="text-lg h-6 w-6 inline-block"></AiFillStar>
                                        </div>
                                        <div className="inline-block">
                                            ย้ายไปยังสิ่งที่อยากได้
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <b className=" dark:text-adoplight text-adopdark">
                                    {data.price}
                                </b>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                        <b>
                            สรุปการชำระเงิน
                        </b>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                        <div className=" py-3">
                            { cart && cart.items.map((data,dataIndex) => (
                                <div key={dataIndex} className="grid grid-cols-4 gap-1 text-lg pb-2 px-5  dark:text-adoplight text-adopdark">
                                    <div className="col-span-3 truncate">
                                        {data.title}
                                    </div>
                                    <div className="text-end">
                                        {data.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="mx-5 text-adoplighticon" />
                        <div className="py-3 px-5">
                            <div className="grid grid-cols-4 gap-1 text-lg text-red-400">
                                <div className="text-start col-span-3">
                                    ส่วนลด
                                </div>
                                <div className="text-end">
                                    { cart && cart.discount }
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                                <div className="text-start col-span-3">
                                    ยอดรวม
                                </div>
                                <div className="text-end">
                                    { cart && cart.total - cart.discount }
                                </div>
                            </div>
                        </div>
                        <div className="px-4 pb-5 pt-3">
                            <div className="text-center text-adoplight text-lg py-1 px-20 w-fit rounded-md bg-adoppix m-auto hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                <b>
                                    ซื้อสินค้าในตะกร้า
                                </b>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                        <div className="text-2xl dark:text-adoplight text-adopdark my-4 pt-5 pb-2 px-8">
                            <b>
                                โค้ดส่วนลด
                            </b>
                        </div>
                        <div className="grid grid-cols-3 px-4 pb-3">
                            <div className="col-span-2">
                                <input className="text-adopsoftdark rounded-md w-fit shadow-md" type="text" name="" id="" />
                            </div>
                            <div className="pb-3">
                                <div className="text-center text-adoplight text-sm w-fit px-1 py-2 rounded-md bg-adoppix m-auto hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                    <b>
                                        ใช้รหัสส่วนลด
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}