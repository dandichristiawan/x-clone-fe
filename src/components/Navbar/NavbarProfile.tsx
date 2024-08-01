import backArrow from '@/assets/back.svg';
import { Button } from '../ui/button';

type Props = {
  username: string;
  posts: number
};

export const NavbarProfile = ({ username, posts }: Props) => {
  return (
    <nav className="bg-black p-2 border border-gray-500 border-t-0 border-b-1 w-full lg:w-2/5 xl:w-2/5 h-16 sticky top-0 z-50 opacity-75 flex items-center">
      <div className=" w-1/2 items-center flex justify-start gap-4">
        <Button variant="ghost">
          <img src={backArrow} alt="" width={25} height={25} className="" />
        </Button>
        <div className="flex flex-col">
          <p className="text-white font-bold">{username}</p>
          <p className="text-gray-400">{posts} post</p>
        </div>
      </div>
    </nav>
  );
};
