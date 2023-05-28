import { useNavigate, Outlet } from "react-router-dom";
import { WishList } from "./market-index/like/wishlist";
import { CartList } from "./market-index/like copy/cart";
import { useState } from "react";
import { getAPIBalance } from "../../services/userService";
import { getToken } from "../../services/authorize";
import { useEffect } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
export const Market = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [i, setI] = useState(0);

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
  useEffect(() => {
    userOrGuest();
  }, [navigate]);

  return (
    <div>
     {/* <div className="sticky top-8 pt-10 z-20">
        <div className="flex mr-10 justify-end items-end space-x-4">
          <WishList istate={i} />
          <CartList istate={i} />
        </div>{" "}
        <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center space-x-2">
          <div>{balance}</div>
          <GiTwoCoins />
          <AiOutlinePlusCircle
            onClick={() => navigate("../topup")}
            className="  text-white"
          />
        </div>
  </div> */}
      <div className="mt-[-5rem]">
        <Outlet />
      </div>
    </div>
  );
};
