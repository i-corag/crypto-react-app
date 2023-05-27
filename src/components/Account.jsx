import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'
import SaveCoins from './SaveCoins'

const Account = () => {
    const { user } = UserAuth();

    if (user) {
        return (
            <div className='max-w-[1140px] mx-auto'>
                <div className='flex justify-center items-center my-14 mx-3 md:mx-20'>
                    <p className='text-lg md:text-2xl font-bold'>Welcome, {user?.email}</p>
                </div>
                <div className='flex justify-between items-center my-12 py-8 rounded-div'>
                    <div className='w-full min-h-[300px]'>
                        <h1 className='text-2xl font-bold py-4 text-center'>Watch List</h1>
                        <SaveCoins />
                    </div>
                </div>
            </div>
        )
    } else {
        return <Navigate to='/signin' />;
    }
}

export default Account