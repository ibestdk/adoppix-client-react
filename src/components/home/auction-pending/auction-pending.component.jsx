import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

 const OwlAuction = () => {
  const [newAuction, setNewAuction] = useState([]);
  const [onload, setOnload] = useState(true);
  const [timenow, setTimenow] = useState();
  const options = {
    loop: true,
    center: true,
    items: 3,
    margin: 0,
    autoplay: true,
    dots: true,
    autoplayTimeout: 6000,
    smartSpeed: 800,
    nav: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  };
  function handleContextMenu(event) {
    event.preventDefault();
  }
  useEffect(() => {
    const getNewAuction = async () => {
      try {
        const response = await axios.get(
          "https://api.adoppix.com/api/Auction?Take=10&Page=1"
        );
        setNewAuction(response.data.data.auctionsList);
        //console.log("newAuction");
        //console.log(newAuction);
        setOnload(false);
      } catch (error) {
        //console.log(error);
      }
    };
    getNewAuction();
  }, [setNewAuction]);
  useEffect(() => {
    setTimenow(new Date(Date.now()).toISOString());
  }, []);
  return (
    <div className=" mt-5 p-5 container m-auto bg-adoplight shadow-section-center dark:bg-adopsoftdark rounded-lg">
    <div>
      <h2 className="text-adopsoftdark text-center text-2xl font-bold dark:text-adoplight duration-300">
        การประมูลใหม่
      </h2>
    </div>
    <div className="mt-3">
      { !onload &&
        <OwlCarousel {...options}>
          {newAuction.length > 0 &&
            newAuction.map((auctionItem, index) => (
              <div key={index} className="w-[240px]">
              <div className="relative overflow-hidden">
                <NavLink
                  className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear"
                  to={`auction/${auctionItem.auctionId}`}
                >
                  <img
                    onContextMenu={handleContextMenu}
                    className="h-[320px] rounded-lg w-[240px] object-cover overflow-hidden "
                    src={`https://pix.adoppix.com/public/${auctionItem.image}`}
                  />
                </NavLink>


                <div className="absolute bottom-0 h-16 hover:h-36 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                  <div className="text-lg flex justify-between items-center">
                    <div className="truncate w-[ุ50%] text-lg">
                      {auctionItem.title}
                    </div>
                    <div className="text-adoppix font-semibold text-lg">
                      {auctionItem.currentAmoutBid > 0
                        ? auctionItem.currentAmoutBid
                        : "-"}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <div>
                        <img
                          onContextMenu={handleContextMenu}
                          className="h-[30px] rounded-full w-[30px] object-cover mx-1"
                          src={`https://pix.adoppix.com/public/${auctionItem.profileImage}`}
                        />
                      </div>
                      <div className="text-sm font-bold my-auto truncate w-[60%]">
                        {auctionItem.username}
                      </div>
                    </div>
                    <div className="w-[35%]">
                      <div style={{ width: "1.5rem" }}>
                        {auctionItem && (
                          <div>
                            {auctionItem.stopTime !== null ? (
                              <div>
                                {timenow > auctionItem.stopTime ? (
                                  <div className="bg-red-500 rounded-md w-[60px] h-[22px] text-sm text-center">
                                    สิ้นสุด
                                  </div>
                                ) : (
                                  <div className="bg-green-500 rounded-md w-[60px] h-[22px] text-sm text-center">
                                    ประมูลอยู่
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="bg-yellow-200 rounded-md w-[60px] h-[22px] text-sm text-center">
                                ยังไม่เริ่ม
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex flex-wrap">
                    {auctionItem.tags &&
                      auctionItem.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="py-1 px-1 rounded-lg flex"
                          style={{ flexBasis: "auto" }}
                        >
                          <p className="text-sm cursor-pointer">#{tag}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            ))}
        </OwlCarousel>
      }
    </div>
  </div>
  );
};
export default OwlAuction;