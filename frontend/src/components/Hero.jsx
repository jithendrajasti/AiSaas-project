import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
const Hero = () => {
    const navigate = useNavigate();
    const {user}=useUser();
    return (
        <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url("/gradientBackground.png")] bg-cover bg-no-repeat bg-center min-h-screen'>
            <div className='text-center mb-6'>
                <h1 className=' text-[42px] sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]'>Create amazing Content <br /> with <span className='text-primary'>AI tools</span></h1>
                <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto text-sm text-gray-600'>From writing to image editing, Quick.ai makes everyday tasks simpler, smarter, and faster — no experience needed</p>
            </div>
            <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
                <button onClick={() => {
                    if (!user) {
                        toast.error("Login to use Tools");
                    }
                    else {
                        navigate('/ai');
                    }
                }} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'>Start creating now</button>
                <button className='bg-indigo-200 text-primary px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer'>Watch demo</button>
            </div>
            <div className='flex items-center gap-4 text-gray-600 mt-8 mx-auto text-sm'>
                <img src={assets.user_group} alt="" className='h-8' />
                <p>
                    Trusted by <span className='font-semibold text-primary'>10k+</span> people
                </p>
            </div>
        </div>
    )
}

export default Hero