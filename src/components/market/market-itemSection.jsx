import { data } from "jquery";
import Pagination from '@mui/material/Pagination';
import { color } from "@mui/system";

const MarketItemSection = () => {

    const dataCard = [
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_008.webp",
            price: "300",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_012.webp",
            price: "400",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sleep and sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_015.webp",
            price: "800",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat wow",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_020.webp",
            price: "850",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_008.webp",
            price: "300",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_012.webp",
            price: "400",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sleep and sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_015.webp",
            price: "800",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat wow",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_020.webp",
            price: "850",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_008.webp",
            price: "300",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_012.webp",
            price: "400",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sleep and sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_015.webp",
            price: "800",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat wow",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_020.webp",
            price: "850",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_008.webp",
            price: "300",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_012.webp",
            price: "400",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat sleep and sad",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_015.webp",
            price: "800",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat wow",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_020.webp",
            price: "850",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_007.webp",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            title: "cat",
            description: "sad cat that asdkljsadjklsadjklsadjklsadjklsadjkl"
        }
    ]

    return(
        <div className="container">
            <div className="dark:bg-adopsoftdark dark:text-adoplight dark:shadow-md text-adopdark m-[1rem_0] p-4 shadow-[0_0_5px_lightgray] rounded-[.5rem]">
                <div>
                    ผลลัพธ์การค้นหา {dataCard.length} รายการ
                </div>
                <hr />
                <div className="grid grid-cols-7 gap-6 pt-5">

                    {dataCard.map((data, dataIndex) => (
                        <div key={dataIndex} className="dark:bg-adoplight text-adopdark dark:shadow-md cursor-pointer shadow-[0_0_5px_lightgray] rounded-[.5rem]">
                        <div className="flex relative">
                            <img className="rounded-md" src={data.img} alt="" />
                        </div>
                        <div className="p-2">
                            <div className="flex relative">
                                <img className="rounded-full h-10" src={data.profileImg} alt="" />
                                <div className="text-sm absolute right-0 bg-adoppix rounded-sm text-adoplight pl-1 pr-1 bottom-14 m-1">
                                    {data.price} Ac
                                </div>
                                <div className="pl-3 truncate">
                                    <div className="text-base">
                                        {data.title}
                                    </div>
                                    <div className="text-xs ml-3">
                                        {data.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}

                </div>

                <div className="bg-adoplight rounded-md">
                    <Pagination count={10} showFirstButton showLastButton />
                </div>
            </div>
        </div>
    );
}

export default MarketItemSection;