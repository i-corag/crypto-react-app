import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const NavBar = () => {

    const navigate = useNavigate;

    const [nav, setNav] = useState(false)
    const handleNav = () => setNav(!nav)

    const { user, logOut } = UserAuth();
    const [error, setError] = useState('')
    const handleLogOut = async () => {
        try {
            await logOut();
            navigate('/')
        } catch (e) {
            setError(e.message)
        }
    }

    { error && <p className='bg-red-500 p-3 my-2' >{error}</p> }
    return (
        <header className='flex items-center justify-between h-20 font-bold shadow-sm p-2 md:px-12 md:py-4'>
            <Link to='/'><h1 className='text-lg md:text-2xl px-3'>CRYPTO Powered by Coin Gecko</h1></Link>

            <div className='hidden md:flex md:items-center'>

                <span className='bg-button flex items-center justify-center text-primary px-2 rounded-2xl shadow-md hover:shadow-xl hover:bg-secondary'><ThemeToggle /></span>

                {user?.email ? (
                    <>
                        <Link to='/account' className='bg-button text-primary px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-xl'>Account</Link>
                        <button
                            onClick={handleLogOut}
                            className='bg-button text-primary px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-xl'>Log Out</button>
                    </>
                ) : (
                    <>
                        <Link to='/signin' className='bg-button text-primary px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-xl' >Sign In</Link>
                        <Link to='/signup' className='bg-button text-primary px-5 py-2 ml-2 rounded-2xl shadow-md hover:shadow-xl'>Sign Up</Link>
                    </>
                )}
            </div>

            {/* menu icon */}
            <div onClick={handleNav} className='block px-3 md:hidden cursor-pointer z-10'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>

            {/* mobile menu */}
            <div className={nav ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-screen h-[90%] bg-primary ease-in duration-300 z-10'
                : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'}>
                <ul className='w-full p-4 bg-primary'>
                    <li className='border-b py-6'>
                        <Link to='/' onClick={handleNav} >Home</Link>
                    </li>
                    <li className='py-6'>
                        <Link to='/' onClick={handleNav} ><ThemeToggle /></Link>
                    </li>
                </ul>

                {user?.email ? (
                    <div className='flex flex-col w-full p-4'>
                        <Link to='/account'>
                            <button
                                onClick={handleNav}
                                className='w-full my-2 p-3 bg-button text-primary rounded-2xl shadow-xl'>Account</button>
                        </Link>
                        <Link to='/'>
                            <button
                                onClick={handleLogOut}
                                className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-md'>Log Out</button>
                        </Link>
                    </div>
                ) : (
                    <div className='flex flex-col w-full p-4'>
                        <Link to='/signin'>
                            <button onClick={handleNav} className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-md'>Sign In</button>
                        </Link>
                        <Link to='/signup'>
                            <button onClick={handleNav} className='w-full my-2 p-3 bg-button text-primary rounded-2xl shadow-xl'>Sign Up</button>
                        </Link>
                    </div>
                )}

            </div>
        </header >
    )
}


export default NavBar