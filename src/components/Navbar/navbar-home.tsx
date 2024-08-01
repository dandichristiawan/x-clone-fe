import React from 'react';

import { useNavbarHooks } from '@/hooks/navbarhome.hooks';
import { Button } from '../ui/button';
import Cookies from 'js-cookie';
import { IsLoggedInMenu } from './mobile/is-logged-in-menu';
import { IsLoggedOutMenu } from './mobile/is-logged-out-menu';

export const NavbarHome = () => {
  const isTokenExist = Cookies.get('token');
  const { showNavbar, isSticky } = useNavbarHooks();
  const [active, setActive] = React.useState<'foryou' | 'following' | null>(
    'foryou'
  );

  return (
    <nav
      className={`bg-black border border-gray-600 border-l-1 border-r-1 border-b-1 border-t-0 w-full md:w-2/5 flex flex-row h-20 md:h-16 justify-between z-50 opacity-85  transition-transform duration-300 ${
        isSticky ? 'sticky top-0' : ''
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {isTokenExist ? (
        <>
          <IsLoggedInMenu />
          <div className="flex flex-row justify-evenly items-center w-full">
            <Button
              onClick={() =>
                setActive(active === 'foryou' ? 'foryou' : 'foryou')
              }
              variant="ghost"
              className={`text-white font-bold hover:bg-transparent hover:text-slate-400 ${
                active === 'foryou'
                  ? 'underline underline-offset-8 text-white underline-blue'
                  : ''
              }`}
            >
              For you
            </Button>
            <Button
              onClick={() =>
                setActive(active === 'following' ? 'following' : 'following')
              }
              variant="ghost"
              className={`text-white font-bold hover:bg-transparent hover:text-slate-400 ${
                active === 'following'
                  ? 'underline underline-offset-8 text-white underline-blue'
                  : ''
              }`}
            >
              Following
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center w-full">
            <IsLoggedOutMenu />
            <div className="flex justify-center items-center w-1/3 md:w-full">
              <h1 className="text-white text-3xl font-bold">X</h1>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
