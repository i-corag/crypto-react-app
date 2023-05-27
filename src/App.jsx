import { ThemeContextProvider } from "./context/ThemeContext"
import { AuthContextProvider } from "./context/AuthContext"
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from "axios"
import Account from "./components/Account"
import Home from "./components/Home"
import NavBar from "./components/NavBar"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import CoinPage from "./components/CoinPage"



function App() {

  const [coins, setCoins] = useState([])
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&locale=en';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
    })
  }, [url]);



  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home coins={coins} />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/account' element={<Account />} />
          <Route path='/coin/:coinId' element={<CoinPage />} />
          <Route path=':coinId' />
        </Routes>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}

export default App
