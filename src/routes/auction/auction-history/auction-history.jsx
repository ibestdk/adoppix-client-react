import { useState, useEffect } from "react";
import { getAuctionHistory } from "../../../services/auctionService";

export const AuctionHistory = () => {
  const [history, setHistory] = useState([]);

  const callAuctionHistory = async () => {
    const result = await getAuctionHistory();
    // console.log(result);
    setHistory(result);
  };

  useEffect(() => {
    callAuctionHistory();
  }, []);
  useEffect(() => {
    // console.log(history);
  }, [history]);
  return (
    <div>
      <div className=" flex justify-center items-center ">
        <div className="sm:w-[80%] sm:h-[80vh] rounded-lg mt-10  p-5 bg-adopsoftdark">
          <div>ประวัติการประมูล</div>
          {history && (
            <div>
              {history.length > 0 ? (
                <div className="flex flex-col space-y-1 py-5  mt-10 h-[680px] text-lg">
                  <div className="flex justify-between shadow-lg">
                    <div className="w-[10%] text-center">รูป</div>
                    <div className="w-[30%] text-center">ไอดีการประมูล</div>
                    <div className="w-[20%] text-center">ราคา</div>
                    <div className="w-[20%] text-center">เวลา</div>
                    <div className="w-[10%] text-center">สถานะ</div>
                  </div>
                  <div className="overflow-y-scroll">
                    {history.map((line, index) => (
                      <div
                        className={`py-1 px-4 rounded-lg justify-between flex items-center space-x-2 hover:brightness-125 duration-300 ${
                          index % 2 === 0 ? "bg-adopdark" : "bg-adopsoftdark"
                        }`}
                        key={index}
                      >
                        <div className="w-[10%] text-center">
                          <img
                            className="h-[80px] mx-auto rounded-lg w-[80px] object-contain overflow-hidden "
                            src={`https://pix.adoppix.com/public/${line.imagePreview}`}
                          />
                        </div>
                        <div className="w-[30%] text-center">
                          {line.auctionId}
                        </div>
                        <div className="w-[20%] text-center">{line.amount}</div>
                        <div className="w-[20%] text-center">
                          {line.created}
                        </div>
                        <div
                          className={`w-[10%] text-center ${
                            line.status === 0
                              ? "text-adoplighticon"
                              : line.status === 1
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {" "}
                          {line.status === 0
                            ? "กำลังประมูล"
                            : line.status === 1
                            ? "ชนะการประมูล"
                            : "แพ้การประมูล"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>ไม่มี</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
