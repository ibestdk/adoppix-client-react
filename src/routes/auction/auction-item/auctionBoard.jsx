import { useEffect } from "react";
import { useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { AiFillFire } from "react-icons/ai";
export const AuctionBoard = ({
  money,
  auctionData,
  dateExpire,
  timeExpire,
  handleBids,
  bids,
  bidsAuction,
  multiple,
}) => {
  const [timenow, setTimenow] = useState();
  useEffect(() => {
    setTimenow(new Date(Date.now()).toISOString());
  }, []);
  return (
    <div className="bg-adopsoftdark h-auto  sm:h-[500px] w-full min-w-[300px]  sm:w-[350px] mt-4 sm:mt-0 rounded-lg">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          {auctionData && (
            <div>
              {auctionData.currentBid === null ? (
                <div>
                  {auctionData.stopTime !== null ? (
                    <div className="mt-14 mx-auto text-center">
                      <Countdown
                        date={`${dateExpire} ${timeExpire}`}
                        renderer={renderer}
                        data={auctionData}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                <div>
                  {auctionData.status == 2 ? (
                    <div className="flex justify-center items-center">
                      <Completionist />
                    </div>
                  ) : (
                    <div>
                      {auctionData.stopTime !== null ? (
                        <div className="mt-14 mx-auto text-center">
                          <Countdown
                            date={`${dateExpire} ${timeExpire}`}
                            renderer={renderer}
                            data={auctionData}
                          />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="mx-10 mt-4">
            <div>
              <div className="flex justify-between">
                <div className="text-sm">
                  ราคาเริ่ม : {auctionData && auctionData.openPrice}
                </div>
                <div className="text-sm">
                  บิดขั้นต่ำ : {auctionData && auctionData.minimumBid}
                </div>
              </div>
              {auctionData && (
                <div className="flex items-center mt-1">
                  <AiFillFire className="text-red-600 text-xl " />
                  <div className="text-sm flex">
                    :
                    <div className="px-1">
                      {auctionData.hotClose >= 0
                        ? auctionData.hotClose
                        : "ไม่มี"}
                      {auctionData.hotClose === null && "ไม่มี"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {auctionData && (
            <div>
              <div className="mt-8 mx-10">
                <div className="text-right text-4xl font-bold text-adoppix">
                  {auctionData.currentBid == null ? (
                    <div className="text-lg">การประมูลยังไม่เริ่ม</div>
                  ) : (
                    <div>{auctionData.currentBid.amount}</div>
                  )}
                </div>
                <div>
                  <hr className="my-2" />
                </div>
                {auctionData.bidHistories &&
                auctionData.bidHistories.length <= 0 ? (
                  <div></div>
                ) : (
                  <div>
                    <div className="flex justify-end">
                      <div className="my-auto px-2 text-lg font-bold">By</div>
                      <div>
                        <img
                          className="h-[30px] w-[30px] rounded-full "
                          src={`https://pix.adoppix.com/public/${auctionData.bidHistories[0].profileImage}`}
                        />
                      </div>
                      <div className="text-lg truncate w-[auto] my-auto px-2">
                        {auctionData.currentBid.username}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {auctionData && (
          <div>
            {auctionData.currentBid === null ? (
              <div>
                {auctionData && (
                  <div className="mt-7">
                    <div className="flex justify-center">
                      <div
                        onClick={() => multiple(1.2)}
                        className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                      >
                        x1.2
                      </div>
                      <div
                        onClick={() => multiple(1.5)}
                        className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                      >
                        x1.5
                      </div>
                      <div
                        onClick={() => multiple(2)}
                        className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                      >
                        x2
                      </div>
                    </div>
                    <div>
                      <div className="mt-4">
                        <input
                          onChange={handleBids}
                          value={bidsAuction}
                          type="text"
                          id="default-input"
                          className="mt-2 mx-auto  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-[70%] p-2.5 dark:bg-adopdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                        />
                      </div>
                      <div className=" flex justify-center">
                        <button
                          onClick={bids}
                          className="rounded-lg bg-adoppix px-2 py-2 w-10/12 mx-auto my-2 "
                        >
                          บิด
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {auctionData.status == 2 ? (
                  <div></div>
                ) : (
                  <div>
                    {auctionData && (
                      <div className="mt-7">
                        <div className="flex justify-center">
                          <div
                            onClick={() => multiple(1.2)}
                            className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                          >
                            x1.2
                          </div>
                          <div
                            onClick={() => multiple(1.5)}
                            className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                          >
                            x1.5
                          </div>
                          <div
                            onClick={() => multiple(2)}
                            className="cursor-pointer w-14 h-9 py-2 text-center mx-1 text-sm font-bold px-4 rounded-lg  bg-adoppix text-adoplight "
                          >
                            x2
                          </div>
                        </div>
                        <div>
                          <div className="mt-4">
                            <input
                              onChange={handleBids}
                              value={bidsAuction}
                              type="text"
                              id="default-input"
                              className="mt-2 mx-auto  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-400 focus:border-gray-400 block w-[70%] p-2.5 dark:bg-adopdark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                            />
                          </div>
                          <div className=" flex justify-center">
                            <button
                              onClick={bids}
                              className="rounded-lg bg-adoppix px-2 py-2 w-10/12 mx-auto my-2 "
                            >
                              บิด
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Completionist = () => (
  <span className="text-center">การประมูลจบลงแล้ว</span>
);

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed, data }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        <div className="">
          <div className="flex m-auto justify-center">
            {/*    <div className="p-4 bg-adopdark rounded-lg">{zeroPad(days)} </div>
            <p className="my-auto mx-2">
              :
      </p> */}
            <div className="p-4 bg-adopdark rounded-lg">{zeroPad(hours)} </div>
            <p className="my-auto mx-2 font-black">:</p>
            <div className="p-4 bg-adopdark rounded-lg">
              {zeroPad(minutes)}{" "}
            </div>
            <p className="my-auto mx-2 font-black">:</p>
            <div className="p-4 bg-adopdark rounded-lg">
              {zeroPad(seconds)}{" "}
            </div>
          </div>
        </div>
      </span>
    );
  }
};
