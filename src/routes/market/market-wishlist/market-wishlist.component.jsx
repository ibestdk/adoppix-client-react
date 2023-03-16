import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const MarketWishList = () => {
    const navigate = useNavigate();
    const [wishlist, setWishList] = useState();

    const getWishLists = () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .get(`https://api.adoppix.com/api/User/wishlist`, { headers })
            .then((res) => {
                setWishList(res.data.data);
                console.log("data :", res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const naviagteToItem = function (id) {
        navigate(`../${id}`)
    }

    const removeWishlistFromList = function (index) {
        wishList();
        setWishList(wishlist.filter((item, i) => i != index));
    }

    const wishList = async (id, index) => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'patch',
            url: `https://api.adoppix.com/api/Product/${id}/wishlist`,
            headers: headers
        })
            .then((res) => {
                console.log(res);
                removeWishlistFromList(index);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getWishLists();

    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            <div className="container m-auto px-80">
                <div className="text-3xl dark:text-adoplight text-adopdark">
                    <b>
                        รายการที่อยากได้
                    </b>
                </div>

                <div className="rounded-md p-10 shadow-md shadow-gray-300 py-10 mt-5">
                    {wishlist && wishlist.map((data, dataIndex) => (
                        <div key={dataIndex} className="my-5 grid grid-cols-6 gap-4 place-items-center">
                            <div onClick={() => naviagteToItem(data.productId)} className="dark:bg-adopsoftdark bg-adoplighticon col-span-2 rounded-md w-60 h-40 mr-2 flex cursor-pointer hover:opacity-75">
                                <img className="rounded-md flex-shrink-0 object-cover min-w-full min-h-full" src={`https://pix.adoppix.com/public/${data.image}`} alt="" />
                            </div>
                            <div className="inline-block col-span-3">
                                <div>
                                    <b className=" dark:text-adoplight text-adopdark">
                                        {data.title}
                                    </b>
                                </div>
                                <div className="text-sm py-2 overflow-y-hidden max-h-36 dark:text-adoplight text-adopdark">
                                    {data.description}
                                </div>
                                <div className="my-2 cursor-default">
                                    <div className="inline-block mx-1">
                                        <img className="outline outline-2 outline-offset-2 outline-adoplight rounded-full h-6 w-6" src={`https://pix.adoppix.com/public/${data.ownerProfileImage}`} alt="" />
                                    </div>
                                    <div className="inline-block text-sm mx-1 truncate max-w-fit w-72 dark:text-adoplight text-adopdark">
                                        {data.ownerUsername}
                                    </div>
                                    <div className="inline-block">
                                        <GoVerified className="text-adoppix h-5 w-5"></GoVerified>
                                    </div>
                                </div>
                                <hr />
                                <div className="mt-2">
                                    <div onClick={() => wishList(data.productId,dataIndex)} className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-red-400 cursor-pointer duration-300">
                                        <div className="inline-block px-1">
                                            <FaTrash className="text-lg"></FaTrash>
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
                                            <AiOutlineShoppingCart className="text-lg"></AiOutlineShoppingCart>
                                        </div>
                                        <div className="inline-block">
                                            ย้ายไปยังรถเข็น
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
                    {wishlist && wishlist.length == 0 && (
                    <div className="text-center">
                        ไม่มีสินค้าที่อยากได้ ลองค้นหาสินค้าที่สนใจดูหน่อยไหม?
                    </div>
                    )}
                </div>

            </div>
        </div>
    );
}