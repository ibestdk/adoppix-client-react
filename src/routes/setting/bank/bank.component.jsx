import { useEffect } from "react";
import { useState } from "react";
import { getBank } from "../../../services/bankService";
import AddNewBank from "./create/modalCreate";

export const Bank = () => {
  const [bank, setBank] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleOnClose = () => setOpenModal(false);

  const callBank = async () => {
    const result = await getBank();
    console.log(result);
    setBank(result);
  };

  useEffect(() => {
    callBank();
  }, []);

  return (
    <div className="sm:w-[50%]">
      <div className="flex justify-between items-center">
        <div>ธนาคาร</div>
        <div
          onClick={() => setOpenModal(true)}
          className="text-lg rounded-lg bg-adoppix text-white py-1 px-4 cursor-pointer"
        >
          เพิ่มธนาคาร
        </div>
      </div>
      <div className="mt-5 mx-10">
        {bank.length > 0
          ? bank.map((bank, index) => (
              <div key={index} className="bg-adopsoftdark p-4 rounded-lg text-lg w-[300px]">
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
      <AddNewBank
        onClose={handleOnClose}
        visible={openModal}
        reloadFeeds={callBank}
      />
    </div>
  );
};
