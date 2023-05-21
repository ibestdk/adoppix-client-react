import { GoVerified } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
export const CartCard = ({data , toWishlist, dataIndex , removeCartFromList}) => {
    return (

        <div
   
        className="px-8 py-5 grid grid-cols-4 gap-4 place-items-center"
      >
        <div
          onClick={() => naviagteToItem(data.productId)}
          className="dark:bg-adopsoftdark bg-adoplighticon rounded-md w-60 h-40 mr-2 flex hover:opacity-75 cursor-pointer"
        >
          <img
            className="rounded-md flex-shrink-0 object-contain min-w-full min-h-full"
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
          <div className="my-2 cursor-default">
            <div className="inline-block mx-1">
              <img
                className="outline outline-2 outline-offset-2 outline-adoplight rounded-full h-6 w-6"
                src={`https://pix.adoppix.com/public/${data.sellerProfile}`}
                alt=""
              />
            </div>
            <div className="inline-block text-sm mx-1 truncate max-w-fit w-72">
              {data.sellerUsername}
            </div>
            <div className="inline-block">
              <GoVerified className="text-adoppix h-5 w-5"></GoVerified>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <div
              onClick={() =>
                removeCartFromList(data.productId, dataIndex)
              }
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
              onClick={() =>
                toWishlist(data.productId, dataIndex)
              }
              className="inline-block text-adoplighticon text-center text-base place-items-center hover:text-adoppix cursor-pointer duration-300"
            >
              <div className="inline-block px-1">
                <AiFillStar className="text-lg h-6 w-6 inline-block"></AiFillStar>
              </div>
              <div className="inline-block">
                ย้ายไปยังสิ่งที่อยากได้
              </div>
            </div>
          </div>
        </div>
        <div>
          <b className=" dark:text-adoplight text-adopdark">
            {data.price}
          </b>
        </div>
      </div>
    )
}