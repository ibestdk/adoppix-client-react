import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa'
import { GoVerified } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { getToken } from "../../../services/authorize"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export const MarketFeedCard = (data) => {
    console.log("data : "+data);

    // wishlist ฟังชั่นที่ยังไม่รู้ว่าใช้เปลี่ยนข้อมูลจาก api isWishList ยังไง
    const wishlistClicked = (productId) => {
        wishList(productId);
    }

    const wishList = async (productId) => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'patch',
            url: `https://api.adoppix.com/api/Product/${productId}/wishlist`,
            headers: headers
        })
            .then((res) => {
                setIsWishLists(!isWishLists);
            })
            .catch((err) => console.log(err));
        // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err.response));
    };

    const [isWishLists,setIsWishLists] = useState();

    useEffect(() => {
        setIsWishLists(data.data.isWishlist);
    }, []);

    return (
        <div className="">
            <div className="relative overflow-hidden">
                <NavLink className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear" to={`${data.data.productId}`}>
                    <img className="h-[280px] rounded-lg w-[240px] object-cover overflow-hidden m-0" src={`https://pix.adoppix.com/public/${data.data.image}`} />
                </NavLink>
                <div className="absolute top-2 right-2">
                    <div>
                        {isWishLists && (
                            <FaStar onClick={() => wishlistClicked(data.data.productId)} className="mb-[8px] text-yellow-300" />
                        )}
                        {!isWishLists && (
                            <FaRegStar onClick={() => wishlistClicked(data.data.productId)} className="mb-[8px] text-yellow-300" />
                        )}
                    </div>
                    <div>
                        {data.data.canCommercial == true && (
                            <TbBusinessplan className="bg-adoppix rounded-full p-[3px] h-6 w-6 text-adoplight" />
                        )}
                        {data.data.canCommercial == false && (
                            <TbBusinessplan className="bg-red-500 rounded-full p-[3px] h-6 w-6 text-adoplight" />
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 h-16 hover:h-36 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                    <div className="relative">
                        <div className="text-sm h-10 overflow-y-hidden w-[66%] inline-block">
                            {data.data.title}
                        </div>
                        <div className="absolute text-sm right-1 inline-block text-center m-auto text-adoppix">
                            <b>
                                {data.data.price}
                            </b>
                        </div>
                        <div className="flex">
                            <div>
                                <img className="h-4 rounded-full w-4 object-cover mx-1" src={`https://pix.adoppix.com/public/${data.data.ownerProfileImage}`} />
                            </div>
                            <div className="text-xs font-bold my-auto truncate max-w-[70%]">
                                {data.data.ownerUsername}
                            </div>
                            <div className=" top-[2px] right-[-15px] cursor-default">
                                <GoVerified className="h-4 text-green-400" />
                            </div>
                        </div>
                        {data.data.amount > 0 && (

                            <div className="absolute text-xs right-1 top-5">
                                เหลือ {data.data.amount} ชิ้น
                            </div>
                        )}
                        {data.data.amount == null && (

                            <div className="absolute text-xs right-1 top-5">
                                ไม่จำกัดจำนวน
                            </div>
                        )}
                        <div className="w-[72px] absolute right-1 top-16">
                            <div className="mb-2 text-xs px-7 py-[1px] w-[8] bg-adoppix rounded-md cursor-pointer hover:bg-blue-500 duration-300 hover:scale-105 text-adoplight">
                                <b>
                                    ซื้อ
                                </b>
                            </div>
                            <div className="text-xs px-1 py-[1px] w-[8] bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 duration-300 hover:scale-105 text-adoplight">
                                เพิ่มลงตะกร้า
                            </div>
                        </div>
                        <div className=" text-xs w-[50%] overflow-y-hidden h-[50px] mt-1 ml-1">
                            {data.data.description}
                        </div>
                        <div className="flex ml-1 max-w-[100%] overflow-hidden">
                            <div className="text-xs text-adopsoftdark py-[3px] px-2 bg-adoplighticon rounded-md cursor-default mr-1">
                                {data.data.tag}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}