import { MarketFeed } from "../../../components/market/market-index/market-feed"
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { getToken } from "../../../services/authorize"

export const MarketIndex = () => {
    const navigate = useNavigate();

    const navigateToWishList = () => {
        navigate(`wishlist`);
    }

    const navigateToCart = () => {
        navigate(`cart`);
    }

    const [balance, setBalance] = useState();
    const [isLogin, setIsLogin] = useState(false);

    const getBalance = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .get(`https://api.adoppix.com/api/User/money`, { headers })
            .then((res) => {
                setBalance(res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });


    }

    const userOrGuest = async () => {
        const token = getToken();
        if (token === false || token === undefined) {
            setIsLogin(false);
        }
        else {
            setIsLogin(true);
            getBalance();
        }
    }

    useEffect(() => {
        userOrGuest();
    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative">
                {isLogin && (
                    <div className="flex justify-end mx-8">
                        {balance && (
                            <div className="w-fit mx-1 flex mt-2">
                                <div className="text-adopdark dark:text-adoplight rounded-md h-fit w-fit my-auto mx-1">
                                    จำนวนเงินคงเหลือ
                                </div>
                                <div className="text-adoppix duration-300 rounded-md h-fit w-fit my-auto mx-1">
                                    {balance} Ac
                                </div>
                            </div>
                        )}
                        <div onClick={navigateToWishList} className="hover:bg-adoplighticon duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                            <AiFillStar className="h-11 w-11 p-2 text-adopdark dark:text-adoplight" />
                        </div>
                        <div onClick={navigateToCart} className="hover:bg-adoplighticon gove duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                            <AiOutlineShoppingCart className="p-2 h-11 w-11 text-adopdark dark:text-adoplight" />
                        </div>
                    </div>
                )}
                <div className="container px-14 m-auto">
                    <MarketFeed />
                </div>
            </div>
        </div>
    )
}