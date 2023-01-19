import MarketFilter from "../../../components/market/market-filter"
import MarketItemSection from "../../../components/market/market-itemSection"

export const MarketIndex = () => {
    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="relative top-14">
                <div className="container m-auto">
                <div className="grid grid-cols-12 gap-4">
                    <div className="ml-5 mr-5 col-span-2  h-[600px]">
                        <MarketFilter/>
                    </div>
                    <div className="mr-5 col-span-10 h-[1000px] w-full mt-[84px]">
                        <MarketItemSection/>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}