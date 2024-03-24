import { useContext } from "react"
import StockTable from "./StocksComponents/StockTable"
import { DataContext } from "./data.context"

function StocksList({ trendingStocks }) {
    return (
        <>
            <StockTable data={trendingStocks} type='trending' title='Trending Stocks' />
        </>
    );
}

export default StocksList