import React, { useState, useEffect } from "react";
import { getBank, postBank, postWithdraw } from "../../services/bankService";
import { getUser } from "../../services/authorize";

export const WithDrawn = () => {
  const [bank, setBank] = useState([]);
  const [bankSelect, setBankSelect] = useState();
  const [bankError, setBankError] = useState(false);
  const [withdrawAmountError, setBwithdrawAmountError] = useState(false);
  const [notengouth, setNotengouth] = useState(false);
  const [newBank, setNewBank] = useState({
    username: "",
    amount: "",
    bank: "",
    number: "",
    name: "",
  });

  const typeAmount = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      amount: e.target.value,
    }));
    setBwithdrawAmountError(false)
    setNotengouth(false)
  };

  const selectBank = (bank, index) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      number: bank.number,
      name: bank.fullname,
      bank: bank.name,
    }));
    setBankError(false);
    setBankSelect(index);
  };
  const handleSubmit = async () => {

    if (newBank.amount === null || newBank.amount === undefined || newBank.amount === ""  ) {
        setBwithdrawAmountError(true);
    }
    if (newBank.amount < 100 ) {
        setNotengouth(true);
    }
    if (bankSelect === null || bankSelect === undefined) {
      setBankError(true);
    }
    console.log(newBank);
    const result = await postWithdraw(newBank);
    console.log(result);
    setNewBank({
      username: "",
      amount: "",
      bank: "",
      number: "",
      name: "",
    });
    setBankSelect();
  };

  const callBank = async () => {
    const result = await getBank();

    console.log(result);
    setBank(result);

    const user = await getUser();
    console.log(user);
    setNewBank((prevBank) => ({
      ...prevBank,
      username: user.username,
    }));
  };

  useEffect(() => {
    callBank();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container m-auto overflow-y-hidden">
      <div className="p-10 mx-20 flex space-x-5">
        <div className="flex flex-col">
          <div>
            <div className=" dark:bg-adopsoftdark bg-adoplight w-[500px] p-4 rounded-lg animate-[wiggle_1s_ease-in-out_infinite] max-h-[600px] overflow-y-scroll">
              <div>ถอนเงิน</div>
              <div className="flex flex-col space-y-4 m-2">
                <div className="flex flex-col">
                  <label className="text-lg" htmlFor="">
                    จำนวนเงินที่ต้องการถอน
                  </label>
                  <input
                  type="number"
                  className="bg-adopdark rounded-lg text-white my-2"
                  value={newBank.amount}
                  onChange={typeAmount}
                  />
                  <div
                    className={`text-red-500 text-lg mb-3 ${
                        withdrawAmountError === true ? "" : "hidden"
                    }`}
                  >
                    กรุณาระบุจำนวนเงินที่ต้องการถอน
                  </div>
                  <div
                    className={`text-red-500 text-lg mb-3 ${
                        notengouth === true ? "" : "hidden"
                    }`}
                  >
                    ขั้นต่ำ 100 
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center space-x-2">
                <div
                  onClick={handleSubmit}
                  className="py-2 px-6 bg-adoppix rounded-lg text-white text-lg cursor-pointer hover:opacity-75 duration-300"
                >
                  ถอนเงิน
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 mx-10">
          <div className="mb-5">บัญชีของฉัน</div>
          <div
            className={`text-red-500 text-lg mb-3 ${
              bankError === true ? "" : "hidden"
            }`}
          >
            กรุณาเลือกธนาคาร
          </div>
          {bank.length > 0
            ? bank.map((bank, index) => (
                <div
                  onClick={() => selectBank(bank, index)}
                  key={index}
                  className={`${
                    bankSelect === index ? "border-2 border-adoppix" : ""
                  } bg-adopsoftdark p-4 rounded-lg text-lg w-[300px]`}
                >
                  <div className="flex space-x-4">
                    <div>เลขที่บัญชี :</div>
                    <div>{bank.number}</div>
                  </div>
                  <div className="flex space-x-4">
                    <div>ธนาคาร :</div>
                    <div>{bank.name}</div>
                  </div>
                  <div className="flex space-x-4">
                    <div>ชื่อบัญชี :</div>
                    <div>{bank.fullname}</div>
                  </div>
                </div>
              ))
            : "ยังไม่มีธนาคาร"}
        </div>
      </div>
    </div>
  );
};
