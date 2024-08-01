import { Link } from 'react-router-dom';
import log from '@/assets/logout.svg';
import person from '@/assets/person.svg';
import notif from '@/assets/notification.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Cookies from 'js-cookie';

export const IsLoggedInMenu = () => {
  const onLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };

  return (
    <div className="w-1/12 flex justify-start items-center p-4 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent
          side={'left'}
          className="w-[240px] bg-black border border-r-1 border-slate-600 shadow-xl"
        >
          <SheetHeader>
            <div className="flex flex-col gap-1 items-start">
              <Link to={`/user/${Cookies.get('username')}`}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
              <SheetTitle className="text-white">
                {Cookies.get('fullname')}
              </SheetTitle>
              <Link to={`/user/${Cookies.get('username')}`}>
                <p className="text-[#71767b]">@{Cookies.get('username')}</p>
              </Link>
            </div>
            <div className="h-96">
              <div className="flex flex-row gap-2">
                <p className="text-white text-sm">
                  {Cookies.get('following')}{' '}
                  <span className="text-xs text-[#71767b]">Following</span>
                </p>
                <p className="text-white text-sm">
                  {Cookies.get('followers')}{' '}
                  <span className="text-xs text-[#71767b]">Followers</span>
                </p>
              </div>
              <ul className="space-y-2 mt-4 font-medium">
                <li>
                  <Link
                    to={`/user/${Cookies.get('username')}`}
                    className="flex items-center text-white rounded-lg dark:text-white md:hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                  >
                    <img src={person} alt="" width={20} height={20} />
                    <span className="ms-3">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={'/home'}
                    className="flex items-center text-white rounded-lg dark:text-white md:hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                  >
                    <img src={notif} alt="" width={20} height={20} />
                    <span className="ms-3">Notification</span>
                  </Link>
                </li>

                <li>
                  <a
                    onClick={onLogout}
                    className="cursor-pointer flex items-center text-white rounded-lg  md:hover:bg-[#1d9bf0]  group"
                  >
                    <img src={log} width={20} height={20} />
                    <span className="ms-3">Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
