import React, { useState } from 'react'
import { Eraser, Hash, Scissors, Sparkles } from 'lucide-react'

const RemoveBackground = () => {
    const [image, setImage] = useState('');
    const [input,setInput]=useState('');
    const onSubmitHandler = async (e) => {
      e.preventDefault;
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#3460d1]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={e => setImage(e.target.value)} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
        <p className='mt-6 text-sm font-medium'>Describe object name to remove</p>
        <textarea onChange={e => setInput(e.target.value)} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='e.g., book or mobile , Only single object name' required value={input} />
        
        <br />
        <button type='submit' className='mx-auto flex items-center w-full justify-center gap-3 bg-gradient-to-r from-[#4855cd] to-[#903ae0] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer mt-5'>
          <Scissors className='w-3 sm:w-4' />
          Remove background
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'> <Scissors className='w-5 h-5 text-[#3b77cb]' />
              <h1 className='text-xl font-semibold'>
                Processed Image
              </h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
              <Scissors className='w-9 h-9' />
              <p className='max-w-md text-center'>Upload an image and click "Remove Object" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground