import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { ChipCard } from "../../setting/payment/payment.component";
import { getTopUpLogs } from "../../../services/bankService";
import MoneyNumber from "../../../services/moneyService";
import { SuccessCard } from "../../../components/success-card/success-card";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlineReload } from "react-icons/ai";
import AddCardModal from "../../../components/setting/account/credit-card/addcreditcard-modal";

export const TopUpIndex = () => {
  const [userMoney, setUserMoney] = useState("");
  const [myCard, setMyCard] = useState([]);
  const [logs, setLogs] = useState([]);
  const [myCardApi, setMyCardApi] = useState([]);
  const [cardNumber, setCardNumber] = useState("");
  const [cardSelect, setCardSelect] = useState();
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const handleOnClose = () => setSuccess(false);

  const [addCardModal, setAddCardModal] = useState(false);

  const handleOnCloseAddCard = () => setAddCardModal(false);
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
    setLogs(convertedData.reverse());
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
    setSuccess(true);
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
          <div>
            <AddCardModal onClose={handleOnCloseAddCard} visible={addCardModal} reload={callCreditCard} />
          </div>
          <SuccessCard
            visible={success}
            onClose={handleOnClose}
            title={"เติมเงินสำเร็จ"}
            text={"จำนวนเงินเข้าสู่ระบบเรียบร้อยสามารถตรวจสอบยอดเงินได้ทันที"}
          />
          <div className="w-full">
            <div className="flex text-xl">
              <p>ยอดเงินคงเหลือของฉัน</p>
              <div className="px-2 flex space-x-2 items-center">
                <MoneyNumber amount={userMoney} />
                <div className="flex relative">
                  <GiTwoCoins className="text-adoppix" />
                  <AiOutlineReload
                    onClick={getUserMoney}
                    className="absolute text-sm right-0 mr-[-7px] mt-[-5px] cursor-pointer"
                  />
                </div>
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

          <div className="w-8/12 ">
            <div>ประวัติการเติมเงิน</div>
            <div className="m-3 text-lg">
              {logs && (
                <table>
                  <thead>
                    <tr>
                      <th className="w-[20%]">Money</th>
                      <th className="w-[40%]">Card Number</th>
                      <th className="w-[40%]">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.length > 0 ? (
                      logs.map((log, index) => (
                        <tr
                          key={index}
                          className={`p-2 rounded-lg ${
                            index % 2 === 0 ? "bg-adopdark" : "bg-adopsoftdark"
                          }`}
                        >
                          <td className="w-[20%] text-start">{log.money}</td>
                          <td className="w-[40%] text-center">
                            {log.cardNumber}
                          </td>
                          <td className="w-[40%] text-end">{log.created}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No logs found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
