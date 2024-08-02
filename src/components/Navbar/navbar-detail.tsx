import { Button } from '../ui/button';
import backArrow from '@/assets/back.svg';
import { useNavbarHooks } from '@/hooks/navbarhome.hooks';
import { useNavigate } from 'react-router-dom';

export const NavbarDetail = () => {
  const navTo = useNavigate();

  const { showNavbar, isSticky, isRefreshing } = useNavbarHooks();

  return (
    <nav
      className={`bg-black border border-gray-600 border-l-1 border-r-1 border-b-1 border-t-0 w-full md:w-2/5 flex flex-row h-20 md:h-16 justify-between z-50 opacity-85 transition-transform duration-300 ${
        isSticky ? 'sticky top-0' : ''
      } ${
        isRefreshing
          ? 'translate-y-0'
          : showNavbar
          ? 'translate-y-0'
          : '-translate-y-full'
      }`}
    >
      <div className="items-center flex justify-start">
        <Button
          variant="ghost"
          className="hover:bg-transparent"
          onClick={() => navTo(-1)}
        >
          <img src={backArrow} alt="" width={25} height={25} className="" />
        </Button>
      </div>
      <div className=" w-full items-center flex justify-start">
        <p className="text-white font-semibold">Post</p>
      </div>
    </nav>
  );
};
