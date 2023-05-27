import { Link } from "react-router-dom"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { UserAuth } from "../context/AuthContext"
import { db } from '../firebase'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState } from "react"


const CoinItem = ({ coin }) => {

    const [savedCoin, setSavedCoin] = useState(false)
    const { user } = UserAuth();

    const coinPath = doc(db, 'users', `${user?.email}`)

    const saveCoin = async () => {
        if (user?.email) {
            setSavedCoin(true)
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol
                })
            })
        } else {
            alert('You have to be signed in to save a coin')
        }

    }
    return (
        <tr className='h-[80px] border-b overflow-hidden'>
            <td className='cursor-pointer'>
                {savedCoin ? <AiFillStar size={25} /> : <AiOutlineStar onClick={saveCoin} size={25} />}</td>
            <td>{coin.market_cap_rank}</td>
            <td>
                <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center gap-4 px-4'>
                        <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id} />
                        <p className='hidden sm:table-cell'>{coin.name}</p>
                    </div>
                </Link>
            </td>
            <td>{coin.symbol}</td>
            <td>${coin.current_price.toFixed(2)}</td>
            <td>
                {coin.market_cap_change_percentage_24h > 0 ?
                    (<p className='text-green-600'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</p>)
                    : (<p className='text-red-600'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</p>)
                }
            </td>
            <td className='w-[180px] hidden md:table-cell'>{coin.total_volume.toFixed(2)}</td>
            <td className='w-[180px] hidden sm:table-cell'>{coin.market_cap.toFixed(2)}</td>
        </tr>
    )
}

export { CoinItem }