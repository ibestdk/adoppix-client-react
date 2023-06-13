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
import ConfirmActionModal from '../../../components/market/market-modal/confirm-action-modal';

export const MarketMyShopItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const handleOnClose = () => setModal(false);
    const handleOnClose1 = () => setModal1(false);
    const [action, setAction] = useState();

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
                //console.log("Owner data : ", res.data.data);
                setOwnerData(res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const deleteClicked = () => {
        setAction("ลบสินค้า")
        setModal(true);
    }

    const activeProductClicked = () => {
        setAction("เปลี่ยนสถานะการขาย")
        setModal1(true);
    }

    const activeProductChange = async () => {
        const token = getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
        };

        // API Caller
        axios.put(`https://api.adoppix.com/api/User/${productDatas.id}/product-disable`, { headers })
            .then(() => setProductActive(!productActive))
            .catch((err) => console.log(err.response));
    };

    const [productActive, setProductActive] = useState(false);
    const handleProductActiveChange = () => {
        setProductActive(productActive);
    };

    const [created, setCreated] = useState();
    const [lastSold, setLastSold] = useState();
    const getProduct = () => {
        axios
            .get(`https://api.adoppix.com/api/User/${id}/product-owner`)
            .then((res) => {
                //console.log("Success:", res.data.data);
                setProductData(res.data.data);
                const createdDate = new Date(res.data.data.created);
                setCreated(createdDate.toLocaleDateString("en-GB"))

                const lastSoldDate = new Date(res.data.data.lastSale);
                setLastSold(lastSoldDate.toLocaleDateString("en-GB"))
                // setPrice(res.data.data.price);
                // //console.log("owner " + res.data.data.ownerUsername);
                // ownerData(res.data.data.ownerUsername);
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
        axios.delete(`https://api.adoppix.com/api/Product/${productDatas.id}`, { headers })
            .then(() => navigate(`../`))
            .catch((err) => console.log(err.response));
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
        }
    }

    useEffect(() => {
        userOrGuest();
    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            {productDatas && isLogin == true && (
                <div className="relative">
                    <div className="container m-auto grid grid-cols-1 gap-4 place-items-center w-8/12">
                        <div className="mb-14">
                            <div className='grid grid-cols-5 gap-5'>
                                <div className='col-span-3'>
                                    <div className='shadow-md rounded-lg mb-4'>
                                        {(productDatas && productDatas.imageNames.length == 1) && (
                                            <div className="p-5 dark:bg-adopsoftdark shadow-md rounded-lg">
                                                <div className='relative'>
                                                    <div>
                                                        <img draggable={false} className="h-[500px] object-cover w-full m-auto inline-flex rounded-lg shadow-lg blur-sm brightness-75" src={`https://pix.adoppix.com/public/${productDatas.imageNames[0]}`} alt="" />
                                                    </div>
                                                    <div className="absolute top-0 m-auto left-0 right-0 ">
                                                        <p className="text-center">
                                                            <img draggable={false} className="h-[500px] m-atuo inline-flex rounded-lg shadow-lg" src={`https://pix.adoppix.com/public/${productDatas.imageNames[0]}`} onDragStart={(event) => event.preventDefault()} alt="" />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {(productDatas && productDatas.imageNames.length > 1) && (
                                            <div className="my-4">
                                                <div className="min-w-[240px] max-h-fit h-fit object-cover w-full m-auto inline-flex rounded-lg justify-center border border-solid border-adoplighticon">
                                                    <div className="grid grid-cols-3 gap-4 m-3 h-[500px] overflow-y-scroll">
                                                        {productDatas.imageNames.map((image, index) => (
                                                            <div key={index} className="image-item w-full rounded-md m-0">
                                                                <img className="h-[240px] w-[240px] rounded-md object-cover overflow-hidden" src={`https://pix.adoppix.com/public/${image}`} alt="" width="100" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className=' p-5 dark:bg-adopsoftdark shadow-md rounded-lg'>
                                        <div className='mt-4 grid grid-cols-12 w-full max-w-4xl rounded-md'>
                                            <div className='text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark'>
                                                {productDatas.title}
                                            </div>
                                        </div>
                                        <div className='w-full max-w-4xl rounded-md'>
                                            <div className=''>
                                                <div className='dark:text-adoplight text-adopsoftdark leading-6 text-sm'>
                                                    {productDatas.description}
                                                </div>
                                                <div className='mt-3'>
                                                    <div className='mb-2'>
                                                        แท็ค
                                                    </div>
                                                    {productDatas.tags.map((data, dataIndex) => (
                                                        <div key={dataIndex} className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mx-2 text-lg">
                                                            {`#` + data}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-2'>
                                    <div className='grid grid-cols-2 gap-5 mb-5'>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                ราคาต่อชิ้น
                                            </div>
                                            <div className='text-center text-adoppix text-3xl font-bold'>
                                                {productDatas.price}
                                            </div>
                                        </div>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                ยอกขายทั้งหมด
                                            </div>
                                            <div className='text-center text-adoppix text-3xl font-bold'>
                                                {productDatas.amountSold * productDatas.price}
                                            </div>
                                        </div>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                จำนวนที่ขายไปแล้ว
                                            </div>
                                            <div className='text-center text-adoppix text-3xl font-bold'>
                                                {productDatas.amountSold}
                                            </div>
                                        </div>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                จำนวนคงเหลือ
                                            </div>
                                            {productDatas.amount != null && (
                                                <div className='text-center text-adoppix text-3xl font-bold'>
                                                    {productDatas.amount} ชิ้น
                                                </div>
                                            )}
                                            {productDatas.amount == null && (
                                                <div className='text-center text-adoppix text-3xl font-bold'>
                                                    ไม่จำกัด
                                                </div>
                                            )}
                                        </div>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                โพสขายเมื่อ
                                            </div>
                                            <div className='text-center text-adoppix text-3xl font-bold'>
                                                {created}
                                            </div>
                                        </div>
                                        <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-5'>
                                            <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                                คำสั่งซื้อล่าสุด
                                            </div>
                                            <div className='text-center text-adoppix text-3xl font-bold'>
                                                {lastSold}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='dark:bg-adopsoftdark rounded-md shadow-md w-full h-fit pb-6'>
                                        <div className='text-start text-xl py-4 px-6 text-adopdark dark:text-adoplight'>
                                            สถานะของสินค้า
                                        </div>
                                        <div className='text-center text-3xl font-bold'>
                                            {productDatas.isActive == true && (
                                                <div className='text-adoppix'>
                                                    กำลังวางขายอยู่
                                                </div>
                                            )}
                                            {productDatas.isActive == false && (
                                                <div className='text-red-500'>
                                                    ถูกปิดการขายไว้
                                                </div>
                                            )}
                                        </div>
                                        {productDatas.isActive == true && (
                                            <div onClick={activeProductClicked} className='bg-adoppix text-adoplight rounded-md shadow-md py-4 px-6 h-fit w-fit cursor-pointer hover:opacity-75 mx-auto mt-5'>
                                                ปิดการขาย
                                            </div>
                                        )}
                                        {productDatas.isActive == false && (
                                            <div onClick={activeProductClicked} className='bg-adoplighticon text-adoplight rounded-md shadow-md py-4 px-6 h-fit w-fit cursor-pointer hover:opacity-75 mx-auto mt-5'>
                                                เปิดการขาย
                                            </div>
                                        )}
                                        {productDatas.amountSold > 0 && (
                                            <div>
                                                <div className='bg-adoplighticon text-adoplight rounded-md shadow-md py-4 px-6 h-fit w-fit cursor-not-allowed hover:opacity-75 mx-auto mt-5'>
                                                    ลบสินค้า
                                                </div>
                                                <div className='text-xs text-red-500 text-center pt-5'>
                                                    ไม่สามารถลบสินค้าได้ เนื่องจากได้ทำการขายไปแล้ว
                                                </div>
                                            </div>
                                        )}
                                        {productDatas.amountSold == 0 && (
                                            <div>
                                                <div onClick={deleteClicked} className='bg-red-500 text-adoplight rounded-md shadow-md py-4 px-6 h-fit w-fit cursor-pointer hover:opacity-75 mx-auto mt-5'>
                                                    ลบสินค้า
                                                </div>
                                                <div className='text-xs text-yellow-300 text-center pt-5'>
                                                    จะไม่สามารถลบสินค้าได้ หากได้ทำการขายไปแล้ว
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConfirmActionModal onClose={handleOnClose1} visible={modal1} action={action} method={activeProductChange} />
                    <ConfirmActionModal onClose={handleOnClose} visible={modal} action={action} method={deleteProduct} />
                </div>
            )}
            {isLogin == false && (
                <div className="w-full dark:bg-adopdark bg-adoplight min-h-screen content-center grid">
                    <h2 className="dark:text-adoplight text-adopdark text-3xl p-2 text-center">
                        โปรดลงชื่อเข้าใช้ก่อนทำรายการ
                        <div onClick={() => navigate('../../login')} className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto">
                            ไปลงชื่อเข้าใช้งาน?
                        </div>
                        <div onClick={() => navigate('../../signup')} className="text-adoppix text-xl mt-2 hover:opacity-75 cursor-pointer w-fit text-center m-auto">
                            ไปลงทะเบียนเข้าใช้งาน?
                        </div>
                    </h2>
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
        </div>
    )
}