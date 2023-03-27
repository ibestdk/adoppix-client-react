import { getToken } from "../../services/authorize";
import { useState, useEffect } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";
import { FaAngleDoubleUp } from "react-icons/fa";
export const ChatList = () => {
  const [adopLetter, setadopLetter] = useState(false);
  const [chatopen, setChatopen] = useState(false);

  const handleOpenAdopLetter = () => {
    setadopLetter(!adopLetter);
  };
  const handleOpenChat = () => {
    setChatopen(!chatopen);
  };

  const token = getToken();

  if (token == null) return null;

  return (
    <div className="fixed z-40 right-4 bottom-0 cursor-pointer">
      {chatopen ? (
        <div>
          <div
            className={`duration-300  py-2 bg-adoppix  text-adoplight rounded-t-lg ${
              adopLetter ? "h-[500px]" : "h-[60px]"
            } w-[300px] text-center`}
          >
            <div className="py-2 flex justify-between px-4">
              <div onClick={handleOpenChat}>
                <AiOutlineCaretLeft />
              </div>
              <div> Bike.Chanokchon</div>
              <div onClick={handleOpenAdopLetter}>
                <FaAngleDoubleUp className={`${adopLetter ? "rotate-180" : ""}  duration-300 `} />
              </div>
            </div>
            {adopLetter && (
              <div
                className={`bg-adoplight pt-3 dark:bg-adopsoftdark w-full ${
                  adopLetter ? "h-[85%]" : "h-[0px]"
                }   duration-300`}
              >
                welcome to chat
              </div>
              )}
              {adopLetter && (
              <div>
                <input
                  className="bg-adoplight text-adopdark dark:bg-adopsoftdark dark:text-adoplight rounded-full py-1 px-2 mt-1"
                  type="text"
                />
              </div>
              )}
          </div>
        </div>
      ) : (
        <div>
          <div
            className={`duration-300  py-2 bg-adoppix  text-adoplight rounded-t-lg ${
              adopLetter ? "h-[500px]" : "h-[60px]"
            } w-[300px] text-center`}
          >
            <div onClick={handleOpenAdopLetter} className="py-2 flex px-3 justify-between">
              <div>AdopLetter</div>
              <div >
              <FaAngleDoubleUp className={`${adopLetter ? "rotate-180" : ""}  duration-300 `} />
              </div>
            </div>
            {adopLetter && (
              <div
                className={`bg-adoplight dark:bg-adopsoftdark w-full ${
                  adopLetter ? "h-[90%]" : "h-[0px]"
                }  duration-300`}
              >
                <div
                  onClick={handleOpenChat}
                  className="hover:brightness-75 duration-200 bg-adoplight dark:bg-adopsoftdark px-4 py-2 flex"
                >
                  <div className="mx-2">
                    <img
                      className=" rounded-full w-[50px] h-[50px]"
                      src="https://pix.adoppix.com/public/43212205-5814-4274-a04d-748a13a15a7c.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="text-adopdark dark:text-adoplight text-lg">
                      Bike.Chanokchon
                    </div>
                    <div className="text-adoplighticon text-sm text-left">
                      สวัสดีค้าบสุดหล่อ
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
