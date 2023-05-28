import { MarketFeed } from "../../../components/market/market-index/market-feed";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
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
  const [balance, setBalance] = useState();
  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
    } else {
      getBalance();
    }
  };

  const navigateToWishList = () => {
    navigate(`wishlist`);
  };

  const navigateToCart = () => {
    navigate(`cart`);
  };
  useEffect(() => {
    userOrGuest();
  }, []);
  return (
    <div className="dark:bg-adopdark bg-adoplight min-h-screen">
      <div className="sticky top-8 pt-10 z-20">
        <div className="flex mr-10 justify-end items-end space-x-4">
          <WishList istate={i} />
          <CartList istate={i} />
        </div>{" "}
        <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center space-x-2">
          <div className=" bg-adopsoftdark rounded-lg p-2 flex space-x-2">
            <div>{balance}</div>
            <GiTwoCoins />
            <AiOutlinePlusCircle
              onClick={() => navigate("../topup")}
              className="  text-white"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="container px-14 m-auto">
          <MarketFeed setI={setI} istate={i} />
        </div>
      </div>
    </div>
  );
};
