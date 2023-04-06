import { useEffect, useState } from "react"
import axios from "axios"
// import Heart from "react-heart"
import { getToken } from "../../../services/authorize"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MarketOwl from "./market-owl.component";
import { useNavigate } from "react-router-dom";

import {MarketFeedCard} from "../market-index/market-feed-card";

const textBorderStyle = {
    textShadow: "2px 0 #4F9FDA, -2px 0 #4F9FDA, 0 2px #4F9FDA, 0 -2px #4F9FDA, 1px 1px #4F9FDA, -1px -1px #4F9FDA, 1px -1px #4F9FDA, -1px 1px #4F9FDA"
}

function valuetext(value) {
    return `${value}°C`;
}

export const MarketFeed = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState([30, 10000]);
    // [30, 10000]

    const tagOwlClicked = (tag) => {
        setTags(tag);
        console.log("TagOwlCol : " + tag);
        callProductCard();
    }

    const [tags, setTags] = useState();
    const tagClicked = (tag, index) => {
        if (tags == tag) {
            $(`#${index}`).prop('checked', false);
            setTags(null);
        } else {
            setTags(tag);
        }
        console.log(tag);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [take, setTake] = useState(20)
    const [page, setPage] = useState(0)
    const [headers, setHeaders] = useState({})

    const [active, setActive] = useState(false)


    const [productItems, setProductItems] = useState()
    const callProductCard = async () => {
        const bodyData = {}

        const token = getToken();
        console.log(token);
        if (token === false || token === undefined) {
            setHeaders({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }
        else {
            setHeaders({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }

        let response;
        if (tags == null) {
            response = await axios({
                method: "get",
                url: `https://api.adoppix.com/api/Product?MinimumAmount=${value[0]}&MaximumAmount=${value[1]}&Take=${take}&Page=${page}`,
                data: bodyData,
                headers: headers
            }).catch(err => console.log(err.response))
        } else {
            response = await axios({
                method: "get",
                url: `https://api.adoppix.com/api/Product?Tag=${tags}&MinimumAmount=${value[0]}&MaximumAmount=${value[1]}&Take=${take}&Page=${page}`,
                data: bodyData,
                headers: headers
            }).catch(err => console.log(err.response))
        }
        console.log(response.data.data)
        setProductItems(response.data.data)
    }

    const [filterOptions, setfilterOption] = useState()
    const callFilterOption = async () => {
        const bodyData = {}

        const token = getToken();
        console.log(token);
        if (token === false || token === undefined) {
            // console.log("call Foundtion 1")
            setHeaders({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }
        else {

            // console.log("call Foundtion 2")
            setHeaders({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }
        let response = await axios({
            method: "get",
            url: 'https://api.adoppix.com/api/Product/filters',
            data: bodyData,
            headers: headers
        }).catch(err => console.log(err.response))
        setfilterOption(response.data.data)
        setValue([response.data.data.minimumAmount, response.data.data.maximumAmount])
        console.log(response.data.data)
        // console.log(response.data.data.minimumAmount)
        // console.log(response.data.data.maximumAmount)
    }

    useEffect(() => {
        callProductCard();
        callFilterOption();

        // // block right click
        // // document.addEventListener("contextmenu", function (event) {
        // //     event.preventDefault();
        // // });

        // // block F12
        // document.addEventListener("keydown", function (event) {
        //     if (event.keyCode === 123) {
        //         event.preventDefault();
        //     }
        // });

        // // block Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C
        // document.addEventListener("keydown", function (event) {
        //     if ((event.ctrlKey && event.shiftKey) && (event.key === "I" || event.key === "J" || event.key === "C")) {
        //         event.preventDefault();
        //     }
        // });

        // // block Ctrl + U
        // document.addEventListener("keydown", function (event) {
        //     if ((event.ctrlKey) && (event.key === "U")) {
        //         event.preventDefault();
        //     }
        // });

    }, []);

    return (
        <div className="bg-adoplight dark:bg-adopdark min-h-screen h-full overflow-auto">
            <div className="relative">
                <div className="container m-auto">
                    <div className="mb-10">
                        <div className="grid grid-cols-12 gap-4">
                            {productItems && (
                                <div className="container col-span-3">
                                    <div>
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
                                            <div className="row mt-4">
                                                <button onClick={() => { navigate('my-shop') }} className="text-center text-base w-full px-4 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-adoplight hover:dark:bg-adoppix 
                hover:bg-adoppix hover:text-white duration-300 text-adopsoftdark shadow-md">
                                                    ร้านค้าของฉัน
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="dark:bg-adopsoftdark dark:text-adoplight dark:shadow-md m-[1rem_0] shadow-[0_0_5px_lightgray] p-[1rem] rounded-[.5rem]">
                                                    <div className="">
                                                        <h5 className="mt-2 text-adopdark dark:text-adoplight text-base">
                                                            แท็กที่ถูกค้นหาบ่อย
                                                        </h5>
                                                        <hr />
                                                        <form action="" className="py-2">
                                                            {filterOptions && filterOptions.tags.map((tag, index) => (
                                                                <div key={index} className="flex">
                                                                    <input onClick={() => { tagClicked(tag.name, index) }} id={index} type="radio" name="tag" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
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
                                                            {filterOptions && filterOptions.types.map((type, index) => (
                                                                <div key={index} className="flex">
                                                                    <input id={type} type="radio" name="typeProduct" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
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
                                                                getAriaLabel={() => 'Temperature range'}
                                                                value={value}
                                                                onChange={handleChange}
                                                                valueLabelDisplay="on"
                                                                getAriaValueText={valuetext}
                                                                max='10000'
                                                                step={10}
                                                            ></Slider>
                                                        </Box>
                                                    </div>
                                                    <div className="mt-2 w-full">
                                                        <button onClick={callProductCard} type="submit" className="w-full inline-block align-middle p-3 bg-adoppix shadow-lg rounded-md">
                                                            <p className="mb-0"> <i className=""></i> ค้นหา</p>
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
                                                <button className=" text-center text-base w-full px-4 py-5 rounded-md bg-adoplighticon dark:bg-adopsoftdark">
                                                </button>
                                            </div>
                                            <div className="row mt-4">
                                                <button className=" text-center text-base w-full px-4 py-5 rounded-md bg-adoplighticon dark:bg-adopsoftdark shadow-md">
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="bg-adoplighticon dark:bg-adopsoftdark h-96 dark:shadow-md m-[1rem_0] shadow-[0_0_5px_lightgray] p-[1rem] rounded-[.5rem]">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                            {productItems && (
                                <div className="dark:bg-adopsoftdark shadow-md p-10 mt-[100px] col-span-9 h-fit w-full rounded-lg">
                                    {productItems && productItems.length > 0 && tags == null && (
                                        <div className="dark:text-adoplight text-adopdark">
                                            ผลลัพธ์การค้นหา {productItems && productItems.length} รายการ
                                        </div>
                                    )}
                                    {productItems && productItems.length > 0 && tags != null && (
                                        <div className="dark:text-adoplight text-adopdark">
                                            ผลลัพธ์การค้นหา "{tags}" ทั้งหมด {productItems && productItems.length} รายการ
                                        </div>
                                    )}
                                    {productItems <= 0 && (
                                        <div className="dark:text-adoplight text-adopdark">
                                            ไม่พบผลลัพธ์การค้นหา
                                        </div>
                                    )}
                                    <hr className="mt-5 mb-6 text-adopdark dark:text-adoplight" />
                                    <div className="mb-4">
                                        <MarketOwl testClick={tagOwlClicked} />
                                    </div>
                                    <div className="grid grid-cols-5 gap-4">
                                        {productItems && productItems.map((productItem, index) => (
                                            <MarketFeedCard key={index} data={productItem} />
                                        ))
                                        }
                                    </div>
                                </div>
                            )}
                            {!productItems && (
                                <div className="bg-adoplighticon dark:bg-adopsoftdark shadow-md p-10 mt-[100px] col-span-9 h-full w-full rounded-lg animate-pulse">
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}