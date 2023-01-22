import Skeleton from '@mui/material/Skeleton';
import { IoMdMore } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";

export const MarketItem = () => {
    const tagData = [
        {
            title: "#my man"
        },
        {
            title: "#helper"
        },
        {
            title: "#ระวัง! ดุ!"
        },
        {
            title: "#กัดไม่เลือก"
        },
        {
            title: "#important"
        },
        {
            title: "#helper"
        },
        {
            title: "#ระวัง! ดุ!"
        }
    ]

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

    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen pt-14" draggable="false">
            <div className="relative">
                <div className="container m-auto grid grid-cols-1 gap-4 place-items-center">
                    
                    {/* Normal Image */}
                    <div className='bg-adopsoftdark min-w-fit rounded-md justify-items-center'>
                        <img className="rounded-md" src="https://cdn.wallpapersafari.com/9/22/Px81sC.jpg" alt="" />
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

                    <div className=' grid grid-cols-12 w-full max-w-4xl rounded-md mx-8'>
                        <div className='text-3xl w-3xl break-words text-ellipsis col-span-11 dark:text-adoplight text-adopsoftdark'>
                            Title goes here
                        </div>
                        <div className='relative'>
                            <IoMdMore className='text-3xl absolute top-0 right-2 dark:text-adoplight text-adopsoftdark hover:scale-105 hover:bg-adoplighticon duration-300 rounded-full h-10 w-10' ></IoMdMore>
                        </div>
                    </div>
                    <div className='w-full max-w-4xl rounded-md grid grid-cols-4 gap-4'>
                        <div className='col-span-3'>
                            <div className='leading-6 text-sm'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos officia, aliquid nam maxime ducimus voluptas, cumque voluptatum atque eaque, praesentium a libero accusamus? Suscipit temporibus obcaecati illum odit vero at.
                            </div>
                            <div className='mt-3'>
                                {tagData.map((data,dataIndex) => (
                                    <div key={dataIndex} className="dark:text-adoplight text-adopsoftdark text-center inline-block cursor-default mr-2 text-lg">
                                        {data.title}
                                    </div>
                                ))}
                            </div>
                            <div className='mt-5 cursor-default'>
                                <div className='text-xl my-3 dark:text-adoplight text-adopsoftdark'>
                                    <b>
                                        ศิลปิน
                                    </b>
                                </div>
                                <div className='pl-3'>
                                    <img className='rounded-full outline outline-2 outline-offset-2 outline-adoplight inline-block h-10 w-10' src="https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/e67f0b11-854a-4e46-b6fb-5bfa78c3a89bfile_2822005.webp" alt="" />
                                    <div className='inline-block pl-5 max-w-md dark:text-adoplight text-adopsoftdark'>
                                        <b className=''>
                                            Username Goes here
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
                            <div className=''>
                                <b className='mr-16 inline-block text-xl dark:text-adoplight text-adopsoftdark'>
                                    ราคา
                                </b>
                                <b className='inline-block text-4xl text-adoppix'>
                                    200
                                </b>
                            </div>
                            <div className='grid grid-cols-2 mt-1'>
                                <div className='pr-2'>
                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                        ประเภทสินค้า
                                    </b>
                                    <p className='text-xs text-end text-adoppix'>
                                        รูปภาพ
                                    </p>
                                </div>
                                <div className='pr-2'>
                                    <b className='text-sm dark:text-adoplight text-adopsoftdark'>
                                        จำนวนที่เหลือ
                                    </b>
                                    <p className='text-xs text-end text-adoppix'>
                                        16 ชิ้น
                                    </p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <p className='text-xs text-red-400 text-end'>
                                    ไม่สามารถใช้ในเชิงพาณิชย์ได้
                                </p>
                                {/* <p className='text-xs text-green-400 text-end'>
                                    สามารถใช้ในเชิงพาณิชย์ได้
                                </p> */}
                            </div>
                            <div className='grid grid-cols-6 mt-2 gap-2'>
                                <div className='col-span-5 bg-adoppix rounded-md text-adoplight text-center py-1 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300'>
                                    <b>
                                        ซื้อ
                                    </b>
                                </div>
                                <div className=' cursor-pointer'>
                                    <AiOutlineHeart className='h-8 w-8 p-1 border border-white rounded-md hover:text-red-400 hover:scale-105 duration-300'></AiOutlineHeart>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}