import MarketFilter from "../../components/market/market-filter"
import MarketItemSection from "../../components/market/market-itemSection"
export const Market = () => {
    return(
        <div className="dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="px-20 w-full static">
                <div className="w-1/4 m-0 static">
                    <MarketFilter></MarketFilter>
                </div>
                <div className="w-3/4 inline-block">
                    <MarketItemSection></MarketItemSection>
                </div>
            </div>
        </div>
    )
}
