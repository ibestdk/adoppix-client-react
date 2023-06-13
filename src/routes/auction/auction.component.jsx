import { Outlet, useNavigate } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getToken } from "../../services/authorize";
import { getAPIBalance } from "../../services/userService";
import { useEffect, useState } from "react";
import { LikeList } from "../../components/auction/like/like";
export const Auction = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState();

  const [i, setI] = useState(0);

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

  const plus = () => {
    setI(i + 1);
  };

  useEffect(() => {
    userOrGuest();
  }, []);
  return (
    <div>
      {/*<div className="sticky top-8 pt-10 z-20">
        <div className="flex mr-10 justify-end items-end space-x-4">
          <LikeList istate={i} />
        </div>
        <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center ">
          <div className=" bg-adopsoftdark rounded-lg p-2 flex space-x-2">
            <div>{balance}</div>
            <GiTwoCoins />
            <AiOutlinePlusCircle
              onClick={() => navigate("../topup")}
              className="  text-white"
            />
          </div>
        </div>
      </div> */
}
      <Outlet plus={plus} />
    </div>
  );
};
