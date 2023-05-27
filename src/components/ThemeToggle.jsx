import { useContext } from 'react'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {

    const { theme, setTheme } = useContext(ThemeContext)
    return (
        <div className='p-2'>
            {theme === 'dark' ? (
                <div onClick={() => setTheme(theme === 'dark' ? 'ligth' : 'dark')}
                    className='flex items-center cursor-pointer'>
                    <BsSunFill className='text-primary text-2xl' />
                </div>
            ) : (
                <div onClick={() => setTheme(theme === 'dark' ? 'ligth' : 'dark')}
                    className='flex items-center cursor-pointer'>
                    <BsMoonStarsFill className='text-primary text-2xl' />
                </div>
            )}
        </div>
    )
}

export default ThemeToggle