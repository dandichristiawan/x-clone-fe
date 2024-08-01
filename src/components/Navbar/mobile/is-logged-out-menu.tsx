import burger from '@/assets/burger.svg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import signup from '@/assets/signup.svg';
import log from "@/assets/login.svg"
import { Link } from 'react-router-dom';

export const IsLoggedOutMenu = () => {
  return (
    <div className="flex justify-start items-start w-1/3 md:hidden">
      <Sheet>
        <SheetTrigger>
          <img src={burger} width={35} height={35} className="ml-2" />
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="w-[240px] bg-black border border-r-1 border-slate-600 shadow-xl"
        >
          <SheetHeader>
            <div className="h-96 text-white">
              <ul className="space-y-2 font-medium">
                <li>
                  <Link
                    className="flex items-center text-white rounded-lg dark:text-white md:hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                    to={'/register'}
                  >
                    <img src={signup} alt="" width={20} height={20} />
                    <span className="ms-3">Sign up</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center text-white rounded-lg dark:text-white md:hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                    to={'/login'}
                  >
                    <img src={log} alt="" height={20} width={20} className='rotate-180' />
                    <span className="ms-3">Login</span>
                  </Link>
                </li>
              </ul>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
