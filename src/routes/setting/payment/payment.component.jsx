import React, { useState, useEffect } from "react";
import AddCardModal from "../../../components/setting/account/credit-card/addcreditcard-modal";
import { getToken } from "../../../services/authorize";
import axios from "axios";
const Payment = () => {
  const [cardNumber, setCardNumber] = useState("4242-4242-4242-4242");
  const [myCard, setMyCard] = useState([]);
  const [cardExpiration, setExpiration] = useState("02/28");
  const [cardCvv, setCvv] = useState("555");
  const [addCardModal, setAddCardModal] = useState(false);

  const handleOnClose = () => setAddCardModal(false);

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

  useEffect(() => {
    callCreditCard();
  }, []);

  return (
    <div className="text-adopdark dark:text-adoplight">
      <div>
        <AddCardModal onClose={handleOnClose} visible={addCardModal} reload={callCreditCard}/>
      </div>

      <div className="flex">
        <div>
          <div className="flex justify-between">
            <div className="text-adopdark my-auto dark:text-adoplight">
              บัตรของฉัน
            </div>
            <div>
              <p
                className="cursor-pointer px-2 py-1 rounded-lg bg-adoppix w-[100px] text-center text-lg"
                onClick={() => setAddCardModal(true)}
              >
                เพิ่มบัตร
              </p>
            </div>
          </div>
          <div className="m-10">
            {myCard.length > 0 ? (
              myCard.map((card, cardIndex) => (
                <div key={cardIndex} className="">
                  <div className="m-3 bg-gradient-to-r from-[#2193B0] to-[#6DD5ED] p-5 rounded-xl text-adopdark w-[295px] h-[188px]">
                    <div className=" flex justify-between">
                      <div>
                        <div className="text-adoplight text-2xl font-bold                         ">
                          {card.cardType}
                        </div>
                        <div>
                          <ChipCard />
                        </div>
                      </div>
                      <div className="right-0">
                        <div className="text-adoppix font-bold text-[2rem] ">
                          <p className="drop-shadow-lg mt-2">AdopPix</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="p-1">
                        <p className="text-sm ">Card Number</p>
                        <p className="text-adoplight text-2xl font-bold   ">
                          {card.cardNumber}
                        </p>
                      </div>
                      <div className="flex w-full">
                        <div className="p-2"></div>
                        <div className="p-2"></div>
                      </div>
                      <div className="p-2"></div>
                    </div>
                  </div>
                  <div className="text-adopdark">
                    <div className="m-3 bg-adopsoftdark w-full h-full"></div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">ไม่พบบัตรที่ผูกกับบัญชีนี้</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

export const ChipCard = () => {
  return (
    <div>
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect width="100" height="100" fill="url(#pattern0)" />
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xlinkHref="#image0_2308_29" transform="scale(0.01)" />
          </pattern>
          <image
            id="image0_2308_29"
            width="100"
            height="100"
            xlinkHref="data:image/png;base64,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"
          />
        </defs>
      </svg>
    </div>
  );
};
