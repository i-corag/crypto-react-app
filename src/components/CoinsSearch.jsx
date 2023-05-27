import { useState } from "react"
//import { useGetCoins } from "../hooks/useGetCoins"
import { CoinItem } from "./CoinItem"


const CoinsSearch = ({ coins }) => {

    const [searchText, setSearchText] = useState('')


    return (
        <div className='rounded-div my-6'>
            <div className='flex flex-col md:flex-row justify-end items-center gap-4 pt-4 pb-6 pr-4 text-center md:text-right'>
                <h1 className='text-xl font-bold my-2'>Search Crypto</h1>
                <form>
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        type='text'
                        placeholder="Search a coin"
                        className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-md' />
                </form>
            </div>

            <table className='w-full border-collapse text-center my-6'>
                <thead>
                    <tr className='border-b'>
                        <th></th>
                        <th className='px-4'>#</th>
                        <th className='text-left px-4'>Coin</th>
                        <th></th>
                        <th>Price</th>
                        <th>24h</th>
                        <th className='hidden md:table-cell'>24h Volume</th>
                        <th className='hidden sm:table-cell'>Mkt</th>
                    </tr>
                </thead>
                <tbody>
                    {coins.filter((value) => {
                        if (searchText === '') {
                            return value
                        } else if (value.name.toLowerCase().includes(searchText.toLowerCase())) {
                            return value
                        }
                    }).map((coin) => {
                        return (
                            <CoinItem key={coin.id} coin={coin} />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CoinsSearch