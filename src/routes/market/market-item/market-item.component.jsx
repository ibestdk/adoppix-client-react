import Skeleton from '@mui/material/Skeleton';
import { IoMdMore } from "react-icons/io";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import ReactWaterMark from 'react-watermark-component';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export const MarketItem = () => {
    const { productId } = useParams();

    const stickerData = [
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "nah man",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        },
        {
            stickerName: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. In pariatur expedita facere et obcaecati, quos velit unde a tempora suscipit consequatur ipsa, repellat, officia magnam natus magni dignissimos error similique.",
            img: "https://cdn.wallpapersafari.com/9/22/Px81sC.jpg"
        }
    ]

    const [wishlistState, setWishlistState] = useState(false);
    const wishlistClicked = () => {
        setWishlistState(!wishlistState);
        console.log(wishlistState);
    }

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
    const [userData, setUserData] = useState();

    const ownerData = (username) => {
        axios
            .get(`https://api.adoppix.com/api/User/${username}/user-info`)
            .then((res) => {
                console.log("Success:", res.data.data);
                setUserData(res.data.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const waterMark = `${productDatas && productDatas.owner}`;
    const getProduct = () => {
        axios
            .get(`https://api.adoppix.com/api/Product/${productId}`)
            .then((res) => {
                console.log("Success:", res.data.data);
                setProductData(res.data.data);
                ownerData(res.data.data.owner)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        console.log("" + productId);
        getProduct();
    }, []);

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            <div className="relative">
                <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">

                    {/* Normal Image */}
                    {/* <div className='bg-adopsoftdark rounded-md justify-items-center'>
                        <img className="rounded-md flex-shrink-0 object-cover min-w-full max-h-[400px]" src="https://static.vecteezy.com/system/resources/previews/012/996/827/original/night-lake-landscape-cartoon-illustration-free-vector.jpg" alt="" />
                    </div> */}
                    <div className="p-5 bg-adopsoftdark rounded-lg">
                        {productDatas && (
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
                        )}
                    </div>

                    {/* Sticker */}
                    {/* <div className='bg-adopsoftdark min-w-fit rounded-md justify-items-center grid grid-cols-4 gap-4'>
                        {stickerData.map((data,dataIndex) => (
                            <div key={dataIndex}>
                                <div className='rounded-md flex justify-center pt-4 pl-4 pr-4 h-60 w-72'>
                                    <img className="rounded-md flex-shrink-0 min-w-full min-h-full object-cover" src={data.img} alt="" />
                                </div>
                                <div className='text-center'>
                                    <p className='inline-block truncate w-52'>
                                        {data.stickerName}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div> */}
                    {productDatas && (
                        <div>
                            <div className=' grid grid-cols-12 w-full max-w-4xl rounded-md'>
                                <div className='text-3xl pb-5 w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark'>
                                    {productDatas.title}
                                </div>
                                <div className='relative'>
                                    <IoMdMore className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark hover:scale-105 hover:bg-adoplighticon duration-300 rounded-full h-10 w-10' ></IoMdMore>
                                </div>
                            </div>
                            <div className='w-full max-w-4xl rounded-md grid grid-cols-4 gap-4'>
                                <div className='col-span-3'>
                                    <div className='leading-6 text-sm'>
                                        {productDatas.description}
                                    </div>
                                    <div className='mt-3'>
                                        {productDatas && productDatas.tags.map((data, dataIndex) => (
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
                                            <img className='rounded-full outline outline-2 outline-offset-2 outline-adoplight inline-block h-10 w-10' src="https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/e67f0b11-854a-4e46-b6fb-5bfa78c3a89bfile_2822005.webp" alt="" draggable="false" />
                                            <div className='inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark'>
                                                <b className=''>
                                                    {productDatas.owner}
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
                                        <div className='col-span-5 bg-adoppix rounded-md text-adoplight text-center py-1 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300'>
                                            <b>
                                                ซื้อ
                                            </b>
                                        </div>
                                        <div className=' cursor-pointer'>
                                            {wishlistState == false && (
                                                <AiOutlineStar onClick={wishlistClicked} className='h-8 w-8 p-1 border border-white rounded-md hover:border-adoppix text-yellow-300 hover:scale-105 duration-300' />
                                            )}
                                            {wishlistState == true && (
                                                <AiFillStar onClick={wishlistClicked} className='h-8 w-8 p-1 border border-white hover:border-adoppix rounded-md text-yellow-300 hover:scale-105 duration-300' />
                                            )}
                                        </div>
                                    </div>
                                        <button type="button" class="bg-indigo-500 ..." disabled>
                                            <svg class="w-full">
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
                                        </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}