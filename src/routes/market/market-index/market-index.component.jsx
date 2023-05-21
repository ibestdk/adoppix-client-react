import { MarketFeed } from "../../../components/market/market-index/market-feed";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { getAPIBalance } from "../../../services/userService";
import { WishList } from "./like/wishlist";
import { CartList } from "./like copy/cart";

export const MarketIndex = () => {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  const navigateToWishList = () => {
    navigate(`wishlist`);
  };

  const navigateToCart = () => {
    navigate(`cart`);
  };

  const [balance, setBalance] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
      getBalance();
    }
  };

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
           
          </div>
        )}
        <div className="container px-14 m-auto">
          <MarketFeed />
        </div>
      </div>
    </div>
  );
};
