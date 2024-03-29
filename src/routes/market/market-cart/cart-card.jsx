import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import MoneyNumber from "../../../services/moneyService";
export const CartCard = ({
  data,
  toWishlist,
  dataIndex,
  removeCartFromList,
  handleCheckboxChange
}) => {
  const [selected, setSelected] = useState(false);

  const toggleCheckbox = () => {
    setSelected(!selected);
    handleCheckboxChange(data); // Pass the dataIndex to the parent component
  };
  return (
    <div className="px-8 py-5 flex justify-around items-center">
      <input
        type="checkbox"
        className="rounded-full dark:bg-adopdark w-[30px] h-[30px]"
        checked={selected}
        onChange={toggleCheckbox}
      />
      <div
        onClick={() => naviagteToItem(data.productId)}
        className="dark:bg-adopsoftdark bg-adoplighticon rounded-lg w-60 h-32 mr-2 flex hover:opacity-75 cursor-pointer duration-300"
      >
        <img
          className="rounded-lg flex-shrink-0 object-contain min-w-full min-h-full"
          src={`https://pix.adoppix.com/public/${data.image}`}
          alt=""
        />
      </div>
      <div className="inline-block col-span-2 dark:text-adoplight text-adopdark">
        <div>
          <b>{data.title}</b>
        </div>
        <div className="text-sm py-2 overflow-y-hidden max-h-36">
          {data.description}
        </div>
        <hr />
        <div className="mt-2">
          <div
            onClick={() => removeCartFromList(data.productId, dataIndex)}
            className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-red-400 cursor-pointer duration-300"
          >
            <div className="inline-block px-1">
              <FaTrash className="text-lg inline-block"></FaTrash>
            </div>
            <div className="inline-block">ลบ</div>
          </div>
          <div className="inline-block px-2 cursor-default text-adoplighticon">
            |
          </div>
          <div
            onClick={() => toWishlist(data.productId, dataIndex)}
            className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-adoppix cursor-pointer duration-300"
          >
            <div className="inline-block px-1">
              <AiFillStar className="text-lg h-6 w-6 inline-block"></AiFillStar>
            </div>
            <div className="inline-block">ย้ายไปยังสิ่งที่อยากได้</div>
          </div>
        </div>
      </div>
      <div>
        <b className=" dark:text-adoplight text-adopdark"> <MoneyNumber amount={data.price}/></b>
      </div>
    </div>
  );
};
