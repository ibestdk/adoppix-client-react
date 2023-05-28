import React, { useState, useEffect } from "react";
import {
  getBank,
  getWithDrawLogs,
  postBank,
  postWithdraw,
} from "../../services/bankService";
import { getUser } from "../../services/authorize";
import { SuccessCard } from "../../components/success-card/success-card";
import { getAPIBalance } from "../../services/userService";
import MoneyNumber from "../../services/moneyService";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlineReload } from "react-icons/ai";

export const WithDrawn = () => {
  const [bank, setBank] = useState([]);
  const [bankSelect, setBankSelect] = useState();
  const [bankError, setBankError] = useState(false);
  const [withdrawAmountError, setBwithdrawAmountError] = useState(false);
  const [notengouth, setNotengouth] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logs, setLogs] = useState([]);
  const handleOnClose = () => setSuccess(false);
  const [newBank, setNewBank] = useState({
    username: "",
    amount: "",
    bank: "",
    number: "",
    name: "",
  });

  const [userMoney, setUserMoney] = useState(0);

  const callUsermoney = async () => {
    const result = await getAPIBalance();
    setUserMoney(result);
  }

  const typeAmount = (e) => {
    setNewBank((prevBank) => ({
      ...prevBank,
      amount: e.target.value,
    }));
    setBwithdrawAmountError(false);
    setNotengouth(false);
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
    if (
      newBank.amount === null ||
      newBank.amount === undefined ||
      newBank.amount === ""
    ) {
      setBwithdrawAmountError(true);
    }
    if (newBank.amount < 100) {
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
    callLogs();
    setSuccess(true);
    callUsermoney();
  };

  const callLogs = async () => {
    const result = await getWithDrawLogs();
    console.log(result);
    setLogs(result.reverse());
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
    callLogs();
    callUsermoney();
  }, []);

  useEffect(() => {}, []);

  return (
    <div className="container m-auto overflow-y-hidden">
      <div className="p-10 mx-20 flex flex-col space-x-5">
        <SuccessCard
          visible={success}
          onClose={handleOnClose}
          title={"ส่งคำขอถอนเงินสำเร็จ"}
          text={"เงินจะเข้าบัญชีหลังจากทางระบบยืนยัน"}
        />
        <div className="p-10 flex space-x-5">
          <div className="flex flex-col">
            <div>
              <div className="flex mb-5 text-xl">
                <p>ยอดเงินคงเหลือของฉัน</p>
                <div className="px-2 flex space-x-2 items-center">
                  <MoneyNumber amount={userMoney} />
                  <div className="flex relative">
                  <GiTwoCoins className="text-adoppix" />
                  <AiOutlineReload onClick={callUsermoney} className="absolute text-sm right-0 mr-[-7px] mt-[-5px] cursor-pointer"/>
                  </div>
                </div>
              </div>
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
        <div>
          <div>ประวัติการถอนเงิน</div>
          <div className="m-3 w-[600px] text-lg">
            {logs.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th className="w-[20%]">จำนวนเงิน</th>
                    <th className="w-[40%]">เลขบัญชี</th>
                    <th className="w-[40%]">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr
                      key={index}
                      className={`p-2 rounded-lg ${
                        index % 2 === 0 ? "bg-adopdark" : "bg-adopsoftdark"
                      }`}
                    >
                      <td className="w-[20%] text-start">{log.money}</td>
                      <td className="w-[40%] text-center">{log.number}</td>
                      <td
                        className={`w-[40%] text-end ${
                          log.status === 0
                            ? "text-adoplighticon"
                            : log.status === 1
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {log.status === 0
                          ? "รอดำเนินการ"
                          : log.status === 1
                          ? "ยันยันแล้ว"
                          : "ถูกปฏิเสธ"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
