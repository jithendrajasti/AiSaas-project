import React, { useContext, useState } from 'react'
import { Eraser, Hash, Sparkles } from 'lucide-react'
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const RemoveBackground = () => {
  const { backendUrl } = useContext(AppContext);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const formData = new FormData();
      formData.append('image', input);
      const { data } = await axios.post(backendUrl + '/ai/remove-background', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log("error here")
      toast.error(error.message);
    }
    setLoading(false);
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#f84545]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={e => setInput(e.target.files[0])} type="file" accept='image/*' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required />
        <p className='mt-1 text-xs font-extralight '>Supports JPG,PNG and other image formats</p>

        <br />
        <button disabled={loading} type='submit' className={`mx-auto flex items-center w-full justify-center gap-3 bg-gradient-to-r from-[#fc9c4f] to-[#ff3232] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer ${loading && 'opacity-50'}`}>
          {
            loading ?
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <Eraser className='w-3 sm:w-4' />
          }
          Remove background
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96  gap-5'>
        <div className='flex items-center gap-3'> <Eraser className='w-5 h-5 text-[#ff5e5e]' />
          <h1 className='text-xl font-semibold'>
            Processed Image
          </h1>
        </div>

        {
          !content ? (<div className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
              <Eraser className='w-9 h-9' />
              <p className='max-w-md text-center'>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>) : (
            <div>
              <img src={content} alt="" className='rounded-lg' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RemoveBackground