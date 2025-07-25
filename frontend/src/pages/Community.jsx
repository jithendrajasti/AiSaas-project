import React, { useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets'
import { Heart } from 'lucide-react';
import {useUser} from '@clerk/clerk-react';

const Community = () => {
  const [creations, setCreations] = useState(dummyPublishedCreationData);
  const {user}=useUser();
  return (
    <div className='flex-1 h-full flex flex-col gap-4 p-6 bg-gray-100'>
      <h2 className='text-2xl font-bold mb-4'>Creations</h2>
      {
        creations && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 max-h-[75vh] overflow-y-auto'>
            {creations.map((creation, index) => (
              <div
                key={index}
                className='relative cursor-pointer rounded-lg overflow-hidden shadow-md group'
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
                    <Heart className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${creation.likes.includes(user.id)?'fill-red-500 text-red-600':'text-white'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default Community;
