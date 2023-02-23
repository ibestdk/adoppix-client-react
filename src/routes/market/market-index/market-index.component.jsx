import MarketFilter from "../../../components/market/market-index/market-filter"
import MarketItemSection from "../../../components/market/market-index/market-itemSection"
import { MarketFeed } from "../../../components/market/market-index/market-feed"

export const MarketIndex = () => {
    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative">
                <div className="container px-14 m-auto">
                {/* <div className="grid grid-cols-5 gap-4">
                    <div className="ml-5 mr-5 col-span-1">
                        <MarketFilter/>
                    </div>
                    <div className="mr-5 col-span-4 w-full mt-[84px]">
                        <MarketItemSection/>
                    </div>
                </div> */}
                    <MarketFeed/>
                </div>
            </div>
        </div>
    )
}