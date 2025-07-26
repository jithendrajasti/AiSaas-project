import React, { useContext, useState } from 'react'
import { Edit, Sparkles } from 'lucide-react'
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import Markdown from 'react-markdown';
import Loading from '../components/Loading';

const WriteArticle = () => {

  const { backendUrl } = useContext(AppContext);

  const articleLength = [
    {
      length: 800,
      text: 'Short (500-800 words)'
    },
    {
      length: 1200,
      text: 'Medium (800-1200 words)'
    },
    {
      length: 1600,
      text: 'Long (1200-1600 words)'
    }
  ]
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {

      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text} with headings highlighted.`;
      const { data } = await axios.post(backendUrl + '/ai/generate-article', { prompt, length:selectedLength.length }, {
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
      toast.error(error.message);
    }
    setLoading(false);
  }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#4a7aff]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input onChange={e => setInput(e.target.value)} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of Artificial Intelligence is...' required value={input} />
        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            articleLength.map((item, index) => (
              <span onClick={() => setSelectedLength(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item.text}</span>
            ))
          }
        </div>
        <br />
        <button disabled={loading} type='submit' className={`mx-auto flex w-full justify-center items-center gap-3 bg-gradient-to-r from-[#6a6ce7] to-[#cd51fb] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer  ${loading && 'opacity-50'}`}>
          {
            loading?
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>:<Edit className='w-3 sm:w-4' />
          }
          Generate Article
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
           <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>
            Generated article
          </h1>
        </div>

        {
          !content ?(
            <div className='flex-1 flex justify-center items-center'>
              <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
                <Edit className='w-9 h-9' />
                <p className='max-w-md text-center'>Enter a topic and click "Generate article " to get started</p>
              </div>
            </div>
          ): (
             <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
                  <div className='reset-tw'>
                    <Markdown>
                      {content}
                    </Markdown>
                  </div>
             </div>
          )
        }
      </div>
    </div>
  )
}

export default WriteArticle