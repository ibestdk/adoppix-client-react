import { useEffect, useState } from "react"
import axios from "axios"
import { getToken } from "../../../services/authorize"
export const CardFeed = () => {
    const [take, setTake] = useState(10)
    const [page, setPage] = useState(0)

    const callAuctionCard = async () => {
        const bodyData = {}

        const token = getToken();
        const headers = {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        };

        let response = await axios({
            method: "get",
            url: `https://api.adoppix.com/api/auction?take=${take}&page=${page}`,
            data: bodyData,
            headers: headers
        }).catch(err => console.log(err.response))
        console.log(response)
    }

    useEffect(() => {
        callAuctionCard()
    }, []);


    return (
        <div>

        </div>
    )
}