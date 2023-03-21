import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
// import Heart from "react-heart"
import { FaStar } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa'
import { getToken } from "../../../services/authorize"
import { GoVerified } from "react-icons/go";
import { TbBusinessplan } from "react-icons/tb";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import MarketOwl from "./market-owl.component";
import { useNavigate } from "react-router-dom";


function valuetext(value) {
    return `${value}°C`;
}

export const MarketFeed = () => {
    const navigate = useNavigate();

    const [value, setValue] = useState([30, 10000]);
    // [30, 10000]
    
    const [tagOwlCol,setTagOwlCol] = useState();
    const Test = () => {
        console.log("TagOwlCol : "+ tagOwlCol);
    }

    const [tags, setTags] = useState();
    const tagClicked = (tag,index) => {
        if(tags == tag){
            $(`#${index}`).prop('checked', false);
            setTags(null);
        } else{
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

    // wishlist ฟังชั่นที่ยังไม่รู้ว่าใช้เปลี่ยนข้อมูลจาก api isWishList ยังไง
    // const [wishlistState, setWishlistState] = useState(false);
    const wishlistClicked = (index, state, productId) => {
        productItems[index].isWishlist = !state;
        wishList(productId);
        //setWishlistState(!state);
    }

    const wishList = async (productId) => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'patch',
            url: `https://api.adoppix.com/api/Product/${productId}/wishlist`,
            headers: headers
        })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err.response));
    };

    function handleContextMenu(event) {
        event.preventDefault();
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
                                                                <input onClick={() => { tagClicked(tag.name,index) }} id={index} type="radio" name="tag" className="shadow-md m-1  inline-block rounded-md outline-[none_!important] border-[rgb(212,212,212)_!important]" />
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
                            <div className="dark:bg-adopsoftdark shadow-md p-10 mt-[100px] col-span-9 h-fit w-full rounded-lg">
                                {productItems && productItems.length > 0 && (
                                    <div onClick={Test} className="dark:text-adoplight text-adopdark">
                                        ผลลัพธ์การค้นหา {productItems && productItems.length} รายการ
                                    </div>
                                )}
                                {productItems <= 0 && (
                                    <div className="dark:text-adoplight text-adopdark">
                                        ไม่พบผลลัพธ์การค้นหา
                                    </div>
                                )}
                                <hr className="mt-5 mb-6 text-adopdark dark:text-adoplight" />
                                <div className="mb-4">
                                    <MarketOwl setTagOwlCol={setTagOwlCol} />
                                </div>
                                <div onContextMenu={handleContextMenu} className="grid grid-cols-5 gap-4">
                                    {
                                        productItems && productItems.map((productItem, index) => (
                                            <div key={index} className="">
                                                <div className="relative overflow-hidden">
                                                    <NavLink className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear" to={`${productItem.productId}`}>
                                                        <img onContextMenu={handleContextMenu} className="h-[280px] rounded-lg w-[240px] object-cover overflow-hidden m-0" src={`https://pix.adoppix.com/public/${productItem.image}`} />
                                                    </NavLink>
                                                    <div className="absolute top-2 right-2">
                                                        <div>
                                                            {productItem.isWishlist && (
                                                                <FaStar onClick={() => wishlistClicked(index, productItem.isWishlist, productItem.productId)} className="mb-[8px] text-yellow-300" />
                                                            )}
                                                            {!productItem.isWishlist && (
                                                                <FaRegStar onClick={() => wishlistClicked(index, productItem.isWishlist, productItem.productId)} className="mb-[8px] text-yellow-300" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            {productItem.canCommercial == true && (
                                                                <TbBusinessplan className="bg-adoppix rounded-full p-[3px] h-6 w-6 text-adoplight" />
                                                            )}
                                                            {productItem.canCommercial == false && (
                                                                <TbBusinessplan className="bg-red-500 rounded-full p-[3px] h-6 w-6 text-adoplight" />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="absolute bottom-0 h-16 hover:h-36 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                                                        <div className="relative">
                                                            <div className="text-sm h-10 overflow-y-hidden w-[66%] inline-block">
                                                                {productItem.title}
                                                            </div>
                                                            <div className="absolute text-sm right-1 inline-block text-center m-auto text-adoppix">
                                                                <b>
                                                                    {productItem.price}
                                                                </b>
                                                            </div>
                                                            <div className="flex">
                                                                <div>
                                                                    <img onContextMenu={handleContextMenu} className="h-4 rounded-full w-4 object-cover mx-1" src={`https://pix.adoppix.com/public/${productItem.ownerProfileImage}`} />
                                                                </div>
                                                                <div className="text-xs font-bold my-auto truncate max-w-[70%]">
                                                                    {productItem.ownerUsername}
                                                                </div>
                                                                <div className=" top-[2px] right-[-15px] cursor-default">
                                                                    <GoVerified className="h-4 text-green-400" />
                                                                </div>
                                                            </div>
                                                            {productItem.amount > 0 && (

                                                                <div className="absolute text-xs right-1 top-5">
                                                                    เหลือ {productItem.amount} ชิ้น
                                                                </div>
                                                            )}
                                                            {productItem.amount == null && (

                                                                <div className="absolute text-xs right-1 top-5">
                                                                    ไม่จำกัดจำนวน
                                                                </div>
                                                            )}
                                                            <div className="w-[72px] absolute right-1 top-16">
                                                                <div className="mb-2 text-xs px-7 py-[1px] w-[8] bg-adoppix rounded-md cursor-pointer hover:bg-blue-500 duration-300 hover:scale-105 text-adoplight">
                                                                    <b>
                                                                        ซื้อ
                                                                    </b>
                                                                </div>
                                                                <div className="text-xs px-1 py-[1px] w-[8] bg-yellow-400 rounded-md cursor-pointer hover:bg-yellow-500 duration-300 hover:scale-105 text-adoplight">
                                                                    เพิ่มลงตะกร้า
                                                                </div>
                                                            </div>
                                                            <div className=" text-xs w-[50%] overflow-y-hidden h-[50px] mt-1 ml-1">
                                                                {productItem.description}
                                                            </div>
                                                            <div className="flex ml-1 max-w-[100%] overflow-hidden">
                                                                <div className="text-xs text-adopsoftdark py-[3px] px-2 bg-adoplighticon rounded-md cursor-default mr-1">
                                                                    {productItem.tag}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}