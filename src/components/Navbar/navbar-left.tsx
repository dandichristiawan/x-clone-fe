import Cookies from 'js-cookie';
import home from '@/assets/home.svg';
import notif from '@/assets/notification.svg';
import { Link } from 'react-router-dom';
import { PostModal } from '../PostModal/post-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  refetch?: () => void | undefined;
};

export const NavbarLeft = ({ refetch }: Props) => {
  const isTokenExist = Cookies.get('token');

  const onLogout = () => {
    Cookies.remove('token');
    window.location.reload();
  };
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-16 2xl:left-60 z-40 md:w-36 lg:w-[296px] 2xl:w-[312px]  h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 hidden md:flex flex-col bg-black dark:bg-gray-800">
        <div className="flex h-1/2 justify-start">
          <ul className="space-y-2 font-medium h-1/2 w-full">
            <li>
              <Link
                to={'/home'}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
              >
                <img src={home} alt="" width={20} height={20} />
                <span className="ms-3">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={'#'}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
              >
                <img src={notif} alt="" width={20} height={20} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Notification
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </Link>
            </li>
            <li>
              <Link
                to={'#'}
                className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>
            {!isTokenExist ? (
              <>
                <li>
                  <Link
                    to={'/login'}
                    className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                  </Link>
                </li>
              </>
            ) : null}
            {isTokenExist ? (
              <li>
                <a
                  onClick={onLogout}
                  className="mb-80 cursor-pointer flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-[#1d9bf0] dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="flex justify-start space-y-2 h-1/4 ">
          {isTokenExist ? (
            <div className="flex flex-col justify-end gap-4 w-full">
              <PostModal refetch={refetch} />
              <div className="flex flex-row gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col p-2">
                  <p className="text-white font-bold">
                    {Cookies.get('fullname')}
                  </p>
                  <Link to={`/user/${Cookies.get('username')}`}>
                    <p className="text-gray-500 hover:underline">
                      @{Cookies.get('username')}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
};
