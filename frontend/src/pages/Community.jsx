import React, { useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react';
import {useAuth, useUser} from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Loading from '../components/Loading'

const Community = () => {
  const [creations, setCreations] = useState([]);
  const {user}=useUser();
  const [loading,setLoading]=useState(true);
  const {backendUrl}=useContext(AppContext);
  const {getToken}=useAuth();
  
  const fetchCreations=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/user/get-published-creations',{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });
      if(data.success){
       setCreations(data.creations);
      }else{
      toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
     setLoading(false);
  }
  const imageLikeToggle=async(id)=>{
    try {
      const {data}=await axios.post(backendUrl+'/user/like-creation',{id},{
        headers:{
          Authorization:`Bearer ${await getToken()}`
        }
      });
      if(data.success){
        toast.success(data.message);
        await fetchCreations();
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
     fetchCreations();
  },[user])
  return !loading ? (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4'>Creations</h2>
      {
        creations && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 max-h-[75vh] overflow-y-scroll'>
            {creations.map((creation, index) => (
              <div
                key={index}
                className='relative cursor-pointer rounded-lg overflow-hidden  shadow-md group z-0'
              >
                <img
                  src={creation.content}
                  alt={creation.prompt}
                  className='w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 flex-col gap-4'>
                  <p className='text-white text-center text-sm'>{creation.prompt}</p>
                  <div className='flex gap-1 items-center py-1 px-2 border-2 border-white rounded-lg'>
                    <p className='text-white'>{creation.likes.length}</p>
                    <Heart onClick={()=>imageLikeToggle(creation._id)} className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id)?'fill-red-500 text-red-600':'text-white'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  ):(
    <div className='flex justify-center items-center h-full'>
      <Loading/>
    </div>
  )
}

export default Community;
