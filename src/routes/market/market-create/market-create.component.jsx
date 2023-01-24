import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const tag = [
    {
        nameTag: "cat"
    },
    {
        nameTag: "shitthen"
    },
    {
        nameTag: "randomObject"
    }
    ,
    {
        nameTag: "rarelySeen"
    }
]

export const MarketCreate = () => {
    return(
        <div className="dark:bg-adopdark bg-adoplight h-[1600px] overflow-hidden relative">
            {/* <img className="w-full" src="https://i.pinimg.com/originals/09/ed/f3/09edf38f25419af1cf30e0bbf8d9e6df.jpg" alt="" /> */}
            <img className="flex-shrink-0 min-w-full min-h-full object-cover" src="https://www.enjpg.com/img/2020/4k-for-mobile-3.jpg" alt="" />
            <div className="h-full absolute w-full min-w-full min-h-full top-0  container m-auto grid grid-cols-1 gap-4 place-items-center">
                 <div className=' grid grid-cols-1 bg-adoplight opacity-100 w-3/5 h-full'>
                    <div className='w-2/3 mx-auto text-adopdark'>
                        <div className="my-14 text-center">
                            <b className="text-adoppix text-4xl opacity-100">
                                สร้างสินค้า
                            </b>
                        </div>
                        <div className="my-6">
                            <p className="text-start">
                                ประเภทสินค้า
                            </p>
                            <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default">
                                <b>
                                    ภาพวาด
                                </b>
                            </div>
                            <div className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block text-center hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                <b>
                                    สติ้กเกอร์
                                </b>
                            </div>
                        </div>
                        <div className="my-6">
                            <p className="text-start">
                                สามารถใช้เชิงพาณิชย์
                            </p>
                            <div className="bg-adoppix text-adoplight rounded-md py-1 w-24 text-base inline-block mr-2 text-center mt-4 cursor-default">
                                <b>
                                    ใช่
                                </b>
                            </div>
                            <div className="bg-adoplighticon text-adoplight rounded-md py-1 w-24 text-base inline-block text-center hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                <b>
                                    ไม่
                                </b>
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4">
                                อัพโหลดรูปภาพ
                            </p>
                            <div className="bg-adoppix rounded-md w-full h-80 opacity-100">
                               
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4">
                                ชื่อสินค้า
                            </p>
                            <div className="bg-adoppix rounded-md w-full opacity-100">
                               <input className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="text" />
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4">
                                คำอธิบาย
                            </p>
                            <div className="bg-adoppix rounded-md w-full opacity-100">
                               <textarea className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon resize-none h-40" type="text" />
                            </div>
                        </div>

                        <div className="my-6">
                            <p className="text-start">
                                จำนวนสินค้า
                            </p>
                            <div className="my-2 bg-adoplighticon text-adoplight rounded-md py-1 w-44 text-base text-center hover:bg-blue-500 hover:scale-105 duration-300 cursor-pointer">
                                <b>
                                    ไม่จำกัดจำนวนสินค้า
                                </b>
                            </div>
                            <div className="bg-adoppix text-adoplight rounded-md py-1 w-44 text-base mr-2 text-center cursor-default mb-2 inline-block">
                                <b>
                                    จำกัดจำนวนสินค้า
                                </b>
                            </div>
                            <p className="text-base inline-block">
                                ระบุจำนวน
                            </p>
                            <div className="text-adopsoftdark rounded-md w-20 mx-2 outline outline-adoplighticon text-center mb-2 inline-block hover:scale-105 duration-300 h-10">
                                <input className="w-20" type="number" />
                            </div>
                            <p className="text-base inline-block">
                                ชิ้น
                            </p>
                        </div>

                        <div className="my-6">
                            <p className="text-start my-4">
                                แท็ค
                            </p>
                            <div className="border border-gray-400 p-2 rounded-md">
                                {tag.map((data,dataIndex) => (
                                    <div key={dataIndex} className="border border-adoplighticon text-adopsoftdark rounded-md py-1 pl-2 pr-1 w-fit text-base inline-block text-center cursor-default mx-1 my-1">
                                        <b>
                                            {data.nameTag}
                                        </b>
                                        <AiOutlineCloseCircle className="inline-block px-1 w-7 h-7 cursor-pointer text-adoplighticon hover:scale-110 hover:text-red-400 duration-300"></AiOutlineCloseCircle>
                                    </div>
                                ))}
                                    <div className="border border-adoplighticon text-adopsoftdark rounded-md p-1 w-fit text-base inline-block text-center cursor-default m-1">
                                        <AiOutlinePlus className="inline-block px-1 w-7 h-7 cursor-pointer text-adoplighticon hover:scale-125 hover:text-adoppix duration-300"></AiOutlinePlus>
                                    </div>
                            </div>

                            <div className="my-6">
                                <p className="text-start my-4">
                                    ราคา
                                </p>
                                <div className="bg-adoppix rounded-md w-1/5 opacity-100">
                                    <input className="rounded-md w-full outline outline-adoplighticon focus:outline-adoplighticon focus:scale-105 duration-300 focus:border-adoplighticon" type="number" />
                                </div>
                            </div>
                            
                            <div className="my-6">
                            
                            <div className="w-fit text-base text-center mt-4 mx-auto cursor-default">
                                <div className="py-2">
                                    <p className="text-center text-sm">
                                        โปรดอ่าน
                                        <b className="text-adoppix px-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300">
                                            Term of use
                                        </b>
                                        และ
                                        <b className="text-adoppix px-1 cursor-pointer hover:underline hover:underline-offset-2 duration-300">
                                            Term of payment
                                        </b>
                                        ก่อนการสร้างสินค้า เพื่อตัวของผู้ใช้เอง
                                    </p>
                                </div>
                                <p className="bg-adoppix text-adoplight rounded-md py-2 px-4 cursor-pointer hover:bg-blue-500 hover:scale-105 duration-300">
                                    ฉันยอมรับ Term of use & Term of payment และ รับทราบแล้ว
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}