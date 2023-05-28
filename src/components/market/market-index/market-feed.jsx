import { useEffect, useState } from "react";
import axios from "axios";
// import Heart from "react-heart"
import { getToken } from "../../../services/authorize";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MarketOwl from "./market-owl.component";
import { useNavigate } from "react-router-dom";

import { MarketFeedCard } from "../market-index/market-feed-card";
import {
  CallApiMarketList,
  CallMarketFilter,
} from "../../../services/marketService";
import { Pagination } from "../../pagination/pagination";
import { goToTop } from "../../../services/optionService";

function valuetext(value) {
  return `${value}°C`;
}

export const MarketFeed = ({setI , istate}) => {
  const navigate = useNavigate();

  const [value, setValue] = useState([30, 10000]);

  const tagOwlClicked = (tag) => {
    setTags(tag);
    //console.log("TagOwlCol : " + tag);
    callProductCard();
  };

  const [tags, setTags] = useState();
  const tagClicked = (tag, index) => {
    if (tags == tag) {
      $(`#${index}`).prop("checked", false);
      setTags(null);
    } else {
      setTags(tag);
    }
    //console.log(tag);
  };

  const [isLogin, setIsLogin] = useState(false);
  const userOrGuest = async () => {
    const token = await getToken();
    if (token === false || token === undefined) {
      setIsLogin(false);
      callProductCard();
      callFilterOption();
    } else {
      setIsLogin(true);
      callProductCard();
      callFilterOption();
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [searchResult, setSearchResult] = useState();
  const [totalPage, setTotalPage] = useState();

  const [active, setActive] = useState(false);

  const [productItems, setProductItems] = useState();
  const callProductCard = async () => {
    const result = await CallApiMarketList(tags, value, currentPage);
    //console.log(result);
    setProductItems(result);
    setTotalPage(result.totalPages);
    setSearchResult(result.searchResult);
  };
  value;

  const [filterOptions, setfilterOption] = useState();
  const callFilterOption = async () => {
    const result = await CallMarketFilter();
    //console.log(result);
    setfilterOption(result);
    setValue([result.minimumAmount, result.maximumAmount]);
  };

  useEffect(() => {
    userOrGuest();
  }, []);

  useEffect(() => {
    callProductCard();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });;
  }, [currentPage]);

  return (
    <div className="bg-adoplight dark:bg-adopdark min-h-screen h-full overflow-auto">
      <div className="relative">
        <div className="container m-auto">
          <div className="mb-10">
            <div className="grid grid-cols-12 gap-4">
              {productItems && (
                <div className="ml-5 mr-5  col-span-3 h-full">
                  <div className="sticky">
                    <div className="row h-7 pt-10 pb-5 mb-10">
                      <div className="flex relative">
                        <p className="text-left absolute left-6 text-3xl font-bold no-underline duration-300 text-adopdark dark:text-adoplight">
                          ตลาดนัด
                        </p>
                      </div>
                    </div>

                    <div className="row mt-5 m-auto">
                      <div className="row mt-4">
                        <button className="text-center text-base w-full px-4 py-1 rounded-md bg-adoppix hover:opacity-90 duration-300 text-white shadow-md">
                          ตลาดนัด
                        </button>
                      </div>
                      {isLogin == true && (
                        <div className="row mt-4">
                          <button
                            onClick={() => {
                              navigate("my-shop");
                            }}
                            className="text-center text-base w-full px-4 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-adoplight hover:dark:bg-adoppix 
                hover:bg-adoppix hover:text-white duration-300 text-adopsoftdark shadow-md"
                          >
                            ร้านค้าของฉัน
                          </button>
                        </div>
                      )}
                      <div className="row">
                        <div className="dark:bg-adopsoftdark dark:text-adoplight dark:shadow-md m-[1rem_0] shadow-[0_0_5px_lightgray] p-[1rem] rounded-[.5rem]">
                          <div className="">
                            <h5 className="mt-2 text-adopdark dark:text-adoplight text-base">
                              แท็กที่ถูกค้นหาบ่อย
                            </h5>
                            <hr />
                            <form action="" className="py-2">
                              {filterOptions &&
                                filterOptions.tags.map((tag, index) => (
                                  <div key={index} className="flex">
                                    <input
                                      onClick={() => {
                                        tagClicked(tag.name, index);
                                      }}
                                      id={index}
                                      type="radio"
                                      name="tag"
                                      className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]"
                                    />
                                    <label className="flex text-adopdark dark:text-adoplight text-base">
                                      {tag.name}
                                    </label>
                                  </div>
                                ))}
                            </form>
                          </div>
                          <div className="">
                            <h5 className="mt-2 text-adopdark dark:text-adoplight text-base">
                              ประเภทสินค้า
                            </h5>
                            <hr />
                            <form action="" className="py-2">
                              {filterOptions &&
                                filterOptions.types.map((type, index) => (
                                  <div key={index} className="flex">
                                    <input
                                      id={type}
                                      type="radio"
                                      name="typeProduct"
                                      className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]"
                                    />
                                    {type == 1 && (
                                      <label className="flex text-adopdark dark:text-adoplight text-base">
                                        รูปภาพ
                                      </label>
                                    )}
                                    {type == 2 && (
                                      <label className="flex text-adopdark dark:text-adoplight text-base">
                                        สติ้กเกอร์
                                      </label>
                                    )}
                                  </div>
                                ))}
                            </form>
                          </div>
                          <div className="mt-2">
                            <h5 className="text-adopdark dark:text-adoplight">
                              ราคา
                            </h5>
                            <hr />
                            <Box className="text-adopdark dark:text-adoplight mt-10 mx-5">
                              <Slider
                                getAriaLabel={() => "Temperature range"}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="on"
                                getAriaValueText={valuetext}
                                max={10000}
                                step={10}
                              ></Slider>
                            </Box>
                          </div>
                          <div className="mt-2 w-full">
                            <button
                              onClick={callProductCard}
                              type="submit"
                              className="w-full inline-block align-middle p-3 bg-adoppix shadow-lg rounded-md"
                            >
                              <p className="mb-0">
                                {" "}
                                <i className=""></i> ค้นหา
                              </p>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {!productItems && (
                <div className="container col-span-3">
                  <div>
                    <div className="row h-7 pt-10 pb-5 mb-10">
                      <div className="flex relative">
                        <p className="text-left absolute left-6 text-3xl font-bold no-underline duration-300 text-adopdark dark:text-adoplight">
                          กำลังโหลด
                        </p>
                      </div>
                    </div>

                    <div className="row mt-5 m-auto animate-pulse duration-300">
                      <div className="row mt-4">
                        <button className=" text-center text-base w-full px-4 py-5 rounded-md bg-adoplighticon dark:bg-adopsoftdark"></button>
                      </div>
                      <div className="row mt-4">
                        <button className=" text-center text-base w-full px-4 py-5 rounded-md bg-adoplighticon dark:bg-adopsoftdark shadow-md"></button>
                      </div>
                      <div className="row">
                        <div className="bg-adoplighticon dark:bg-adopsoftdark h-96 dark:shadow-md m-[1rem_0] shadow-[0_0_5px_lightgray] p-[1rem] rounded-[.5rem]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {productItems && (
                <div className="dark:bg-adopsoftdark shadow-md p-10 mt-[30px] col-span-9 h-fit w-full rounded-lg">
                  {productItems &&
                    productItems.auctionsList.length > 0 &&
                    tags == null && (
                      <div className="dark:text-adoplight text-adopdark">
                        ผลลัพธ์การค้นหา {searchResult && searchResult} รายการ
                      </div>
                    )}
                  {productItems &&
                    productItems.auctionsList.length > 0 &&
                    tags != null && (
                      <div className="dark:text-adoplight text-adopdark">
                        ผลลัพธ์การค้นหา "{tags}" ทั้งหมด{" "}
                        {searchResult && searchResult} รายการ
                      </div>
                    )}
                  {productItems.auctionsList <= 0 && (
                    <div className="dark:text-adoplight text-adopdark">
                      ไม่พบผลลัพธ์การค้นหา
                    </div>
                  )}
                  <hr className="mt-5 mb-6 text-adopdark dark:text-adoplight" />
                  <div className="mb-4">
                  { /** <MarketOwl testClick={tagOwlClicked} /> */ }
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {productItems &&
                      productItems.auctionsList.map((productItem, index) => (
                        <div key={index}>
                          <MarketFeedCard data={productItem} setI={setI} istate={istate} />
                        </div>
                      ))}
                  </div>
                  <div>
                    <Pagination
                      totalpage={totalPage}
                      currentpage={currentPage}
                      setcurrentpage={setCurrentPage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
