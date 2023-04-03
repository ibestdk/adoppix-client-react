import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { getToken } from "../../../services/authorize";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ConfirmModal from "../../../components/market/market-modal/confirm-modal"
import SuccesefullBuy from "../../../components/market/market-modal/succesefull-buy"

export const MarketCart = () => {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const handleOnClose = () => setModal(false);
    const [price, setPrice] = useState();
    const [succese,setSuccese] = useState(false);

    const navigateToWishList = () => {
        navigate(`../wishlist`);
    }

    const navigateToCart = () => {
        navigate(`../`);
    }

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
                setPrice(res.data.data.total);
                console.log("data :", res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const removeFromList = function (index) {
        setCart({
            discount: cart.discount,
            items: cart.items.filter((item, i) => i != index),
            total: (cart.total - (cart.items[index].price))
        });
        console.log(cart.total)
    }

    const removeCartFromList = function (id, index) {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(`https://api.adoppix.com/api/Product/${id}/toggle-cart`, { headers })
            .then((res) => {
                removeFromList(index);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const toWishlist = (id, index) => {
        console.log(id);
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios({
            method: 'patch',
            url: `https://api.adoppix.com/api/Product/${id}/wishlist`,
            headers: headers
        })
            .then((res) => {
                console.log(res);
                removeFromList(index);
            })
            .catch((err) => console.log(err));
    }

    const naviagteToItem = function (id) {
        navigate(`../${id}`)
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );

    const buyOnCarts = function () {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .post(`https://api.adoppix.com/api/Product/buys`, { headers })
            .then(async (res) => {
                setModal(false)
                setSuccese(true);
                await delay(3000);
                navigate(`../`);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        getCart();
    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen" draggable="false">
            <div className="flex justify-end mx-8">
                <div onClick={navigateToWishList} className="hover:bg-adoplighticon duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                    <AiFillStar className="h-11 w-11 p-2 text-adopdark dark:text-adoplight" />
                </div>
                <div onClick={navigateToCart} className="hover:bg-adoplighticon gove duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                    <AiOutlineShoppingCart className="p-2 h-11 w-11 text-adoppix" />
                </div>
            </div>
            <div className="container px-14 m-auto grid grid-cols-4 gap-4 pb-10">
                <div className="col-span-3">
                    <div className="text-3xl dark:text-adoplight text-adopdark my-4">
                        <b>
                            ในตะกร้าสินค้า
                        </b>
                    </div>
                    <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                        <div className="py-10">
                            {cart && cart.items.map((data, dataIndex) => (
                                <div key={dataIndex} className="px-8 py-5 grid grid-cols-4 gap-4 place-items-center">
                                    <div onClick={() => naviagteToItem(data.productId)} className="dark:bg-adopsoftdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex hover:opacity-75 cursor-pointer">
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
                                            <div onClick={() => removeCartFromList(data.productId, dataIndex)} className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-red-400 cursor-pointer duration-300">
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
                                            <div onClick={() => toWishlist(data.productId, dataIndex)} className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-adoppix cursor-pointer duration-300">
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
                            {!cart && (
                                <div className="px-8 py-5 grid grid-cols-4 gap-4 place-items-center animate-pulse">
                                    <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex">
                                    </div>
                                    <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
                                        <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 cursor-default">
                                            <div className="inline-block mx-1">
                                                <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
                                            </div>
                                            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md">
                                            </div>
                                            <div className="inline-block">
                                                <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-2">
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <FaTrash className="text-lg"></FaTrash>
                                                </div>
                                                <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                            <div className="inline-block px-2 cursor-default text-adoplighticon">
                                                |
                                            </div>
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
                                                </div>
                                                <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md">
                                    </div>
                                    <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex">
                                    </div>
                                    <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
                                        <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 cursor-default">
                                            <div className="inline-block mx-1">
                                                <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
                                            </div>
                                            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md">
                                            </div>
                                            <div className="inline-block">
                                                <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-2">
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <FaTrash className="text-lg"></FaTrash>
                                                </div>
                                                <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                            <div className="inline-block px-2 cursor-default text-adoplighticon">
                                                |
                                            </div>
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
                                                </div>
                                                <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md">
                                    </div>
                                    <div className="dark:bg-adopdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex">
                                    </div>
                                    <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
                                        <div className="h-8 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 h-5 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="my-2 cursor-default">
                                            <div className="inline-block mx-1">
                                                <div className="dark:bg-adopdark bg-adoplighticon rounded-full h-6 w-6"></div>
                                            </div>
                                            <div className="inline-block mx-1 h-5 w-36 dark:bg-adopdark bg-adoplighticon rounded-md">
                                            </div>
                                            <div className="inline-block">
                                                <GoVerified className="text-adoplighticon dark:text-adopdark h-5 w-5"></GoVerified>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="mt-2">
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <FaTrash className="text-lg"></FaTrash>
                                                </div>
                                                <div className="inline-block h-6 w-6 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                            <div className="inline-block px-2 cursor-default text-adoplighticon">
                                                |
                                            </div>
                                            <div className="inline-block text-adoplighticon dark:text-adopdark">
                                                <div className="inline-block px-1">
                                                    <AiFillStar className="text-lg h-6 w-6"></AiFillStar>
                                                </div>
                                                <div className="inline-block h-6 w-24 rounded-md bg-adoplighticon dark:bg-adopdark">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-8 w-28 bg-adoplighticon dark:bg-adopdark rounded-md">
                                    </div>
                                </div>
                            )}
                            {cart && cart.items.length == 0 && (
                                <div className="px-8 py-5 place-items-center text-center">
                                    ยังไม่มีสินค้าในตะกร้าสินค้า <div onClick={() => navigate(`../`)} className="text-adoppix mt-2 hover:opacity-75 cursor-pointer">ค้นหาสินค้า?</div>
                                </div>
                            )}
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
                        {cart && cart.items.length != 0 && (
                            <div>
                                <div className=" py-3">
                                    {cart && cart.items.map((data, dataIndex) => (
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
                                            {cart && cart.discount}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                                        <div className="text-start col-span-3">
                                            ยอดรวม
                                        </div>
                                        <div className="text-end">
                                            {cart && cart.total - cart.discount}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 pb-5 pt-3">
                                    <div onClick={() => setModal(true)} className="text-center text-adoplight text-lg py-1 px-20 w-fit rounded-md bg-adoppix m-auto hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                        <b>
                                            ซื้อสินค้าในตะกร้า
                                        </b>
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
                        )}
                        {!cart && (
                            <div>
                                <div className=" py-3">
                                    <div className="grid grid-cols-4 gap-2 pb-2 px-5 animate-pulse">
                                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="col-span-3 h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md">
                                        </div>
                                    </div>
                                </div>
                                <hr className="mx-5 text-adoplighticon" />
                                <div className="py-3 px-5">
                                    <div className="grid grid-cols-4 gap-1 mb-2 text-lg text-red-400">
                                        <div className="text-start col-span-3">
                                            ส่วนลด
                                        </div>
                                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md animate-pulse">
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-1 text-lg dark:text-adoplight text-adopdark">
                                        <div className="text-start col-span-3">
                                            ยอดรวม
                                        </div>
                                        <div className="h-7 w-full dark:bg-adopdark bg-adoplighticon rounded-md animate-pulse">
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 pb-5 pt-3">
                                    <div className="text-center text-adoplight text-lg py-1 px-20 w-fit rounded-md bg-adoppix m-auto">
                                        <b>
                                            ซื้อสินค้าในตะกร้า
                                        </b>
                                    </div>
                                </div>
                                <div className="shadow-md rounded-md dark:bg-adopsoftdark">
                                    <div className="text-2xl dark:text-adoplight text-adopdark my-4 pt-5 pb-2 px-8">
                                        <b>
                                            โค้ดส่วนลด
                                        </b>
                                    </div>
                                    <div className="grid grid-cols-3 px-4 pb-3">
                                        <div className="col-span-2 animate-pulse">
                                            <div className="h-10 w-full dark:bg-adopdark bg-adoplighticon rounded-md"></div>
                                        </div>
                                        <div className="pb-3">
                                            <div className="text-center text-adoplight text-sm w-fit px-1 py-2 rounded-md bg-adoppix m-auto">
                                                <b>
                                                    ใช้รหัสส่วนลด
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {cart && cart.items.length == 0 && (
                            <div className="text-center place-items-center p-[76px]">
                                ไม่มีสินค้า
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <SuccesefullBuy visible={succese} />
            <ConfirmModal onClose={handleOnClose} visible={modal} price={price} method={buyOnCarts} />
        </div>
    )
}