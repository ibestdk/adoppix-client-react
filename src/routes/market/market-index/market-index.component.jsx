import { MarketFeed } from "../../../components/market/market-index/market-feed"
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const MarketIndex = () => {
    const navigate = useNavigate();

    const navigateToWishList = () => {
        navigate(`wishlist`);
    }

    const navigateToCart = () => {
        navigate(`cart`);
    }

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative">
                    <div className="flex justify-end mx-8">
                        <div onClick={navigateToWishList} className="hover:bg-adoplighticon duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                            <AiFillStar className="h-11 w-11 p-2 text-adopdark dark:text-adoplight" />
                        </div>
                        <div onClick={navigateToCart} className="hover:bg-adoplighticon gove duration-300 rounded-full h-11 w-11 mx-1 mt-2">
                            <AiOutlineShoppingCart className="p-2 h-11 w-11 text-adopdark dark:text-adoplight" />
                        </div>
                    </div>
                <div className="container px-14 m-auto">
                    <MarketFeed />
                </div>
            </div>
        </div>
    )
}