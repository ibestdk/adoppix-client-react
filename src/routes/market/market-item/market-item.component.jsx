import Skeleton from '@mui/material/Skeleton';

export const MarketItem = () => {
    const tagData = [
        {
            title: "my man"
        },
        {
            title: "helper"
        },
        {
            title: "ระวัง! ดุ!"
        },
        {
            title: "กัดไม่เลือก"
        },
        {
            title: "important"
        },
        {
            title: "helper"
        },
        {
            title: "ระวัง! ดุ!"
        }
    ]

    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative top-14">
                <div className="container m-auto">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="ml-5 mr-5 col-span-3 rounded-md">
                            <div className="justify-items-center bg-adopsoftdark rounded-md">
                                <img className="m-auto" src="https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/e67f0b11-854a-4e46-b6fb-5bfa78c3a89bfile_2822005.webp" alt="" />
                            </div>
                            <div className="mt-5 bg-adoplight rounded-md shadow-md">
                                <div className="p-4">
                                    <h1 className="text-adopdark text-xl">
                                        <b>
                                            Title Goes Here
                                        </b>
                                    </h1>
                                </div>
                                <div className="p-4 pt-0">
                                    <p className="text-adopsoftdark">
                                        Description with Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, explicabo, pariatur possimus qui recusandae voluptates consequatur natus velit soluta eos totam eius, ullam molestias consectetur dicta numquam ipsam quas quae?
                                    </p>
                                </div>
                                <div className="p-5 pt-0">
                                    {tagData.map((data,dataIndex) => (
                                        <div key={dataIndex} className="bg-adoplighticon text-adopdark shadow-md p-2 mt-4 mr-4 text-center rounded-md w-fit inline-block cursor-default">
                                            {data.title}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mr-5 col-span-1 w-full dark:bg-adoplight shadow-md rounded-md p-5 h-fit text-adopdark">
                            <div>
                                <div className="text-3xl text-left">
                                    จำนวนที่เหลือ
                                </div>
                                <div className="text-9xl text-center text-adoppix cursor-default">
                                    12
                                </div>
                                <div className="text-3xl text-right">
                                    ชิ้น
                                </div>
                            </div>
                            <hr />
                            
                            <div className="text-xl text-left pt-5">
                                ผลงานชิ้นนี้ถูกสร้างโดย
                            </div>
                            <div className="py-5 flex relative">
                                <img className="rounded-full h-16 shadow-lg outline outline-offset-2 outline-adoppix cursor-pointer" src="https://sticker-collection.com/stickers/plain/Sad_Kyaru_chan/512/db3b0210-3169-4843-9b52-644e5c58883efile_2822004.webp" alt="" />
                                <div className="pl-6">
                                    <div className="text-2xl mt-3 truncate cursor-pointer hover:text-adoppix">
                                        Bored Cat
                                    </div>
                                </div>
                                <div className="bg-adoplight text-adopsoftdark shadow-lg mt-3 ml-5 py-2 px-4 text-center rounded-md h-fit inline-block cursor-pointer duration-300 hover:bg-adoppix hover:text-adoplight">
                                    ติดตาม
                                </div>
                            </div>
                            <hr />
                            
                            <div className="text-xl text-left pt-5">
                                ผลงานนี้ถูกขายไป
                            </div>
                            <div className="text-3xl text-center">
                                38
                            </div>
                            <div className="text-xl text-right">
                                ชิ้น
                            </div>
                            <hr />

                            <div className="text-xl text-left pt-5">
                                วางขายครั้งแรกเมื่อ
                            </div>
                            <div className="text-3xl text-center pb-2">
                                20/11/2021
                            </div>
                            <hr />
                            <div className="text-xl text-left pt-5">
                                ราคาของผลงาน
                            </div>
                            <div className="text-3xl text-center text-adoppix">
                                250
                            </div>
                            <div className="text-xl text-right">
                                Ac
                            </div>
                            <hr />
                            <div className="rounded-md shadow-lg bg-adoppix w-full p-2 text-center text-adoplight text-xl mt-6 cursor-pointer hover:bg-blue-600 duration-300">
                                ซื้อผลงาน
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}