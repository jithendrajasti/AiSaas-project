import React, { useContext, useState } from 'react'
import { Eraser, FileText, Hash, Paperclip, Sparkles } from 'lucide-react'
import { toast } from 'react-toastify';
import MarkDown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';

const RemoveBackground = () => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
      const [content, setContent] = useState("");
      const {getToken}=useAuth();
      const {backendUrl}=useContext(AppContext);
    const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const formData=new FormData();
        formData.append('resume',input);
        const {data}=await axios.post(backendUrl+'/ai/review-resume',formData,{
          headers:{
            Authorization:`Bearer ${await getToken()}`
          }
        });
        if(data.success){
          setContent(data.content);
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
          <Sparkles className='w-6 text-[#54ffc6]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input onChange={e => setInput(e.target.files[0])} type="file" accept='application/pdf' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required/>
        <p className='mt-1 text-xs font-extralight '>Supports PDF resume only.</p>
        
        <br />
        <button disabled={loading} type='submit' className={`mx-auto flex items-center w-full justify-center gap-3 bg-gradient-to-r from-[#44eb7c] to-[#17a0c6] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer ${loading && 'opacity-50'}`}>
          {
            loading ?
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span> : <FileText className='w-3 sm:w-4' />
          }
          Review Resume
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96'>
        <div className='flex items-center gap-3'> <FileText className='w-5 h-5 text-[#36ec97]' />
              <h1 className='text-xl font-semibold'>
                Analysis Results
              </h1>
        </div>

        {
          !content?
          (
            <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
              <FileText className='w-9 h-9' />
              <p className='max-w-md text-center'>Upload a resume and click "Review Resume" to get started</p>
          </div>
        </div>
          ):(
           <div className='reset-tw'>
            <MarkDown>
               {
                content
               }
            </MarkDown>
           </div>
          )
        }
      </div>
    </div>
  )
}

export default RemoveBackground