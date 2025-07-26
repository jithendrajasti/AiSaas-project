import React from 'react';
import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Title generator', Icon: Hash },
  { to: '/ai/generate-images', label: 'Image generator', Icon: Image },
  { to: '/ai/remove-background', label: 'Background remover', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove object', Icon: Scissors },
  { to: '/ai/review-resume', label: 'Resume Reviewer', Icon: FileText },
  { to: '/ai/community', label: 'Community', Icon: User }
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!user) return null;

  return (
    <div className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out z-10`}>
      <div className='my-7 w-full px-4'>
        <img src={user.imageUrl} alt="User avatar" className='w-16 h-16 rounded-full mx-auto' />
        <h1 className='mt-2 text-center font-medium text-gray-700'>{user.fullName}</h1>

        <div className='mt-6 flex flex-col text-xs sm:text-sm'>
          {
            navItems.map(({ to, label, Icon }, index) => (
              <NavLink
                key={index}
                to={to}
                end={to === '/ai'}
                onClick={() => setSidebar(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 flex items-center gap-3 rounded transition-colors duration-200 ${
                    isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <div className='flex items-center gap-2'>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span>{label}</span>
                  </div>
                )}
              </NavLink>
            ))
          }
        </div>
      </div>
      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
           <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
                <img src={user.imageUrl} className='w-8 h-8 rounded-full cursor-pointer' alt="" />
                <div>
                  <h1 className='text-sm font-medium'>{user.fullName}</h1>
                  <p className='text-xs text-gray-500'>
                      <Protect plan='premium' fallback="Free">
                        Premium
                      </Protect>
                      Plan
                  </p>
                </div>
           </div>
           <LogOut onClick={()=>signOut()} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer' />
      </div>
    </div>
  );
};

export default Sidebar;
