import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { ChipCard } from "../../setting/payment/payment.component";
export const TopUpIndex = () => {
  const [userMoney, setUserMoney] = useState("4242-4242-4242-4242");
  const [myCard, setMyCard] = useState([]);
  const [myCardApi, setMyCardApi] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState(0);

  const getUserMoney = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "get",
      url: "https://api.adoppix.com/api/User/money",
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(result.data.data);
    setUserMoney(result.data.data);
  };

  const callCreditCard = async () => {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "get",
      url: "https://api.adoppix.com/api/User/credit-card",
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(result.data.data);
    setMyCardApi(result.data.data);
    const transformedData = result.data.data.map((card) => {
      console.log("1: ", card.cardNumber);
      const lastDigits = card.cardNumber.slice(-4);
      console.log("2: ", lastDigits);
      const maskedCardNumber = card.cardNumber.replace(
        /\d(?=\d{4})/g,
        (match, index) => {
          if (index < 4 || index >= card.cardNumber.length - 4) {
            return match;
          } else {
            return "*";
          }
        }
      );
      console.log("3: ", maskedCardNumber);
      const formattedCardNumber = maskedCardNumber.replace(/(.{4})/g, "$1");
      console.log("4: ", formattedCardNumber);
      return { cardNumber: formattedCardNumber, cardType: card.cardType };
    });

    setMyCard(transformedData);
  };

  const selectCard = (index) => {
    setCardNumber(myCardApi[index].cardNumber);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  

  const handleSubmit = async () => {
    const bodyData = {
      cardNumber: "",
      amount: 0,
    };

    if (cardNumber) {
      const formattedCardNumber = cardNumber.replace(/-/g, "");
      bodyData.cardNumber = formattedCardNumber;
    }
    if (amount) bodyData.amount = amount;
    console.log(bodyData);
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };

    let result = await axios({
      method: "post",
      url: "https://api.adoppix.com/api/Payment",
      data: JSON.stringify(bodyData),
      headers: headers,
    }).catch((err) => console.log(err.response));
    console.log(result);
    getUserMoney();
  };

  useEffect(() => {
    callCreditCard();
    getUserMoney();
  }, []);
  return (
    <div className="container m-auto overflow-y-hidden">
      <div className="p-10 mx-20">
        <div className="flex">
          <div className="w-full">
            <div className="flex">
              <p>ยอดเงินคงเหลือของฉัน</p>
              <p className="px-2">{userMoney}</p>
            </div>
            <div>
              <div className="w-[350px] mx-10 mt-20 dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
                <h2 className="m-4">ระบุจำนวนเงิน</h2>
                <input
                  type="number"
                  onChange={handleAmount}
                  className="rounded w-full dark:bg-adopdark py-1 px-2 text-lg"
                />
              </div>
              <div className="mx-auto mt-14">
                <div className="flex justify-between">
                  <div className="text-adopdark my-auto dark:text-adoplight">
                    บัตรของฉัน
                  </div>
                </div>
                <div className="m-10">
                  {myCard.length > 0 ? (
                    myCard.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        onClick={() => selectCard(cardIndex)}
                        className="m-3 bg-gradient-to-r from-[#2193B0] to-[#6DD5ED] py-2 px-4 rounded-xl text-adopdark w-[295px] h-[60px]"
                      >
                        <div>
                          <div className="p-1">
                            <div className="flex">
                              <p className="text-adoplight text-2xl font-bold   ">
                                {card.cardNumber}
                              </p>
                              <div className="text-adoplight bg-adopsoftdark px-1 py-1 rounded-lg mx-2 text-lg font-bold                         ">
                                {card.cardType}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center">ไม่พบบัตรที่ผูกกับบัญชีนี้</p>
                  )}
                  <div className="m-3 ">
                    <p
                      className="cursor-pointer px-2 py-1 rounded-lg bg-adoppix w-[295px] text-center text-lg"
                      onClick={() => setAddCardModal(true)}
                    >
                      เพิ่มบัตร
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={handleSubmit} className="bg-adoppix text-adoplight rounded-lg px-4 py-2 text-lg">
                ดำเนินการต่อ
              </button>
            </div>
          </div>

          <div className="w-8/12"></div>
        </div>
      </div>
    </div>
  );
};
