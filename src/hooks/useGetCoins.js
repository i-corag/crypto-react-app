import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';

// const  = 'http://api.coinstats.app/public/v1/coins?skip=0&limit=10';

const getCoins = async () => {
  const res = await Axios.get(url);
  return res.data;
};

export const useGetCoins = () => useQuery(['coins'], getCoins);
