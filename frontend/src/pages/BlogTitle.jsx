import React, { useState } from 'react'
import { Hash, Sparkles } from 'lucide-react'

const BlogTitle = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food' ];
  
    const [selectedCategory, setSelectedCategory] = useState('General');
    const [input, setInput] = useState('');
    const onSubmitHandler = async (e) => {
      e.preventDefault;
    }
  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#e9ac33]' />
          <h1 className='text-xl font-semibold'>AI Title Generator</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keyword</p>
        <input onChange={e => setInput(e.target.value)} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The future of Artificial Intelligence is...' required value={input} />
        <p className='mt-4 text-sm font-medium'>Category</p>
        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {
            blogCategories.map((item, index) => (
              <span onClick={() => setSelectedCategory(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? 'bg-purple-50 text-purple-700' : 'text-gray-500 border-gray-300'}`} key={index}>{item}</span>
            ))
          }
        </div>
        <br />
        <button type='submit' className='mx-auto flex items-center w-full justify-center gap-3 bg-gradient-to-r from-[#cd69f5] to-[#429ce0] px-4 py-2 text-white rounded-lg text-xs sm:text-sm cursor-pointer'>
          <Hash className='w-3 sm:w-4' />
          Generate Title
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'> <Hash className='w-5 h-5 text-[#e9ac33]' />
              <h1 className='text-xl font-semibold'>
                Generated titles
              </h1>
        </div>

        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400 px-4' >
              <Hash className='w-9 h-9' />
              <p className='max-w-md text-center'>Enter a topic and click "Generate title" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogTitle