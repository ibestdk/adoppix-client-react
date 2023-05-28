import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MoneyNumber from "../../../services/moneyService";

export const WishListCard = ({ data, naviagteToItem, toCart , dataIndex ,wishList }) => {
    const navigate = useNavigate();

    const handleRouteUserName = useCallback(
        (username) => {
          navigate("/" + username);
        },
        [navigate]
      );


  return (
    <div className="my-5 grid grid-cols-6 gap-1 place-items-center">
      <div
        onClick={() => naviagteToItem(data.productId)}
        className="dark:bg-adopsoftdark bg-adoplighticon col-span-2 rounded-md w-60 h-40 mr-2 flex cursor-pointer hover:opacity-75"
      >
        <img
          className=" flex-shrink-0 object-contain duration-200 shadow-lg w-auto rounded-lg mx-auto"
          src={`https://pix.adoppix.com/public/${data.image}`}
          alt=""
        />
      </div>
      <div className="flex flex-col col-span-3">
        <div>
          <b className=" dark:text-adoplight text-adopdark">{data.title}</b>
        </div>
        <div className="text-sm py-2 overflow-y-hidden max-h-36 dark:text-adoplight text-adopdark">
          {data.description}
        </div>
        <div onClick={() => handleRouteUserName(data.ownerUsername)} className="my-2 cursor-default flex">
          <div className="flex mx-1">
            <img
              className="outline outline-2 outline-offset-2 outline-adoplight rounded-full h-6 w-6"
              src={`https://pix.adoppix.com/public/${data.ownerProfileImage}`}
              alt=""
            />
          </div>
          <div className="inline-block text-sm mx-1 truncate max-w-fit w-72 dark:text-adoplight text-adopdark">
            {data.ownerUsername}
          </div>
          <div className="inline-block">
            <GoVerified className="text-adoppix h-5 w-5"></GoVerified>
          </div>
        </div>
        <hr />
        <div className="mt-2 flex">
          <div
            onClick={() => wishList(data.productId, dataIndex)}
            className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-red-400 cursor-pointer duration-300"
          >
            <div className="inline-block px-1">
              <FaTrash className="text-base"></FaTrash>
            </div>
            <div className="inline-block text-sm">ลบ</div>
          </div>
          <div className="inline-block px-2 cursor-default text-adoplighticon">
            |
          </div>
          <div
            onClick={() => toCart(data.productId, dataIndex)}
            className="flex items-center text-adoplighticon text-center text-base place-items-center hover:text-adoppix cursor-pointer duration-300"
          >
            <div className="flex px-1">
              <AiOutlineShoppingCart className="text-base"></AiOutlineShoppingCart>
            </div>
            <div className="flex text-sm">ย้ายไปยังรถเข็น</div>
          </div>
        </div>
      </div>
      <div>
        <b className=" dark:text-adoplight text-adopdark"><MoneyNumber amount={data.price} /> </b>
      </div>
    </div>
  );
};
