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

  // const [balance, setBalance] = useState();
  // const [isLogin, setIsLogin] = useState(false);



  return (
    <div className="dark:bg-adopdark bg-adoplight min-h-screen">
      <div className="relative">
        <div className="container px-14 m-auto">
          <MarketFeed />
        </div>
      </div>
    </div>
  );
};
