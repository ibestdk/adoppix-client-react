import { MarketMyShopFeed } from "../../../components/market/market-index/market-myShopFeed"

export const MarketMyShop = () => {

    return (
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative">
                <div className="container px-14 m-auto">
                    <MarketMyShopFeed />
                </div>
            </div>
        </div>
    )
}