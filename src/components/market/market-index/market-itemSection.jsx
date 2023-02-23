import { data } from "jquery";
import Pagination from '@mui/material/Pagination';
import { FaStar } from 'react-icons/fa';
import { TbBusinessplan } from "react-icons/tb";
import { GoVerified } from "react-icons/go";

const MarketItemSection = () => {

    const dataCard = [
        {
            img: "https://media.istockphoto.com/id/1165403702/photo/between-worlds-fantasy-concept.jpg?s=612x612&w=0&k=20&c=aqGwaIGgd1d9dKCQuHINdE7Q_492pToQN2Qqv9j6okA=",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            username: "little one",
            title: "Random Image",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat voluptatum maxime vitae molestias dolor rerum, facilis odio mollitia rem repudiandae adipisci cumque fugit tempore cum officiis vero voluptatibus ullam!",
            tag: ["cat","cute","random"],
            amountLeft: "301",
            commercial: true
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_032.webp",
            price: "1300",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/57e2d54b4853ad14f1dc8460962e33791c3ad6e04e507441722872d7964dc6_640.jpg",
            username: "Doggo",
            title: "well idk? maybe some soft of thing",
            description: "sad dog that asdkljsadjklsadjklsadjklsadjklsadjkl",
            tag: ["cat","cute","random"],
            amountLeft: "12",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/57e6d043435aa514f1dc8460962e33791c3ad6e04e507441722a72dd964ccc_640.jpg",
            price: "900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/54e7d2414c56ad14f1dc8460962e33791c3ad6e04e507440752f78d0964fcd_640.jpg",
            username: "T-Rekt",
            title: "sit the last ass",
            description: "lorem, oh uh its not work in string symbo isnt it?",
            tag: ["cat","cute","random"],
            amountLeft: "3",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/52e4d7414c55ab14f1dc8460962e33791c3ad6e04e50744075277cdc954ec1_640.jpg",
            price: "4,900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/52e6d0434e51a914f1dc8460962e33791c3ad6e04e50744172297cd6934ec0_640.jpg",
            username: "elepent, it spell like this right?",
            title: "america child play",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam necessitatibus quis cum quae minus voluptatibus, consequatur nobis autem, mollitia repellendus eos alias dolorum doloremque amet suscipit perferendis saepe quaerat magnam.",
            tag: ["cat","cute","random"],
            amountLeft: "431",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/57e5d44a4c54ab14f1dc8460962e33791c3ad6e04e50744172297bd5954ccc_640.jpg",
            price: "700",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/5ee2d3424a57b10ff3d8992cc12c30771037dbf85254794e722679d7934d_640.jpg",
            username: "I dress as joker but dont have enough paint",
            title: "smoke monkey",
            description: "Random monkey take my bong, help me",
            tag: ["cat","cute","random"],
            amountLeft: "3",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/52e2d0434f53b10ff3d8992cc12c30771037dbf852547941742673d2964b_640.jpg",
            price: "890",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/57e5d74a4a51a414f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.png",
            username: "we do a little troll in other diamantion",
            title: "my money when i see gacha game",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, quasi omnis. Quidem obcaecati perspiciatis mollitia pariatur beatae laudantium totam, incidunt deserunt? Deserunt ut nisi dolorum eum numquam, eos voluptatum sapiente.",
            tag: ["cat","cute","random"],
            amountLeft: "80",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/50e7d041484faa0df7c5d57bc32f3e7b1d3ac3e45659764f722c7bd092_640.jpg",
            price: "9,000",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/54e4d7434953a514f1dc8460962e33791c3ad6e04e50744172297ed2934ac3_640.png",
            username: "UnknowObject",
            title: "Our pet",
            description: "it cute isnt it?",
            tag: ["cat","cute","random"],
            amountLeft: "800",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/55e0d5444257ab14f1dc8460962e33791c3ad6e04e50744077297bd5924fc0_640.jpg",
            price: "200",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/53e2dc444e57ab14f1dc8460962e33791c3ad6e04e507440772d7cdd934bc2_640.jpg",
            username: "MrGrave",
            title: "squrie? maybe",
            description: "he clime the body i burie",
            tag: ["cat","cute","random"],
            amountLeft: "96",
            commercial: false
        },
        {
            img: "https://media.istockphoto.com/id/1165403702/photo/between-worlds-fantasy-concept.jpg?s=612x612&w=0&k=20&c=aqGwaIGgd1d9dKCQuHINdE7Q_492pToQN2Qqv9j6okA=",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            username: "little one",
            title: "Random Image",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat voluptatum maxime vitae molestias dolor rerum, facilis odio mollitia rem repudiandae adipisci cumque fugit tempore cum officiis vero voluptatibus ullam!",
            tag: ["cat","cute","random"],
            amountLeft: "301",
            commercial: true
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_032.webp",
            price: "1300",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/57e2d54b4853ad14f1dc8460962e33791c3ad6e04e507441722872d7964dc6_640.jpg",
            username: "Doggo",
            title: "well idk? maybe some soft of thing",
            description: "sad dog that asdkljsadjklsadjklsadjklsadjklsadjkl",
            tag: ["cat","cute","random"],
            amountLeft: "12",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/57e6d043435aa514f1dc8460962e33791c3ad6e04e507441722a72dd964ccc_640.jpg",
            price: "900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/54e7d2414c56ad14f1dc8460962e33791c3ad6e04e507440752f78d0964fcd_640.jpg",
            username: "T-Rekt",
            title: "sit the last ass",
            description: "lorem, oh uh its not work in string symbo isnt it?",
            tag: ["cat","cute","random"],
            amountLeft: "3",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/52e4d7414c55ab14f1dc8460962e33791c3ad6e04e50744075277cdc954ec1_640.jpg",
            price: "4,900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/52e6d0434e51a914f1dc8460962e33791c3ad6e04e50744172297cd6934ec0_640.jpg",
            username: "elepent, it spell like this right?",
            title: "america child play",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam necessitatibus quis cum quae minus voluptatibus, consequatur nobis autem, mollitia repellendus eos alias dolorum doloremque amet suscipit perferendis saepe quaerat magnam.",
            tag: ["cat","cute","random"],
            amountLeft: "431",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/57e5d44a4c54ab14f1dc8460962e33791c3ad6e04e50744172297bd5954ccc_640.jpg",
            price: "700",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/5ee2d3424a57b10ff3d8992cc12c30771037dbf85254794e722679d7934d_640.jpg",
            username: "I dress as joker but dont have enough paint",
            title: "smoke monkey",
            description: "Random monkey take my bong, help me",
            tag: ["cat","cute","random"],
            amountLeft: "3",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/52e2d0434f53b10ff3d8992cc12c30771037dbf852547941742673d2964b_640.jpg",
            price: "890",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/57e5d74a4a51a414f1dc8460962e33791c3ad6e04e507441722978d6944fc3_640.png",
            username: "we do a little troll in other diamantion",
            title: "my money when i see gacha game",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, quasi omnis. Quidem obcaecati perspiciatis mollitia pariatur beatae laudantium totam, incidunt deserunt? Deserunt ut nisi dolorum eum numquam, eos voluptatum sapiente.",
            tag: ["cat","cute","random"],
            amountLeft: "80",
            commercial: true
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/50e7d041484faa0df7c5d57bc32f3e7b1d3ac3e45659764f722c7bd092_640.jpg",
            price: "9,000",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/54e4d7434953a514f1dc8460962e33791c3ad6e04e50744172297ed2934ac3_640.png",
            username: "UnknowObject",
            title: "Our pet",
            description: "it cute isnt it?",
            tag: ["cat","cute","random"],
            amountLeft: "800",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/55e0d5444257ab14f1dc8460962e33791c3ad6e04e50744077297bd5924fc0_640.jpg",
            price: "200",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/53e2dc444e57ab14f1dc8460962e33791c3ad6e04e507440772d7cdd934bc2_640.jpg",
            username: "MrGrave",
            title: "squrie? maybe",
            description: "he clime the body i burie",
            tag: ["cat","cute","random"],
            amountLeft: "96",
            commercial: false
        },
        {
            img: "https://media.istockphoto.com/id/1165403702/photo/between-worlds-fantasy-concept.jpg?s=612x612&w=0&k=20&c=aqGwaIGgd1d9dKCQuHINdE7Q_492pToQN2Qqv9j6okA=",
            price: "250",
            profileImg: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_005.webp",
            username: "little one",
            title: "Random Image",
            description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat voluptatum maxime vitae molestias dolor rerum, facilis odio mollitia rem repudiandae adipisci cumque fugit tempore cum officiis vero voluptatibus ullam!",
            tag: ["cat","cute","random"],
            amountLeft: "301",
            commercial: true
        },
        {
            img: "https://chpic.su/_data/stickers/s/Sad_Kyaru_chan/Sad_Kyaru_chan_032.webp",
            price: "1300",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/57e2d54b4853ad14f1dc8460962e33791c3ad6e04e507441722872d7964dc6_640.jpg",
            username: "Doggo",
            title: "well idk? maybe some soft of thing",
            description: "sad dog that asdkljsadjklsadjklsadjklsadjklsadjkl",
            tag: ["cat","cute","random"],
            amountLeft: "12",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/57e6d043435aa514f1dc8460962e33791c3ad6e04e507441722a72dd964ccc_640.jpg",
            price: "900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/54e7d2414c56ad14f1dc8460962e33791c3ad6e04e507440752f78d0964fcd_640.jpg",
            username: "T-Rekt",
            title: "sit the last ass",
            description: "lorem, oh uh its not work in string symbo isnt it?",
            tag: ["cat","cute","random"],
            amountLeft: "3",
            commercial: false
        },
        {
            img: "https://randomwordgenerator.com/img/picture-generator/52e4d7414c55ab14f1dc8460962e33791c3ad6e04e50744075277cdc954ec1_640.jpg",
            price: "4,900",
            profileImg: "https://randomwordgenerator.com/img/picture-generator/52e6d0434e51a914f1dc8460962e33791c3ad6e04e50744172297cd6934ec0_640.jpg",
            username: "elepent, it spell like this right?",
            title: "america child play",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam necessitatibus quis cum quae minus voluptatibus, consequatur nobis autem, mollitia repellendus eos alias dolorum doloremque amet suscipit perferendis saepe quaerat magnam.",
            tag: ["cat","cute","random"],
            amountLeft: "431",
            commercial: true
        }
    ]

    const categoryData =[
        {
            img: "https://t4.ftcdn.net/jpg/01/56/14/43/360_F_156144336_s2Zogfcqap2E3WUm7CaduUA0JKpdt6xb.jpg",
            title: "แฟนตาซี"
        },
        {
            img: "https://cdn.wallpapersafari.com/9/10/c0yL9u.jpg",
            title: "ต่างโลก"
        },
        {
            img: "https://t3.ftcdn.net/jpg/03/67/25/32/360_F_367253281_GdsfPiBPOvCFpG1HyLIxNCZxLu5DeInl.jpg",
            title: "ดราม่า"
        },
        {
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtQLRm0URitelSdCJF4uWXofTxMstu2FReYw&usqp=CAU",
            title: "เอลฟ์"
        },
        {
            img: "https://thumbs.dreamstime.com/b/high-contrast-image-magician-hand-magic-wand-hat-40621914.jpg",
            title: "เวทย์มนต์"
        },
        {
            img: "https://img.freepik.com/free-vector/hand-drawn-flat-kawaii-girl-illustration_52683-94398.jpg?w=2000",
            title: "จิบิ"
        },
        {
            img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bojnice-castle-1603142898.jpg?crop=0.668xw:1.00xh;0.119xw,0&resize=1200:*",
            title: "ปราสาท"
        },
        {
            img: "https://paperpirateship.files.wordpress.com/2017/03/img_0183.png?w=1920",
            title: "การออกแบบ"
        }
    ]

    const textBorderStyle ={
        textShadow: "2px 0 #4F9FDA, -2px 0 #4F9FDA, 0 2px #4F9FDA, 0 -2px #4F9FDA, 1px 1px #4F9FDA, -1px -1px #4F9FDA, 1px -1px #4F9FDA, -1px 1px #4F9FDA"
    }

    return(
        <div className="container" draggable="false">
            <div className="dark:bg-adopsoftdark dark:text-adoplight dark:shadow-md text-adopdark m-[1rem_0] p-4 shadow-[0_0_5px_lightgray] rounded-[.5rem]" draggable="false">
                <div className="pb-5">
                    ผลลัพธ์การค้นหา {dataCard.length} รายการ
                </div>
                <hr />
                <div className="grid grid-cols-8 gap-2 py-8">
                    {categoryData.map((data, dataIndex) => (
                        <div key={dataIndex} className="relative bg-adoppix rounded-md h-16 flex justify-center cursor-pointer hover:scale-105 duration-300">
                            <img className="rounded-md flex-shrink-0 min-w-full min-h-full object-cover" src={data.img} alt="" draggable="false" />
                            <p className="absolute text-2xl shadow-lg top-1/4 border-separate" style={textBorderStyle}>{data.title}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-5 gap-3 pt-2 pb-5">

                    {dataCard.map((data, dataIndex) => (
                        <div className="relative">
                            <div key={dataIndex} className="dark:shadow-md shadow-[0_0_5px_lightgray] rounded-md h-60 bg-adopdark relative overflow-hidden">
                                <img className="flex-shrink-0 min-w-full min-h-full object-cover rounded-md" src={data.img} alt="" draggable="false" />
                                <FaStar className="text-yellow-400 h-6 w-6 absolute top-2 right-2 hover:text-yellow-300 cursor-pointer"/>
                                <TbBusinessplan className="bg-adoppix right-2 top-10 absolute rounded-full p-[3px] h-6 w-6 text-adoplight"/>
                                <div className="relative">
                                    
                                    <div>
                                    <div className="h-16 hover:h-36 absolute w-full bottom-0 duration-300">
                                    
                                    <div className="text-adoplight text-xs absolute z-50 top-1 pl-3 max-w-[150px] overflow-y-hidden text-ellipsis max-h-[30px] cursor-default">
                                        <b>
                                            {data.title}
                                        </b>
                                    </div>
                                    <div className="flex relative z-50 top-10 cursor-pointer">
                                        <img className="rounded-full h-4 w-4 outline outline-offset-0 outline-2 outline-adoppix absolute left-3" src={data.profileImg} alt="" draggable="false" />
                                        <div className="absolute left-9 max-w-[85px] text-adoplight text-xs">
                                            <div className="relative">
                                                <div className="max-w-[70px] w-fit truncate">
                                                    {data.username}
                                                </div>
                                                <div className="h-4">
                                                    <GoVerified className="absolute top-[2px] right-[-15px] text-green-400 cursor-default"/>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className="text-base text-adoppix z-50 absolute right-3 top-1 cursor-default">
                                        <b>
                                            {data.price}
                                        </b>
                                    </div>
                                    <div className="text-xs text-adoplight z-50 absolute right-3 top-8 cursor-default">
                                        <b>
                                            เหลือ {data.amountLeft} ชิ้น
                                        </b>
                                    </div>
                                    <div className="text-xs absolute z-50 w-[95px] break-words overflow-y-hidden text-ellipsis max-h-[50px] top-[60px] left-8 cursor-default text-adoplight">
                                        {data.description}
                                    </div>

                                    {/* ไม่ทราบว่าจะจัดการ Tag ที่โชว์จำนวนมากอย่างไรดี 
                                        1. เลือกโชว์ 1-2 Tag ที่นิยมใช้, ค้นหา
                                        2. เพิ่มความสูงพื้นหลังตามจำนวน Tag ให้สูงไปเรื่อยๆ เพื่อให้โชว์ Tag ทั้งหมด */}
                                    <div className="text-xs text-adopsoftdark top-[118px] left-[19%] py-[3px] px-2 bg-adoplighticon rounded-md z-50 absolute cursor-default">
                                        {data.tag[0]}
                                    </div>

                                    <div className="text-xs px-7 py-[1px] w-[8] bg-adoppix rounded-md absolute z-50 right-2 top-16 cursor-pointer hover:bg-blue-500 duration-300 hover:scale-105 text-adoplight">
                                        <b>
                                            ซื้อ
                                        </b>
                                    </div>
                                    <div className="text-xs px-1 py-[1px] w-[8] bg-yellow-400 rounded-md absolute z-50 right-2 top-[90px] cursor-pointer hover:bg-yellow-500 duration-300 hover:scale-105 text-adoplight">
                                        เพิ่มลงตะกร้า
                                    </div>
                                    <div className="bg-adopsoftdark opacity-75 w-full h-full brightness-75 duration-300"></div>
                                </div>
                                    </div>
                                </div>
                                
                            </div>

                            {/* <div className="absolute text-base bg-green-400 rounded-md text-adoplight px-4 shadow-md py-[1px] top-[-12px] left-[-10px] z-50">
                                <b>
                                    มีแล้ว
                                </b>
                            </div> */}

                            {/* <div className="absolute text-xs bg-red-400 rounded-md text-adoplight px-4 shadow-md py-[6px] top-[-12px] left-[-10px] z-50">
                                <b>
                                    สินค้าใกล้หมด
                                </b>
                            </div> */}

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