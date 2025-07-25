import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react';
import {toast} from 'react-toastify';
const AiTools = () => {
    const navigate=useNavigate();
    const {user}=useUser();
  return (
    <div className='px-4 sm:px-20 xl:px-32 mb-14 flex flex-col gap-10'>
       <div className='text-center'>
           <h2 className='text-slate-700 text-[42px] font-semibold'>Powerful AI Tools</h2>
           <p className='text-gray-500 max-w-lg mx-auto'>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology .</p>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mx-auto'>
            {AiToolsData.map((tool,index)=>(
                <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col gap-5 items-center text-center sm:items-start sm:text-start' onClick={()=>{
                    if(!user){
                        toast.error("Login to use Tools");
                    }
                    else{
                        navigate(tool.path);
                    }
                }}>
                     <tool.Icon className='w-12 h-12 p-3 text-white rounded-xl' style={{
                        background:`linear-gradient(to bottom,${tool.bg.from},${tool.bg.to})`
                     }} />
                     <h3 className='text-xl font-semibold text-black'>{tool.title}</h3>
                     <p className='text-sm text-gray-600'>{tool.description}</p>
                </div>
            ))}
       </div>
    </div>
  )
}

export default AiTools