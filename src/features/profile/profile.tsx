import React from 'react';
import calendar from '@/assets/calendar.svg';
import { PropsData } from './profile-types';
import { useParams } from 'react-router-dom';
import { NavbarProfile } from '@/components/Navbar/NavbarProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDateJoined } from '@/lib/utils';

export const Profile = () => {
  const { username } = useParams();

  const [data, setData] = React.useState<PropsData>();
  const [loading, setLoading] = React.useState<boolean>(true);

  async function get() {
    try {
      const res = await fetch(
        `http://192.168.1.153:3000/api/user/${username}`,
        {
          mode: 'cors',
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await res.json();

      setData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        <div className="text-white flex flex-col justify-center items-center w-full">
          <NavbarProfile username={data.username} posts={data.posts.length} />
          <div className="bg-[#333639] h-48 w-2/5 relative text-[#333639]">a</div>
          <div className="bg-black w-2/5 p-4 pt-20 relative border border-l-1 border-r-1 border-[#333639]">
            <div className="absolute transform -translate-x-1/2 -top-16 left-20">
              <Avatar className="w-32 h-32 border-black border-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col ">
              <p className="text-xl font-bold">{data.fullname}</p>
              <p className="text-[#71767b]">@{data.username}</p>
            </div>
            <div className="flex flex-row gap-2 text-[#71767b]">
              <img src={calendar} alt="" width={20} height={20} />
              <p>Joined</p>
              <p>{formatDateJoined(data.createdAt)}</p>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-2">
                <p>{data.following.length}</p>
                <p className='text-[#71767b]'>Following</p>
              </div>
              <div className="flex flex-row gap-2">
                <p>{data.followers.length}</p>
                <p className='text-[#71767b]'>Followers</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
