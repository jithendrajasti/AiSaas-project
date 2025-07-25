import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu,X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import {SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
  const {user,}=useUser();
  const navigate=useNavigate();
  const [sidebar,setSidebar]=useState(false);
  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b shadow-md'>
        <img src={assets.logo} alt="" onClick={()=>navigate('/')} />
        {
          sidebar?
          <X onClick={()=>setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' />:
          <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-orange-500 sm:hidden' />
        }
      </nav>
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <div className='bg-gray-100 flex-1 overflow-x-auto'>
          <Outlet />
         </div>
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout