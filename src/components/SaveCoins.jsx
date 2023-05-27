import { useState, useEffect } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from '../firebase'
import { UserAuth } from '../context/AuthContext'

const SaveCoins = () => {

    const { user } = UserAuth();

    const [coins, setCoins] = useState([])

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setCoins(doc.data()?.watchList)
        }
        )
    }, [user?.email])

    const coinPath = doc(db, 'users', `${user?.email}`)
    const deleteCoin = async (passedId) => {
        try {
            const result = coins.filter((coin) => coin.id !== passedId)
            await updateDoc(coinPath, {
                watchList: result
            })
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div>
            {coins?.length === 0 ? (<p className='text-center'>You don't have any coins saved. <Link className='text-accent hover:text-primary' to='/'>Go an add some 🙂</Link></p>)
                : (
                    <table className='w-full border-collapse text-center'>
                        <thead>
                            <tr className='border-b'>
                                <th className='px-4'>Rank #</th>
                                <th className='px-4 text-left'>Coin</th>
                                <th className='px-4 text-left'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins?.map((coin) => {
                                return (
                                    <tr key={coin?.id} className='h-[60px] overflow-hidden'>
                                        <td>{coin?.rank}</td>
                                        <td>
                                            <Link to={`/coin/${coin?.id}`}>
                                                <div className='flex items-center'>
                                                    <img src={coin?.image} className='w-8 mr-4' alt='/' />
                                                    <p className='hidden sm:table-cell'>{coin?.name}</p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className='pl-8'><AiOutlineDelete onClick={() => deleteCoin(coin?.id)} className='cursor-pointer' sixe={40} /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default SaveCoins