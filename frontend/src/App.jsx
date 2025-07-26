import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import DashBoard from './pages/DashBoard';
import BlogTitle from './pages/BlogTitle';
import WriteArticle from './pages/WriteArticle';
import GenerateImage from './pages/GenerateImage';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast';

const App = () => {
  const {getToken}=useAuth();
  const debug=async()=>{
    const token=await getToken();
    console.log(token);
  }
  useEffect(()=>{
    debug();
  },[])
  return (
    <div>
    <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/ai' element={<Layout />}>
          <Route index element={<DashBoard />} />
         <Route path='write-article' element={<WriteArticle />}/>
         <Route path='blog-titles' element={<BlogTitle />}/>
         <Route path='generate-images' element={<GenerateImage />}/>
         <Route path='remove-background' element={<RemoveBackground />}/>
         <Route path='remove-object' element={<RemoveObject />}/>
         <Route path='review-resume' element={<ReviewResume />}/>
         <Route path='community' element={<Community />}/>
        </Route>
      </Routes>
      <ToastContainer autoClose={3000} />
    </div>
  )
}

export default App