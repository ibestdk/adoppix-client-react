import { TextInput } from "flowbite-react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { CardFeed } from "../../../components/auction/auction-index-card-feed/card-feed";
import Slider from "@mui/material/Slider";
import { Pagination } from "../../../components/pagination/pagination";
import { LikeList } from "../../../components/auction/like/like";
import { useNavigate } from "react-router-dom";
import { getAPIBalance } from "../../../services/userService";
import { getToken } from "../../../services/authorize";
function valuetext(value) {
  return `{value}`;
}

export const AuctionIndex = ({ plus }) => {
  const navigate = useNavigate();
  const [filtersList, setFilterList] = useState();
  const [filterSelected, setFilterSelected] = useState();
  const [maxValue, setMaxValue] = useState(10000);


  const [i, setI] = useState(0);
  const [balance, setBalance] = useState();

  
  const getBalance = async () => {
    const result = await getAPIBalance();
    setBalance(result);
  };

  const userOrGuest = async () => {
    const token = getToken();
    if (token === false || token === undefined) {
    } else {
      getBalance();
    }
  };

  const [value, setValue] = useState([0, 10000]);
  const [selectValue, setSelectValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSelectValue(newValue);
    console.log(newValue);
  };

  const handleplus = () => {
    plus();
  };

  const callFilters = async () => {
    let response = await axios({
      method: "get",
      url: `  https://api.adoppix.com/api/Auction/filters`,
    }).catch((err) => console.log(err.response));
    // console.log(response.data.data);
    setFilterList(response.data.data);
    setMaxValue(response.data.data.maximumAmount);
    setValue([
      response.data.data.minimumAmount,
      response.data.data.maximumAmount,
    ]);
  };

  useEffect(() => {
    userOrGuest();
    callFilters();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [filterSelected]);
  useEffect(() => {
    setCurrentPage(0);
    
  }, [value]);
  return (
    <div className="bg-adoplight dark:bg-adopdark min-h-screen h-[1500px] relative ">
      <div className="sticky top-8 pt-10 z-20">
        <div className="flex mr-10 justify-end items-end space-x-4">
          <LikeList istate={i} />
        </div>
        <div className="text-adoppix duration-300 justify-end mr-10 pt-4 flex items-center ">
          <div className=" bg-adopsoftdark rounded-lg p-2 flex space-x-2">
            <div>{balance}</div>
            <GiTwoCoins />
            <AiOutlinePlusCircle
              onClick={() => navigate("../topup")}
              className="  text-white"
            />
          </div>
        </div>
      </div>
      <div className="relative top-2">
        <div className="container m-auto">
          <div className="sm:grid sm:grid-cols-12 sm:gap-4 ">
            <div className="bg-adopsoftdark ml-5 mr-5 col-span-3  max-h-[540px] rounded-lg">
              <div className="p-5">
                { /** <div className="mb-6">
                  <div>
                    <div className="mb-2 block"></div>
                    <div className="flex  rounded-lg py-2 px-4 bg-adopdark">
                      <BsSearch className="text-white m-2" />
                      <input className="w-full bg-adopdark" />
                    </div>
                  </div>
  </div>**/}
                <div className="my-2">
                  <div className="border-b-2 border-dashed border-adopdark ">
                    <p className="text-xl pb-1">CATEGORIES</p>
                  </div>
                  <div className="m-4">
                    {filtersList &&
                      filtersList.tags &&
                      filtersList.tags.map((tag, tagIndex) => (
                        <div
                          className="my-1 text-lg hover:brightness-110  duration-150 cursor-pointer text-adoplighticon hover:text-white"
                          key={tagIndex}
                        >
                          <div
                            onClick={() => {
                              filterSelected === tag.name
                                ? setFilterSelected(null)
                                : setFilterSelected(tag.name);
                            }}
                            className={`flex justify-between ${
                              filterSelected === tag.name
                                ? "font-bold text-white"
                                : ""
                            }`}
                          >
                            <p>{tag.name}</p>
                            <p>{tag.amount}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <div className="border-b-2 border-dashed border-adopdark ">
                    <p className="text-xl pb-1">ช่วงราคา</p>
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
                istate={i}
                setI={setI}
                filterselected={filterSelected}
                value={selectValue}
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
