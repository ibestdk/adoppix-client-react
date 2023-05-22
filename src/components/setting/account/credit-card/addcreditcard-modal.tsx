import "./addcreditcard-modal.scss";
import React, { useState, useRef } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { BsFillImageFill, BsXCircle, BsChatSquare } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import "react-image-crop/dist/ReactCrop.css";
import FileUploadSection from "../../../auction/auction-create/file-upload";
import Chips from "../../../input/chips/chips";
import { getToken } from "../../../../services/authorize";
import axios from "axios";

export default function AddCardModal({ visible, onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setExpiration] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [cardHolder, setHolder] = useState("");
  const [cardType, setCardType] = useState("");
  const [cardExpirationMonth, setCardExpirationMonth] = useState("");
  const [cardExpirationYear, setCardExpirationYear] = useState("");

  function handleCardNumberChange(event) {
    const rawValue = event.target.value.replace(/\D/g, "");
    const formattedValue = rawValue
      .slice(0, 16) // Limit the length of the raw value to 16 digits
      .replace(/(\d{1,4})/g, "$1-") // Format the value into groups of 4 digits separated by a hyphen
      .replace(/-$/, ""); // Remove any trailing hyphen

    // Determine the card type based on the card number prefix
    const cardType = isVisaOrMastercard(rawValue);
    setCardType(cardType);

    setCardNumber(formattedValue);
  }

  function isVisaOrMastercard(cardNumber) {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;

    if (visaRegex.test(cardNumber)) {
      return "Visa";
    } else if (mastercardRegex.test(cardNumber)) {
      return "Mastercard";
    } else {
      return "";
    }
  }

  function handleCardHolderChange(event) {
    setHolder(event.target.value);
  }
  function handleExpirationChange(event) {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove any non-digit characters
    const month = rawValue.slice(0, 2);
    const year = rawValue.slice(2, 4);
    let formattedValue = "";

    // Validate that the month value is not greater than 12
    if (month > 12) {
      formattedValue = "12-";
    } else {
      formattedValue = `${month}-`;
    }
    const formattedMonth = getMonthText(parseInt(month));
    const formattedYear = `20${year}`;
    formattedValue += year;
    setExpiration(formattedValue);
    setCardExpirationMonth(month);
    setCardExpirationYear(formattedYear);
  }

  function getMonthText(monthNumber) {
    switch (monthNumber) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  }

  function handleCvvChange(event) {
    const rawValue = event.target.value.replace(/\D/g, ""); // Remove any non-digit characters
    const formattedValue = rawValue.slice(0, 4);
    setCvv(formattedValue);
  }

  const handleOnClose = (e) => {
    if (e.target.id === "modal-card") onClose();
  };

  const handleSubmit = async () => {
    const bodyData = {
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      cvc: "",
      name: "",
    };
  
    if (cardNumber) {
      const formattedCardNumber = cardNumber.replace(/-/g, "");
      bodyData.cardNumber = formattedCardNumber;
    }
    if (cardExpirationMonth) bodyData.expireMonth = cardExpirationMonth;
    if (cardExpirationYear) bodyData.expireYear = cardExpirationYear;
    if (cardCvv) bodyData.cvc = cardCvv;
    if (cardHolder) bodyData.name = cardHolder;
  
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    };
  
    let result = await axios({
      method: "post",
      url: "https://api.adoppix.com/api/Payment/add",
      data: JSON.stringify(bodyData),
      headers: headers,
    }).catch((err) => console.log(err.response));
    //console.log(result);
  };

  if (!visible) return null;

  return (
    <div
      id="modal-card"
      onClick={handleOnClose}
      className="animation-custom fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center duration-300"
    >
      <div className=" dark:bg-adopsoftdark text-adopdark dark:text-adoplight  bg-adoplight w-[400px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite]">
        <div className="">
          <div className="mb-4">เพิ่มบัตรใหม่</div>
          <div>
            <div className="p-1">
              <p className="text-sm">Card Number</p>
              <div className="flex">
                <input
                  className=" rounded w-7/12  dark:bg-adopdark py-1 px-2 text-lg"
                  id="cardNumber"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength={19}
                />
                <p className="text-center my-auto px-3">{cardType}</p>
              </div>
            </div>
            <div className="flex w-full">
              <div className="p-2">
                <p className="text-sm">Expire</p>
                <input
                  className=" rounded w-[70px] dark:bg-adopdark py-1 px-2 text-lg "
                  id="cardExpiration"
                  name="cardExpiration"
                  value={cardExpiration}
                  onChange={handleExpirationChange}
                  maxLength={5}
                />
              </div>
              <div className="p-2">
                <p className="text-sm">CVV</p>
                <input
                  className=" rounded w-[60px]  dark:bg-adopdark py-1 px-2 text-lg"
                  id="cardCvv"
                  name="cardCvv"
                  value={cardCvv}
                  onChange={handleCvvChange}
                  maxLength={5}
                />
              </div>
            </div>
            <div className="p-2">
              <p className="text-sm">Card Holder</p>
              <input
                onChange={handleCardHolderChange}
                className=" rounded w-10/12  dark:bg-adopdark py-1 px-2 text-lg"
                type="text"
              />
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="mt-4 py-2 text-lg bg-adoppix rounded-lg w-full"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
