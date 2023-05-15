import { TextInput } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardFeed } from "../../../components/auction/auction-index-card-feed/card-feed";
import Slider from "@mui/material/Slider";
import { Pagination } from "../../../components/pagination/pagination";
import { LikeList } from "../../../components/auction/like/like";
function valuetext(value) {
  return `{value}`;
}

export const AuctionIndex = () => {
  const [filtersList, setFilterList] = useState();
  const [value, setValue] = useState([0, 10000]);
  const [i, setI] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const callFilters = async () => {
    let response = await axios({
      method: "get",
      url: `  https://api.adoppix.com/api/Auction/filters`,
    }).catch((err) => console.log(err.response));
    console.log(response.data.data);
    setFilterList(response.data.data);
    setValue([
      response.data.data.minimumAmount,
      response.data.data.maximumAmount,
    ]);
  };

  useEffect(() => {
    callFilters();
  }, []);
  return (
    <div className="bg-adoplight dark:bg-adopdark min-h-screen h-[1500px] relative ">
      <div className=" sticky pt-10 z-20">
        <div className=" flex mr-10 justify-end items-end  ">
          <LikeList istate={i} />
        </div>
      </div>
      <div className="relative top-2">
        <div className="container m-auto">
          <div className="sm:grid sm:grid-cols-12 sm:gap-4 ">
            <div className="bg-adopsoftdark ml-5 mr-5 col-span-3  h-[600px] rounded-lg">
              <div className="p-5">
                <div className="mb-6">
                  <div>
                    <div className="mb-2 block"></div>
                    <div className="flex border-2 rounded-lg py-2 px-4">
                      <BsSearch className="text-white m-2" />
                      <input className="w-full" />
                    </div>
                  </div>
                </div>
                <div className="my-2">
                  <div className="border-b-2 border-dashed">
                    <p className="text-xl">CATEGORIES</p>
                  </div>
                  <div className="m-4">
                    {filtersList &&
                      filtersList.tags &&
                      filtersList.tags.map((tag, tagIndex) => (
                        <div
                          className="my-1 text-lg hover:brightness-110  duration-150 cursor-pointer text-adoplighticon hover:text-white"
                          key={tagIndex}
                        >
                          <div className="flex justify-between">
                            <p>{tag.name}</p>
                            <p>{tag.amount}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="m-4 text-lg text-adoplighticon">ยังไม่มี</div>
                </div>
                <div>
                  <div className="border-b-2 border-dashed">
                    <p className="text-xl">ช่วงราคา</p>
                  </div>
                  <div className="mx-4  my-14  text-lg text-adoplighticon">
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={value}
                      onChange={handleChange}
                      valueLabelDisplay="on"
                      getAriaValueText={valuetext}
                      max={10000}
                      step={50}
                    ></Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-adopsoftdark mr-5 p-10 col-span-9 min-h-[1350px] w-full rounded-lg flex flex-col justify-between">
              <CardFeed
                totalpage={totalPage}
                settotalpage={setTotalPage}
                currentpage={currentPage}
                setcurrentpage={setCurrentPage}
                seti={setI}
                istate={i}
              />
              <Pagination
                totalpage={totalPage}
                currentpage={currentPage}
                setcurrentpage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
