import { useState } from 'react';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const SignUp = () => {

    const navigate = useNavigate()

    const { signUp } = UserAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signUp(email, password)
            navigate('/signin')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div>
            <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
                <h1 className='text-2xl font-bold'>Sing Up</h1>
                {error && <p className='bg-red-500 p-3 my-2' >{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label>Email</label>
                        <div className='my-2 w-full relative rounded-2xl shadow-md'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-2 bg-primary border border-input rounded-2xl' type="email" />
                            <AiOutlineMail className='absolute right-3 top-3 text-gray-400' />
                        </div>
                    </div>
                    <div className='my-4'>
                        <label>Password</label>
                        <div className='my-2 w-full relative rounded-2xl shadow-md'>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className='w-full p-2 bg-primary border border-input rounded-2xl' type="password" />
                            <AiFillLock className='absolute right-2 top-3 text-gray-400' />
                        </div>
                    </div>
                    <button className='w-full my-2 p-2 bg-button text-primary rounded-2xl shadow-md  hover:bg-secondary' type="submit">Sign Up</button>
                </form>
                <p className='my-4'>Already have an account? <Link className='text-accent hover:text-primary ml-2' to='/signin'> Sign In</Link></p>
            </div>
        </div>
    )
}

export default SignUp