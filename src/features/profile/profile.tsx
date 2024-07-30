import React from 'react';
import calendar from '@/assets/calendar.svg';
import { useParams } from 'react-router-dom';
import { NavbarProfile } from '@/components/Navbar/NavbarProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDateJoined } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProfilePosts } from './profile-post/post';
import { useGetProfile } from '@/hooks/profile';

export const Profile = () => {
  const { username } = useParams();
  const [active, setActive] = React.useState<'post' | 'likes' | null>('post');
  const { data, isLoading } = useGetProfile(username);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <>
        <div className="text-white flex flex-col justify-center items-center w-full">
          <NavbarProfile username={data.username} posts={data.posts.length} />
          <div className="bg-[#333639] h-48 w-2/5 relative text-[#333639]">
            a
          </div>
          <div className="bg-black w-2/5 p-4 pb-2 pt-20 relative border border-l-1 border-r-1 border-[#333639]">
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
                <p className="text-[#71767b]">Following</p>
              </div>
              <div className="flex flex-row gap-2">
                <p>{data.followers.length}</p>
                <p className="text-[#71767b]">Followers</p>
              </div>
            </div>
            <div className="flex flex-row justify-around mt-4">
              <Button
                onClick={() => setActive(active === 'post' ? 'post' : 'post')}
                variant="ghost"
                className={`text-[#71767B] hover:bg-transparent hover:text-[#71767B] ${
                  active === 'post'
                    ? 'underline underline-offset-8 text-white underline-blue'
                    : ''
                } `}
              >
                Post
              </Button>
              <Button
                onClick={() =>
                  setActive(active === 'likes' ? 'likes' : 'likes')
                }
                variant="ghost"
                className={`text-[#71767B] hover:bg-transparent  ${
                  active === 'likes'
                    ? 'underline underline-offset-8 text-white underline-blue hover:text-[#71767B]'
                    : ''
                }`}
              >
                Likes
              </Button>
            </div>
          </div>
          {active === 'post' ? (
            <>
              <ProfilePosts fullName={data.fullname} username={username} />
            </>
          ) : null}
          {active === 'likes' ? (
            <>
              <div className="w-2/5 border border-t-0 border-[#333639]">a</div>
            </>
          ) : null}
        </div>
      </>
    );
  }
};
