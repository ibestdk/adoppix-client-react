import { useEffect, useState } from "react"
import axios from "axios"
// import Heart from "react-heart"
import { getToken } from "../../../services/authorize"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useNavigate } from "react-router-dom";
import { MarketMyShopFeedCard } from "./market-myShopFeed-card";


function valuetext(value) {
    return `${value}°C`;
}

export const MarketMyShopFeed = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState([0, 10000]);
    // [0, 10000]

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [take, setTake] = useState(20)
    const [page, setPage] = useState(0)
    const [headers, setHeaders] = useState({})

    const [active, setActive] = useState(false)

    const [productItems, setProductItems] = useState()
    const [productCount, setProductCount] = useState()
    const [onSaleCount, setOnSaleCount] = useState()
    const [total, setTotal] = useState()

    function handleContextMenu(event) {
        event.preventDefault();
    }

    const myProduct = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios({
            method: 'get',
            url: `https://api.adoppix.com/api/User/product-owner?take=${take}&page=${page}`,
            headers: headers
        })
            .then(response => {
                console.log(response.data.data);
                setProductItems(response.data.data.products);
                setProductCount(response.data.data.productCount);
                setOnSaleCount(response.data.data.onSaleCount);
                setTotal(response.data.data.total);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        myProduct();
        // callFilterOption();

        // block right click
        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        // block F12
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 123) {
                event.preventDefault();
            }
        });

        // block Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + Shift + C
        document.addEventListener("keydown", function (event) {
            if ((event.ctrlKey && event.shiftKey) && (event.key === "I" || event.key === "J" || event.key === "C")) {
                event.preventDefault();
            }
        });

        // block Ctrl + U
        document.addEventListener("keydown", function (event) {
            if ((event.ctrlKey) && (event.key === "U")) {
                event.preventDefault();
            }
        });

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
                                        <div className="row mt-10">
                                            <div className="flex">
                                                <p className="text-left text-6xl no-underline duration-300 text-adopdark dark:text-adoplight">
                                                    ร้านค้าของฉัน
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row mt-5 m-auto">
                                            <div className="row mt-4">
                                                <button onClick={() => { navigate('../') }} className="text-center text-base w-full px-4 py-1 rounded-md bg-white dark:bg-gray-700 dark:text-adoplight hover:dark:bg-adoppix 
                hover:bg-adoppix hover:text-white duration-300 text-adopsoftdark shadow-md">
                                                    ตลาดนัด
                                                </button>
                                            </div>
                                            <div className="row mt-4">
                                                <button className="text-center text-base w-full px-4 py-1 rounded-md bg-adoppix hover:opacity-90 duration-300 text-white shadow-md">
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
                                                            <div className="flex">
                                                                <input type="checkbox" name="tag" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
                                                                <label className="flex text-adopdark dark:text-adoplight text-base"> Cat</label>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="">
                                                        <h5 className="mt-2 text-adopdark dark:text-adoplight text-base">
                                                            ประเภทที่ขาย
                                                        </h5>
                                                        <hr />
                                                        <form action="" className="py-2">
                                                            <div className="flex">
                                                                <input id="1" type="checkbox" name="tag" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
                                                                <label className="flex text-adopdark dark:text-adoplight text-base"> จำนวนจำกัด</label>
                                                            </div>
                                                            <div className="flex">
                                                                <input id="2" type="checkbox" name="tag" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
                                                                <label className="flex text-adopdark dark:text-adoplight text-base"> จำนวนไม่จำกัด</label>
                                                            </div>
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
                                                        <button type="submit" className="w-full inline-block align-middle p-3 bg-adoppix shadow-lg rounded-md">
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
                                <div className="mt-[120px] col-span-9 h-fit w-full">
                                    <div className="mb-4 flex">
                                        <div className="w-fit p-[10px] bg-adoppix rounded-md mr-4">
                                            <div className="text-sm">
                                                จำนวนสินค้าทั้งหมด
                                            </div>
                                            <div className="text-4xl text-center">
                                                {productCount}
                                            </div>
                                        </div>
                                        <div className="w-fit p-[10px] bg-adoppix rounded-md mr-4">
                                            <div className="text-sm">
                                                กำลังขาย
                                            </div>
                                            <div className="text-4xl text-center">
                                                {onSaleCount}
                                            </div>
                                        </div>
                                        <div className="w-fit p-[10px] bg-adoppix rounded-md mr-4">
                                            <div className="text-xl inline-block w-10 font-bold">
                                                ยอดขาย
                                            </div>
                                            <div className="text-4xl text-right inline-block ml-2">
                                                {total} Ac
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dark:bg-adopsoftdark shadow-md p-10 rounded-lg">
                                        <div onContextMenu={handleContextMenu} className="grid grid-cols-4 gap-4">
                                            {
                                                productItems && productItems.map((productItem, index) => (
                                                    <MarketMyShopFeedCard key={index} data={productItem} />
                                                ))
                                            }
                                        </div>
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