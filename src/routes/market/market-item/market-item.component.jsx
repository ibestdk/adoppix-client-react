import Skeleton from '@mui/material/Skeleton';
import { IoMdMore } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import ReactWaterMark from 'react-watermark-component';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../../services/authorize";
import { useNavigate } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import ConfirmModal from "../../../components/market/market-modal/confirm-modal"
import SuccesefullBuy from "../../../components/market/market-modal/succesefull-buy"
import LoginFirst from '../../../components/market/market-modal/login-first-modal';

export const MarketItem = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const handleOnClose = () => setModal(false);
    const [price, setPrice] = useState();
    const [succese, setSuccese] = useState(false);

    const [wishlistState, setWishlistState] = useState(false);
    const wishlistClicked = () => {
        if (!wishlistState && cartState) {
            setCartState(false);
        }
        setWishlistState(!wishlistState);
        wishList();
    }

    const [cartState, setCartState] = useState(false);
    const addCartClicked = () => {
        if (!cartState && wishlistState) {
            setWishlistState(false);
        }
        setCartState(!cartState);
        cart();
    }

    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );

    const beginAlarm = function () { console.log('start alarm'); };
    const options = {
        chunkWidth: 200,
        chunkHeight: 60,
        textAlign: 'left',
        textBaseline: 'bottom',
        globalAlpha: 1,
        font: '14px Microsoft Yahei',
        rotateAngle: -0.26,
        fillStyle: '#1f1f1f'
    }

    const [productDatas, setProductData] = useState();
    const [ownerDatas, setOwnerData] = useState();

    const [menuState, setMenuState] = useState(false);
    const menuClicked = () => {
        setMenuState(!menuState);
    }

    const ownerData = (username) => {
        axios
            .get(`https://api.adoppix.com/api/User/${username}/user-info`)
            .then((res) => {
                console.log("Owner data : ", res.data.data);
                setOwnerData(res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const waterMark = `${productDatas && productDatas.ownerUsername}`;
    const getProduct = () => {
        axios
            .get(`https://api.adoppix.com/api/Product/${productId}`)
            .then((res) => {
                console.log("Success:", res.data.data);
                setProductData(res.data.data);
                setPrice(res.data.data.price);
                console.log("owner " + res.data.data.ownerUsername);
                ownerData(res.data.data.ownerUsername);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const deleteProduct = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios.delete(`https://api.adoppix.com/api/Product/${productId}`, { headers })
            .then(() => navigate(`../`))
            .catch((err) => console.log(err.response));
        console.log("productId : " + productId)
    };

    const wishList = async () => {
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

    const buy = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'post',
            url: `https://api.adoppix.com/api/Product/${productId}/buy`,
            headers: headers
        })
            .then(async (res) => {
                setModal(false)
                setSuccese(true);
                await delay(3000);
                navigate(`../`);
            })
            .catch((err) => console.log(err));
        // axios.patch(`https://api.adoppix.com/api/Product/${productId}/wishlist`)
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err.response));
    };

    const cart = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios({
            method: 'post',
            url: `https://api.adoppix.com/api/Product/${productId}/toggle-cart`,
            headers: headers
        })
            .then((res) => console.log("cart : " + res.data.data))
            .catch((err) => console.log(err));
    };

    var BreakException = {};
    const searchIsCarted = function (data, index) {
        if (data.productId == productId) {
            setCartState(true);
            throw BreakException;
        }
        else if (data.productId != productId) {
            setCartState(false);
        }
    }

    const searchIsWishListed = function (data, index) {
        if (data.productId == productId) {
            setWishlistState(true);
            throw BreakException;
        }
        else if (data.productId != productId) {
            setWishlistState(false);
        }
    };

    const checkIsCarted = () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .get(`https://api.adoppix.com/api/User/cart`, { headers })
            .then((res) => {

                console.log("cart :", res.data.data);
                res.data.data.items.forEach(searchIsCarted);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const checkIsWishListed = () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        axios
            .get(`https://api.adoppix.com/api/User/wishlist`, { headers })
            .then((res) => {

                console.log("wishlist :", res.data.data);
                res.data.data.forEach(searchIsWishListed);
                console.log("wishlist State : " + wishlistState)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const [loginWarning, setLoginWarning] = useState(false);
    const handleOnCloseModal2 = () => setLoginWarning(false);
    const [isLogin, setIsLogin] = useState(false);
    const userOrGuest = async () => {
        const token = getToken();
        if (token === false || token === undefined) {
            setIsLogin(false);
            getProduct();
        }
        else {
            setIsLogin(true);
            getProduct();
            checkIsWishListed();
            checkIsCarted();
        }
    }

    useEffect(() => {
        userOrGuest();
    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            {productDatas && isLogin == true && (
                <div className="relative">
                    <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">

                        {/* Normal Image */}
                        {/* <div className='bg-adopsoftdark rounded-md justify-items-center'>
                        <img className="rounded-md flex-shrink-0 object-cover min-w-full max-h-[400px]" src="https://static.vecteezy.com/system/resources/previews/012/996/827/original/night-lake-landscape-cartoon-illustration-free-vector.jpg" alt="" />
                    </div> */}
                        <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
                            {productDatas && (
                                <div>

                                    <div>
                                        <ReactWaterMark
                                            waterMarkText={waterMark}
                                            openSecurityDefense
                                            securityAlarm={beginAlarm}
                                            options={options}
                                        >
                                            <div className="relative">
                                                <div>
                                                    <img draggable={false} className="h-[500px] object-cover w-full m-auto inline-flex rounded-lg shadow-lg blur-sm brightness-75" src={`https://pix.adoppix.com/public/${productDatas.images[0]}`} alt="" />
                                                </div>
                                                <div className="absolute top-0 m-auto left-0 right-0 ">
                                                    <p className="text-center">
                                                        <img draggable={false} className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg" src={`https://pix.adoppix.com/public/${productDatas.images[0]}`} onDragStart={(event) => event.preventDefault()} alt="" />
                                                    </p>
                                                </div>
                                            </div>
                                        </ReactWaterMark>
                                    </div>
                                    {(productDatas && productDatas.images.length > 1) && (
                                        <div className="my-4">
                                            <div className="min-w-[240px] max-h-fit h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                                                <div className="grid grid-cols-3 gap-4 my-3">
                                                    {productDatas.images.map((image, index) => (
                                                        <div key={index} className="image-item w-full rounded-md m-0">
                                                            <img className="h-[240px] w-[240px] rounded-md object-cover overflow-hidden" src={`https://pix.adoppix.com/public/${image}`} alt="" width="100" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {productDatas && (
                                <div>
                                    <div className='mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md'>
                                        <div className='text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark'>
                                            {productDatas.title}
                                        </div>
                                        {productDatas.isOwner && (
                                            <div className='relative'>
                                                {!menuState && (
                                                    <IoMdMore onClick={menuClicked} className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark hover:scale-105 hover:bg-adoplighticon duration-300 rounded-full h-10 w-10' ></IoMdMore>
                                                )}
                                                {menuState && (
                                                    <IoMdMore onClick={menuClicked} className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark bg-adoplighticon rounded-l-md h-10 w-10' ></IoMdMore>
                                                )}
                                                {menuState && (
                                                    <div className='bg-adoplighticon p-1 rounded-md left-16 absolute'>
                                                        <div onClick={deleteProduct} className='text-adoplight text-base text-left p-1 rounded-md hover:bg-red-500 duration-300 cursor-pointer'>
                                                            Delete
                                                        </div>
                                                        <div className='text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer'>
                                                            Edit
                                                        </div>
                                                        {/* report โผล่มาในกรณีที่ไม่ใช่ creater เท่านั้น */}
                                                        <div className='text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer'>
                                                            Report
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-full max-w-4xl rounded-md grid grid-cols-4 gap-4'>
                                        <div className='col-span-3'>
                                            <div className='dark:text-adoplight text-adopsoftdark leading-6 text-sm'>
                                                {productDatas.description}
                                            </div>
                                            <div className='mt-3'>
                                                {productDatas.tags.map((data, dataIndex) => (
                                                    <div key={dataIndex} className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mr-2 text-lg">
                                                        {`#` + data}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='my-5 cursor-default'>
                                                <div className='text-xl my-3 dark:text-adoplight text-adopsoftdark'>
                                                    <b>
                                                        ศิลปิน
                                                    </b>
                                                </div>
                                                <div className='pl-3'>
                                                    {productDatas.ownerProfileImage != null && (
                                                        <img className='rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10' src={`https://pix.adoppix.com/public/${productDatas.ownerProfileImage}`} alt="" draggable="false" />
                                                    )}
                                                    {productDatas.ownerProfileImage == null && (
                                                        <img className='rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10' src={`https://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg`} alt="" draggable="false" />
                                                    )}
                                                    <div onClick={() => { navigate(`../../${productDatas.ownerUsername}`) }} className='inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark cursor-pointer hover:opacity-75'>
                                                        <b className=''>
                                                            {productDatas.ownerUsername}
                                                        </b>
                                                    </div>
                                                    <div className='inline-block bg-adoppix text-adoplight hover:bg-blue-500 duration-300 rounded-2xl py-1 px-3 text-xs ml-4 cursor-pointer'>
                                                        <b>
                                                            Follow
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pl-6 cursor-default'>
                                            <div className='flex'>
                                                <b className='mr-10 inline-block text-xl dark:text-adoplight text-adopsoftdark'>
                                                    ราคา
                                                </b>
                                                <b className='inline-block text-4xl text-right text-adoppix w-full'>
                                                    {productDatas.price}
                                                </b>
                                            </div>
                                            <div className='grid grid-cols-2 mt-1'>
                                                <div className='pr-2'>
                                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                                        ประเภทสินค้า
                                                    </b>
                                                    {productDatas.typeId == 1 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            รูปภาพ
                                                        </p>
                                                    )}
                                                    {productDatas.typeId == 2 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            สติ้กเกอร์
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='pr-2'>
                                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                                        จำนวนที่เหลือ
                                                    </b>
                                                    {productDatas.amount == null && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            ไม่จำกัด
                                                        </p>
                                                    )}
                                                    {productDatas.amount > 0 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            {productDatas.amount + ' ชิ้น'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                {productDatas.canCommercial && (
                                                    <p className='text-xs text-green-400 text-end'>
                                                        สามารถใช้ในเชิงพาณิชย์ได้
                                                    </p>
                                                )}
                                                {!productDatas.canCommercial && (
                                                    <p className='text-xs text-red-400 text-end'>
                                                        ไม่สามารถใช้ในเชิงพาณิชย์ได้
                                                    </p>
                                                )}
                                            </div>
                                            {!productDatas.isBought && (
                                                <div className='grid grid-cols-6 mt-2 gap-2'>
                                                    <div onClick={() => setModal(true)} className='relative col-span-5 row-span-2 bg-adoppix rounded-md text-adoplight text-center py-1 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300'>
                                                        <b className='absolute top-[30%] left-[40%]'>
                                                            ซื้อ
                                                        </b>
                                                    </div>
                                                    <div className=' cursor-pointer'>
                                                        {wishlistState == false && (
                                                            <AiOutlineStar onClick={wishlistClicked} className='h-8 w-8 p-1 border dark:border-white border-adoppix rounded-md hover:border-adoppix text-yellow-300 hover:scale-105 duration-300' />
                                                        )}
                                                        {wishlistState == true && (
                                                            <AiFillStar onClick={wishlistClicked} className='h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-yellow-300 hover:scale-105 duration-300' />
                                                        )}
                                                    </div>
                                                    <div className='cursor-pointer'>
                                                        {cartState == false && (
                                                            <BsCartPlus onClick={addCartClicked} className='h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-yellow-300 hover:scale-105 duration-300' />
                                                        )}
                                                        {cartState == true && (
                                                            <BsCartCheck onClick={addCartClicked} className='h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-green-400 hover:scale-105 duration-300' />
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            {productDatas.isBought && (
                                                <div className='grid grid-cols-6 mt-2 gap-2'>
                                                    <div className='relative col-span-5 row-span-2 bg-adoplighticon rounded-md text-adopsoftdark text-center py-1'>
                                                        <b className='absolute top-[30%] left-[27%]'>
                                                            ซื้อแล้ว
                                                        </b>
                                                    </div>
                                                    <div className=''>
                                                        <AiOutlineStar className='h-8 w-8 p-1 border dark:border-white border-adoplighticon rounded-md text-adoplighticon dark:text-adoplight' />
                                                    </div>
                                                    <div className=''>
                                                        <BsCartPlus className='h-8 w-8 p-1 border dark:border-white border-adoplighticon rounded-md text-adoplighticon dark:text-adoplight' />
                                                    </div>
                                                </div>
                                            )}
                                            {/* <button type="button" className="bg-indigo-500 ..." disabled>
                                            <svg className="w-full">
                                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                    <animateTransform
                                                        attributeName="transform"
                                                        attributeType="XML"
                                                        type="rotate"
                                                        dur="1s"
                                                        from="0 50 50"
                                                        to="360 50 50"
                                                        repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </button> */}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            )}
            {productDatas && isLogin == false && (
                <div className="relative">
                    <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">
                        <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
                            {productDatas && (
                                <div>
                                    <div>
                                        <ReactWaterMark
                                            waterMarkText={waterMark}
                                            openSecurityDefense
                                            securityAlarm={beginAlarm}
                                            options={options}
                                        >
                                            <div className="relative">
                                                <div>
                                                    <img draggable={false} className="h-[500px] object-cover w-full m-auto inline-flex rounded-lg shadow-lg blur-sm brightness-75" src={`https://pix.adoppix.com/public/${productDatas.images[0]}`} alt="" />
                                                </div>
                                                <div className="absolute top-0 m-auto left-0 right-0 ">
                                                    <p className="text-center">
                                                        <img draggable={false} className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg" src={`https://pix.adoppix.com/public/${productDatas.images[0]}`} onDragStart={(event) => event.preventDefault()} alt="" />
                                                    </p>
                                                </div>
                                            </div>
                                        </ReactWaterMark>
                                    </div>
                                    {(productDatas && productDatas.images.length > 1) && (
                                        <div className="my-4">
                                            <div className="min-w-[240px] max-h-fit h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                                                <div className="grid grid-cols-3 gap-4 my-3">
                                                    {productDatas.images.map((image, index) => (
                                                        <div key={index} className="image-item w-full rounded-md m-0">
                                                            <img className="h-[240px] w-[240px] rounded-md object-cover overflow-hidden" src={`https://pix.adoppix.com/public/${image}`} alt="" width="100" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {productDatas && (
                                <div>
                                    <div className='mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md'>
                                        <div className='text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark'>
                                            {productDatas.title}
                                        </div>
                                        {productDatas.isOwner && (
                                            <div className='relative'>
                                                {!menuState && (
                                                    <IoMdMore onClick={menuClicked} className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark hover:scale-105 hover:bg-adoplighticon duration-300 rounded-full h-10 w-10' ></IoMdMore>
                                                )}
                                                {menuState && (
                                                    <IoMdMore onClick={menuClicked} className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark bg-adoplighticon rounded-l-md h-10 w-10' ></IoMdMore>
                                                )}
                                                {menuState && (
                                                    <div className='bg-adoplighticon p-1 rounded-md left-16 absolute'>
                                                        <div onClick={deleteProduct} className='text-adoplight text-base text-left p-1 rounded-md hover:bg-red-500 duration-300 cursor-pointer'>
                                                            Delete
                                                        </div>
                                                        <div className='text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer'>
                                                            Edit
                                                        </div>
                                                        {/* report โผล่มาในกรณีที่ไม่ใช่ creater เท่านั้น */}
                                                        <div className='text-adoplight text-base text-left p-1 rounded-md hover:bg-yellow-300 duration-300 cursor-pointer'>
                                                            Report
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className='w-full max-w-4xl rounded-md grid grid-cols-4 gap-4'>
                                        <div className='col-span-3'>
                                            <div className='dark:text-adoplight text-adopsoftdark leading-6 text-sm'>
                                                {productDatas.description}
                                            </div>
                                            <div className='mt-3'>
                                                {productDatas.tags.map((data, dataIndex) => (
                                                    <div key={dataIndex} className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mr-2 text-lg">
                                                        {`#` + data}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className='my-5 cursor-default'>
                                                <div className='text-xl my-3 dark:text-adoplight text-adopsoftdark'>
                                                    <b>
                                                        ศิลปิน
                                                    </b>
                                                </div>
                                                <div className='pl-3'>
                                                    {productDatas.ownerProfileImage != null && (
                                                        <img className='rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10' src={`https://pix.adoppix.com/public/${productDatas.ownerProfileImage}`} alt="" draggable="false" />
                                                    )}
                                                    {productDatas.ownerProfileImage == null && (
                                                        <img className='rounded-full outline outline-2 outline-offset-2 outline-adoppix dark:outline-adoplight inline-block h-10 w-10' src={`https://inspireddentalcare.co.uk/wp-content/uploads/2016/05/Facebook-default-no-profile-pic.jpg`} alt="" draggable="false" />
                                                    )}
                                                    <div onClick={() => { navigate(`../../${productDatas.ownerUsername}`) }} className='inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark cursor-pointer hover:opacity-75'>
                                                        <b className=''>
                                                            {productDatas.ownerUsername}
                                                        </b>
                                                    </div>
                                                    <div className='inline-block bg-adoppix text-adoplight hover:bg-blue-500 duration-300 rounded-2xl py-1 px-3 text-xs ml-4 cursor-pointer'>
                                                        <b>
                                                            Follow
                                                        </b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pl-6 cursor-default'>
                                            <div className='flex'>
                                                <b className='mr-10 inline-block text-xl dark:text-adoplight text-adopsoftdark'>
                                                    ราคา
                                                </b>
                                                <b className='inline-block text-4xl text-right text-adoppix w-full'>
                                                    {productDatas.price}
                                                </b>
                                            </div>
                                            <div className='grid grid-cols-2 mt-1'>
                                                <div className='pr-2'>
                                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                                        ประเภทสินค้า
                                                    </b>
                                                    {productDatas.typeId == 1 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            รูปภาพ
                                                        </p>
                                                    )}
                                                    {productDatas.typeId == 2 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            สติ้กเกอร์
                                                        </p>
                                                    )}
                                                </div>
                                                <div className='pr-2'>
                                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                                        จำนวนที่เหลือ
                                                    </b>
                                                    {productDatas.amount == null && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            ไม่จำกัด
                                                        </p>
                                                    )}
                                                    {productDatas.amount > 0 && (
                                                        <p className='text-xs text-end text-adoppix'>
                                                            {productDatas.amount + ' ชิ้น'}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='mt-2'>
                                                {productDatas.canCommercial && (
                                                    <p className='text-xs text-green-400 text-end'>
                                                        สามารถใช้ในเชิงพาณิชย์ได้
                                                    </p>
                                                )}
                                                {!productDatas.canCommercial && (
                                                    <p className='text-xs text-red-400 text-end'>
                                                        ไม่สามารถใช้ในเชิงพาณิชย์ได้
                                                    </p>
                                                )}
                                            </div>
                                                <div className='grid grid-cols-6 mt-2 gap-2'>
                                                    <div onClick={() => setLoginWarning(true)} className='relative col-span-5 row-span-2 bg-adoppix rounded-md text-adoplight text-center py-1 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300'>
                                                        <b className='absolute top-[30%] left-[40%]'>
                                                            ซื้อ
                                                        </b>
                                                    </div>
                                                    <div className=' cursor-pointer'>
                                                        <AiFillStar onClick={() => setLoginWarning(true)} className='h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-yellow-300 hover:scale-105 duration-300' />
                                                    </div>
                                                    <div className='cursor-pointer'>
                                                        <BsCartCheck onClick={() => setLoginWarning(true)} className='h-8 w-8 p-1 border dark:border-white border-adoppix hover:border-adoppix rounded-md text-green-400 hover:scale-105 duration-300' />
                                                    </div>
                                                </div>
                                            {/* <button type="button" className="bg-indigo-500 ..." disabled>
                                            <svg className="w-full">
                                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                    <animateTransform
                                                        attributeName="transform"
                                                        attributeType="XML"
                                                        type="rotate"
                                                        dur="1s"
                                                        from="0 50 50"
                                                        to="360 50 50"
                                                        repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </button> */}
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <LoginFirst visible={loginWarning} onClose={handleOnCloseModal2} />
                </div>
            )}
            {!productDatas && (
                <div className="relative">
                    <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">

                        {/* Normal Image */}
                        {/* <div className='bg-adopsoftdark rounded-md justify-items-center'>
                        <img className="rounded-md flex-shrink-0 object-cover min-w-full max-h-[400px]" src="https://static.vecteezy.com/system/resources/previews/012/996/827/original/night-lake-landscape-cartoon-illustration-free-vector.jpg" alt="" />
                    </div> */}
                        <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg mb-14">
                            <div>
                                <div>
                                    <div className="relative">
                                        <div className='animate-pulse h-[500px] w-full m-auto rounded-lg bg-adoplighticon dark:bg-adopdark'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className='mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md mb-2'>
                                    <div className='animate-pulse pb-5 w-3xl break-words col-span-11 dark:bg-adopdark bg-adoplighticon h-10 rounded-md'>
                                    </div>
                                </div>
                                <div className='w-full max-w-4xl rounded-md grid grid-cols-4 gap-4'>
                                    <div className='col-span-3'>
                                        <div className='animate-pulse h-5 dark:bg-adopdark bg-adoplighticon rounded-md'>

                                        </div>
                                        <div className='mt-3'>
                                            <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse">
                                            </div>
                                            <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse">
                                            </div>
                                            <div className="h-6 dark:bg-adopdark bg-adoplighticon w-20 rounded-md mr-2 inline-block animate-pulse">
                                            </div>
                                        </div>
                                        <div className='my-5 cursor-default'>
                                            <div className='animate-pulse h-6 dark:bg-adopdark bg-adoplighticon w-16 rounded-md mb-4'>
                                            </div>
                                            <div className='pl-3'>
                                                <div className='animate-pulse rounded-full h-10 w-10 dark:bg-adopdark bg-adoplighticon inline-block'></div>
                                                <div className='animate-pulse inline-block h-5 dark:bg-adopdark bg-adoplighticon w-40 rounded-md mb-4 ml-4'>
                                                </div>
                                                <div className='animate-pulse inline-block h-5 dark:bg-adopdark bg-adoplighticon w-10 rounded-md mb-4 ml-4'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='pl-6 cursor-default'>
                                        <div className='h-32 dark:bg-adopdark bg-adoplighticon w-full rounded-md mr-2 inline-block animate-pulse'>
                                        </div>
                                        <div className='grid grid-cols-6 mt-2 gap-2'>
                                            <div className='col-span-5 row-span-2 h-full w-full dark:bg-adopdark bg-adoplighticon rounded-md mr-2 inline-block animate-pulse'>
                                            </div>
                                            <div className='animate-pulse rounded-md h-8 w-8 dark:bg-adopdark bg-adoplighticon'>
                                            </div>
                                            <div className='animate-pulse rounded-md h-8 w-8 dark:bg-adopdark bg-adoplighticon'>
                                            </div>
                                        </div>
                                        {/* <button type="button" className="bg-indigo-500 ..." disabled>
                                            <svg className="w-full">
                                                <path fill="#fff" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
                                                    <animateTransform
                                                        attributeName="transform"
                                                        attributeType="XML"
                                                        type="rotate"
                                                        dur="1s"
                                                        from="0 50 50"
                                                        to="360 50 50"
                                                        repeatCount="indefinite" />
                                                </path>
                                            </svg>
                                        </button> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
            <SuccesefullBuy visible={succese} />
            <ConfirmModal onClose={handleOnClose} visible={modal} price={price} method={buy} />
        </div>
    )
}