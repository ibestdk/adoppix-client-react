import { parse } from "qs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getAPIBalance } from "../../../../services/userService";
import { postBuyMulti, postBuySigle } from "../../../../services/marketService";
import { WishList } from "../like/wishlist";
import { CartList } from "../like copy/cart";

export const SummaryPage = () => {
  const navigate = useNavigate();
  const { data } = useParams();
  const [productDatas, setProductDatas] = useState([]);
  const [userMoney, setUserMoney] = useState(0);

  const getMoney = async () => {
    const result = await getAPIBalance();
    setUserMoney(result);
    setBalance(result);
    //console.log(result);
  };

  const [i, setI] = useState(0);
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  const decodeData = (encodedData) => {
    const decodedData = decodeURIComponent(encodedData);
    const parsedData = parse(decodedData);
    if (parsedData.images !== undefined) {
      if (parsedData.images.length > 0) return parsedData;
    }
    // Convert the object list to an array list
    const productList = Object.values(parsedData);
    return productList;
  };

  const submitBuy = async () => {
    if (productDatas.images !== undefined) {
      const result = await postBuySigle(productDatas.productId);
      //console.log("🤣", result);
      if (result === "Successful") {
        navigate("../transaction-sccess");
      }
    } else {
      const json = {
        productIds: productDatas.map((data) => data.productId),
      };
      // //console.log(json)
      const result = await postBuyMulti(json);
      //console.log("💖", result);
      if (result === "Successful") {
        navigate("../transaction-sccess");
      }
    }
  };

  useEffect(() => {
    const decodedData = decodeData(data);
    setProductDatas(decodedData);
    getMoney();
    //console.log(productDatas);
  }, [data]);
  useEffect(() => {
    //console.log(productDatas);
  }, [productDatas]);

  // Use the productDatas array in the SummaryPage component

  return (
    <div>
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
      <div className="text-white mt-20 w-auto container mx-auto h-auto flex justify-center">
        <div className="flex space-x-5">
          <div className="bg-adopsoftdark w-[800px] p-5 rounded-lg min-h-[400px]">
            <div className="flex justify-between">
              <div className="text-2xl">สินค้าสั่งซื้อ</div>
              <div>
                รายการ {productDatas.length > 0 ? productDatas.length : 1}
              </div>
            </div>
            <div className="mt-5">
              {productDatas.length > 0 ? (
                productDatas.map((data, index) => (
                  <div key={index} className="p-3">
                    <div className="flex justify-around items-center">
                      <div>
                        <img
                          draggable={false}
                          className="h-[100px] object-cover rounded-lg"
                          src={`https://pix.adoppix.com/public/${
                            data.images ? data.images[0] : data.image
                          }`}
                          alt=""
                        />
                      </div>
                      <div className="w-[400px]">
                        <div>{data.title}</div>
                        <div className="text-xs">{data.description}</div>
                      </div>
                      <div>{data.price}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3">
                  <div className="flex justify-around items-center">
                    <div>
                      <img
                        draggable={false}
                        className="h-[100px] object-cover rounded-lg"
                        src={`https://pix.adoppix.com/public/${
                          productDatas.images
                            ? productDatas.images[0]
                            : productDatas.image
                        }`}
                        alt=""
                      />
                    </div>
                    <div className="w-[400px]">
                      <div>{productDatas.title}</div>
                      <div className="text-xs">{productDatas.description}</div>
                    </div>
                    <div>{productDatas.price}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-adopsoftdark w-[340px] p-5 rounded-lg flex flex-col justify-between">
              <div className="text-2xl mb-5">สรุปการชำระเงิน</div>
              {productDatas.length > 0 ? (
                productDatas.map((data, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-xl items-end"
                  >
                    <div className="text-sm truncate">{data.title}</div>
                    <div>{data.price}</div>
                  </div>
                ))
              ) : (
                <div className="flex justify-between text-xl">
                  <div>{productDatas.title}</div>
                  <div>{productDatas.price}</div>
                </div>
              )}

              <div className="py-4">
                <hr className="mt-3" />
                <div className="flex justify-between text-xl mt-2">
                  <div>ยอดรวม</div>
                  <div>
                    {productDatas.length > 0 ? (
                      productDatas.reduce(
                        (total, data) => total + parseFloat(data.price),
                        0
                      )
                    ) : (
                      <div>{productDatas.price}</div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-xl mt-2 text-adoppix">
                  <div>เงินในบัญชี</div>
                  <div>{userMoney}</div>
                </div>
                <div className="flex justify-between text-xl mt-2">
                  <div>เงินคงเหลือ</div>
                  <div>
                    {parseFloat(userMoney) >=
                    (productDatas.length > 0
                      ? productDatas.reduce(
                          (total, data) => total + parseFloat(data.price),
                          0
                        )
                      : productDatas.price) ? (
                      <div className="flex justify-between text-xl mt-2">
                        <div>
                          {(
                            parseFloat(userMoney) -
                            (productDatas.length > 0
                              ? productDatas.reduce(
                                  (total, data) =>
                                    total + parseFloat(data.price),
                                  0
                                )
                              : productDatas.price)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ) : (
                      <div className="text-red-500 text-sm mt-2">
                        ยอดเงินไม่เพียงพอ โปรดเติมเงิน
                      </div>
                    )}
                  </div>
                </div>
                <hr />
                <hr className="mt-1" />

                <div
                  onClick={() => submitBuy()}
                  className="bg-adoppix cursor-pointer hover:opacity-80 duration-300 text-white text-lg w-full py-2 text-center rounded-lg mt-4"
                >
                  ชำระเงิน
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
