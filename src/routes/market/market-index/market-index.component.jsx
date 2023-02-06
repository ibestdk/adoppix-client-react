import MarketFilter from "../../../components/market/market-index/market-filter"
import MarketItemSection from "../../../components/market/market-index/market-itemSection"

export const MarketIndex = () => {
    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative">
                <div className="container m-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="ml-5 mr-5 col-span-2">
                        <MarketFilter/>
                    </div>
                    <div className="mr-5 col-span-10 w-full mt-[84px]">
                        <MarketItemSection/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}