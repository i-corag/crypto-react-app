import { useState, useEffect } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import axios from 'axios'

const CoinPage = () => {

    const params = useParams();

    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`

    const [coin, setCoin] = useState({})

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoin(response.data)
        })
    }, [url])

    return (
        <div className='rounded-div my-12 py-8 md:px-8'>
            <div className='grid md:grid-cols-2 gap-8'>
                <div>
                    <div className='flex py-8'>
                        <img className='w-20 mr-8' src={coin.image?.large} alt='/' />
                        <div>
                            <p className='text-3xl font-bold'>{coin?.name} price</p>
                            <p>{coin.symbol?.toUpperCase()} / USD</p>
                        </div>
                    </div>
                    {coin.market_data?.current_price ? (<p className='text-3xl font-bold'>${coin.market_data.current_price.usd}</p>) : null}
                    <p>7 Day</p>
                    <div>
                        <Sparklines data={coin.market_data?.sparkline_7d.price}>
                            <SparklinesLine color='teal' />
                        </Sparklines>
                    </div>
                </div>

                <div className='w-2/3'>
                    <div className='flex justify-between'>
                        <div className='my-5'>
                            <p className='text-gray-500 text-md text-left'>Market Cap</p>
                            {coin.market_data?.market_cap ? (<p>${coin.market_data.market_cap.usd.toLocaleString()}</p>) : null}
                        </div>
                        <div className='my-5'>
                            <p className='text-gray-500 text-md text-right'>Volume 24h</p>
                            {coin.market_data?.market_cap ? (<p>${coin.market_data.total_volume.usd.toLocaleString()}</p>) : null}
                        </div>
                    </div>
                    <div div className='flex justify-between'>
                        <div className='my-5'>
                            <p className='text-gray-500 text-md text-left'>24h High</p>
                            {coin.market_data?.high_24h ? (<p>${coin.market_data.high_24h.usd.toLocaleString()}</p>) : null}
                        </div>
                        <div className='my-5'>
                            <p className='text-gray-500 text-md text-right'>24h Low</p>
                            {coin.market_data?.low_24h ? (<p>${coin.market_data.low_24h.usd.toLocaleString()}</p>) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-8'>
                <p className='text-2xl py-2'> About {coin.name}</p>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(coin.description ? coin.description.en : ''), }}></p>
            </div>
        </div >

    )
}

export default CoinPage