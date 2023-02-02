import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Heart from "react-heart"
import { getToken } from "../../../services/authorize"
export const CardFeed = () => {
    const [take, setTake] = useState(10)
    const [page, setPage] = useState(0)
    const [headers, setHeaders] = useState({})

    const [active, setActive] = useState(false)


    const [auctionItems, setAuctionItems] = useState()
    const callAuctionCard = async () => {
        const bodyData = {}

        const token = getToken();
        console.log(token);
        if (token === false || token === undefined) {
            console.log("call Foundtion 1")
            setHeaders({
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }
        else {

            console.log("call Foundtion 2")
            setHeaders({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            });
        }

        let response = await axios({
            method: "get",
            url: `https://api.adoppix.com/api/auction?take=${take}&page=${page}`,
            data: bodyData,
            headers: headers
        }).catch(err => console.log(err.response))
        console.log(response.data.data)
        setAuctionItems(response.data.data)
    }

    function handleContextMenu(event) {
        event.preventDefault();
    }

    useEffect(() => {
        callAuctionCard()

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
        <div onContextMenu={handleContextMenu} className="grid grid-cols-5 gap-4">
            {
                auctionItems && auctionItems.map((auctionItem, index) => (
                    <div key={index} className="">
                        <div className="relative overflow-hidden">
                            <NavLink className="hover:scale-95 duration-100 hover:brightness-75 transition-all ease-linear" to={`${auctionItem.auctionId}`}>
                                <img onContextMenu={handleContextMenu} className="h-[280px] rounded-lg w-[240px] object-cover overflow-hidden " src={`https://pix.adoppix.com/public/${auctionItem.image}`} />
                            </NavLink>
                            <div className="absolute top-0 right-0 p-2">
                                <div style={{ width: "1.5rem" }}>
                                    <Heart isActive={active} onClick={() => setActive(!active)} animationScale={1.25} style={{ marginBottom: '1rem' }} />
                                </div>
                            </div>
                            <div className="absolute bottom-0 h-16 hover:h-36 hover:bg-opacity-90 w-full bg-adopsoftdark bg-opacity-60 duration-300 transition-all ease-in-out p-1">
                                <div className="text-lg truncate w-[70%]">
                                    {auctionItem.title}
                                </div>
                                <div className="flex">
                                    <div>
                                        <img onContextMenu={handleContextMenu} className="h-[30px] rounded-full w-[30px] object-cover mx-1" src={`https://pix.adoppix.com/public/${auctionItem.profileImage}`} />
                                    </div>
                                    <div className="text-sm font-bold my-auto truncate w-[40%]">
                                        {auctionItem.username}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}