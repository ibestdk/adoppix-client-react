import MarketFilter from "../../components/market/market-filter"
export const Market = () => {
    return(
        <div className="grid grid-cols-12 gap-4 container px-20 dark:bg-adopdark bg-adoplight min-h-screen">
            <div className="col-span-3">
                <MarketFilter></MarketFilter>
            </div>
            <div className="col-span-9">

            </div>
        </div>
    )
}
