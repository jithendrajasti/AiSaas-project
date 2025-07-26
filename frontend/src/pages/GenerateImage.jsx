import React, { useContext, useState } from 'react'
import { Hash, Image, Sparkles } from 'lucide-react'
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';

const GenerateImage = () => {
  const ImageStyle = ['Realistic','Ghibli style','Anime style','Cartoon style','Fantasy style','Realistic style','3D style','Portrait style'];
      const {backendUrl}=useContext(AppContext);
      const [selectedStyle, setSelectedStyle] = useState('Realistic');
      const [input, setInput] = useState('');

      const [publish,setPublish]=useState(false);
      const [loading, setLoading] = useState(false);
      const [image,setImage]=useState('');
      const {getToken}=useAuth();
      const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const prompt=`Generate a ${selectedStyle} image of ${input}`;
          const {data}=await axios.post(backendUrl+'/ai/generate-image',{prompt,publish},{
            headers:{
              Authorization:`Bearer ${await getToken()}`
            }
          });
          if(data.success){
            setImage(data.content);
          }else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
        setLoading(false);
      }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4ae13c]' />
          <h1 className='text-xl font-semibold'>AI Image Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Describe Your Image</p>
        <textarea onChange={e => setInput(e.target.value)} rows={4} className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to see in the image...' required value={input} />
        <p className='mt-4 text-sm font-medium'>Style</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            ImageStyle.map((item, index) => (
              <span onClick={() => setSelectedStyle(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedStyle === item ? 'bg-green-50 text-green-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item}</span>
            ))
          }
        </div>
        <div className='mt-6 flex items-center gap-2'>
           <label className='relative cursor-pointer'>
            <input type="checkbox" onChange={e=>setPublish(e.target.checked)} checked={publish} className='sr-only peer'/>
            <div className='w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition'></div>
            <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4'></span>
           </label>
           <p className='text-sm'>
            Make this image public
           </p>
        </div>
        <br />
        <button disabled={loading} type='submit' className={`mx-auto flex items-center w-full justify-center gap-3 bg-gradient-to-r from-[#44c644] to-[#dad419] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer ${loading && 'opacity-50'}`}>
          {
            loading?
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>:<Image className='w-3 sm:w-4' />
          }
          Generate Image
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px] gap-5'>
        <div className='flex items-center gap-3'> <Image className='w-5 h-5 text-[#31d731]' />
              <h1 className='text-xl font-semibold'>
                Generated Image
              </h1>
        </div>

        {
          !image?(<div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
              <Image className='w-9 h-9' />
              <p className='max-w-md text-center'>Enter a description and click "Generate Image" to get started</p>
          </div>
        </div>):(
          <div>
            <img className='rounded-lg' src={image} alt="" />
          </div>
        )
        }
      </div>
    </div>
  )
}

export default GenerateImage