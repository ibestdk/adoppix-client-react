import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa'
import { GoVerified } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { getToken } from "../../../services/authorize"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import ConfirmModal from '../market-modal/confirm-modal';
import SuccesefullBuy from '../market-modal/succesefull-buy';
import LoginFirst from '../market-modal/login-first-modal';

export const MarketMyShopFeedCard = (data) => {

    // wishlist ฟังชั่นที่ยังไม่รู้ว่าใช้เปลี่ยนข้อมูลจาก api isWishList ยังไง
    const wishlistClicked = (productId) => {
        wishList(productId);
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

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
                if (isOnCart) {
                    setIsOnCart(false);
                }
            })
            .catch((err) => console.log(err));
        // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
        // .then((res) => //console.log(res))
        // .catch((err) => console.log(err.response));
    };

    const cartClicked = (productId) => {
        cart(productId);
    }

    const cart = async (productId) => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'post',
            url: `https://api.adoppix.com/api/Product/${productId}/toggle-cart`,
            headers: headers
        })
            .then((res) => {
                setIsOnCart(!isOnCart);
                if (isWishLists) {
                    setIsWishLists(false);
                }
            })
            .catch((err) => console.log(err));
    };

    const buy = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'post',
            url: `https://api.adoppix.com/api/Product/${data.data.productId}/buy`,
            headers: headers
        })
            .then(async (res) => {
                setModal(false);
                setSuccese(true);
                setIsBought(true);
                await delay(3000);
                setSuccese(false);
            })
            .catch((err) => console.log(err));
    };


    const userOrGuest = async () => {
        const token = getToken();
        if (token === false || token === undefined) {
            setIsLogin(false);
        }
        else {
            setIsLogin(true);
        }
    }

    const [loginWarning, setLoginWarning] = useState(false);
    const handleOnCloseModal2 = () => setLoginWarning(false);

    const [isLogin, setIsLogin] = useState(false);

    const [modal, setModal] = useState(false);
    const handleOnClose = () => setModal(false);
    const [succese, setSuccese] = useState(false);


    useEffect(() => {
        userOrGuest();
    }, []);

    return (
        <div className="">
            {isLogin == true && (
                <div>
                    <div className="relative overflow-hidden">
                        <NavLink className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear" to={`${data.data.id}`}>
                            <img className="h-[280px] rounded-lg w-[240px] object-cover overflow-hidden m-0" src={`https://pix.adoppix.com/public/${data.data.imageName}`} />
                        </NavLink>
                        <div className="absolute bottom-0 h-16 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                            <div className="absolute bottom-[74px] right-2">
                                <div>
                                    {data.data.canCommercial == true && (
                                        <TbBusinessplan className="bg-green-500 rounded-full p-[3px] h-6 w-6 text-adoplight" />
                                    )}
                                    {data.data.canCommercial == false && (
                                        <TbBusinessplan className="bg-red-500 rounded-full p-[3px] h-6 w-6 text-adoplight" />
                                    )}
                                </div>
                            </div>
                            <div className="relative">
                                {data.data.amount && (
                                    <div className="text-base font-bold h-6 mt-1 overflow-y-hidden w-[66%] inline-block">
                                        เหลือ {data.data.amount} ชิ้น
                                    </div>
                                )}
                                {!data.data.amount && (
                                    <div className="text-base font-bold h-6 mt-1 overflow-y-hidden w-[66%] inline-block">
                                        เหลือ ไม่จำกัดจำนวน
                                    </div>
                                )}
                                <div className="text-base font-bold h-6 overflow-y-hidden w-[66%] inline-block">
                                    ขายแล้ว {data.data.amountSold} ชิ้น
                                </div>
                                <div className="absolute text-sm right-1 top-1 font-bold">
                                    ยอดขาย
                                </div>
                                <div className="absolute text-3xl right-1 top-5 inline-block text-end my-auto truncate w-[121px] text-adoppix">
                                    <b>
                                        {data.data.total}
                                    </b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLogin == false && (
                <div>
                    <LoginFirst visible={loginWarning} onClose={handleOnCloseModal2} />
                </div>
            )}
        </div>
    )
}