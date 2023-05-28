import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { ChipCard } from "../../setting/payment/payment.component";
import { getTopUpLogs } from "../../../services/bankService";
import MoneyNumber from "../../../services/moneyService";
export const TopUpIndex = () => {
  const [userMoney, setUserMoney] = useState("4242-4242-4242-4242");
  const [myCard, setMyCard] = useState([]);
  const [logs, setLogs] = useState([]);
  const [myCardApi, setMyCardApi] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardSelect, setCardSelect] = useState();
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
    //console.log(result.data.data);
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
    //console.log(result.data.data);
    setMyCardApi(result.data.data);
    const transformedData = result.data.data.map((card) => {
      //console.log("1: ", card.cardNumber);
      const lastDigits = card.cardNumber.slice(-4);
      //console.log("2: ", lastDigits);
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
      //console.log("3: ", maskedCardNumber);
      const formattedCardNumber = maskedCardNumber.replace(/(.{4})/g, "$1");
      //console.log("4: ", formattedCardNumber);
      return { cardNumber: formattedCardNumber, cardType: card.cardType };
    });

    setMyCard(transformedData);
  };

  const selectCard = (index) => {
    setCardNumber(myCardApi[index].cardNumber);
    setCardSelect(index);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const getLogs = async () => {
    const result = await getTopUpLogs();
    console.log(result);

    const convertedData = result.map((item) => {
      const date = new Date(item.created);
      const formattedTime = date.toLocaleString();

      return {
        ...item,
        created: formattedTime,
        cardNumber: maskCardNumber(item.cardNumber),
      };
    });

    console.log(convertedData);
    setLogs(convertedData);
  };

  const maskCardNumber = (cardNumber) => {
    const visibleDigits = 4;
    const maskedDigits = cardNumber.length - visibleDigits;
    const maskedPart = "*".repeat(maskedDigits);
    const visiblePart = cardNumber.slice(-visibleDigits);

    return maskedPart + visiblePart;
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
    //console.log(bodyData);
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
    //console.log(result);
    getUserMoney();
    setAmount("");
    setCardSelect();
    getLogs();
  };

  useEffect(() => {
    callCreditCard();
    getUserMoney();
    getLogs();
  }, []);
  return (
    <div className="container m-auto overflow-y-hidden">
      <div className="p-10 mx-20">
        <div className="flex">
          <div className="w-full">
            <div className="flex">
              <p>ยอดเงินคงเหลือของฉัน</p>
              <div className="px-2">
                <MoneyNumber amount={userMoney} />
              </div>
            </div>
            <div>
              <div className="w-[350px] mx-10 mt-20 dark:bg-adopsoftdark pt-8 pb-16 px-5 shadow-[0px_0px_1px_black] rounded-lg">
                <h2 className="m-4">ระบุจำนวนเงิน</h2>
                <input
                  type="number"
                  value={amount}
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
                        className={`${
                          cardSelect === cardIndex
                            ? "border border-white shadow-section-center shadow-adoppix brightness-75"
                            : ""
                        } cursor-pointer  m-3 bg-gradient-to-r  from-[#2193B0] to-[#6DD5ED] py-2 px-4 rounded-xl text-adopdark w-[295px] h-[60px]`}
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
              <button
                onClick={handleSubmit}
                className="bg-adoppix text-adoplight rounded-lg px-4 py-2 text-lg"
              >
                ดำเนินการต่อ
              </button>
            </div>
          </div>

          <div className="w-8/12">
            <div>ประวัติการเติมเงิน</div>
            <div className="m-3">
              {logs && (
                <div>
                  {logs.length > 0 ? (
                    <div>
                      {logs.map((log, index) => (
                        <div className="flex space-x-3 text-lg justify-around" key={index}>
                          <div>{log.money}</div>
                          <div>{log.cardNumber}</div>
                          <div>{log.created}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
