import React from 'react';
import Cookies from 'js-cookie';
import calendar from '@/assets/calendar.svg';
import { useParams } from 'react-router-dom';
import { formatDateJoined } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ProfilePosts } from './profile-post/post';
import { useGetProfile } from '@/hooks/user/profile.hooks';
import { FollowStatusComponent } from './follow-status/status';
import { NavbarProfile } from '@/components/Navbar/navbar-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileLikesPost } from './profile-likes/likes';
import { SpinnerXlCentered } from '@/components/Spinner/xl-centered';

export const Profile = () => {
  const { username } = useParams();

  const { data, refetchProfile, loadingProfile } = useGetProfile(username);

  const isTokenExist = Cookies.get('token');

  const [active, setActive] = React.useState<'post' | 'likes' | null>('post');

  if (loadingProfile) return <SpinnerXlCentered />;

  if (data) {
    return (
      <>
        <div className="text-white flex flex-col justify-center items-center w-full">
          <NavbarProfile
            username={data.username}
            posts={data.posts}
            likes={data.likes}
            active={active}
          />
          <div className="bg-[#333639] h-48 w-full md:w-2/5 relative text-[#333639]">
            a
          </div>
          <div className="bg-black w-full md:w-2/5 p-4 pb-2 pt-20 relative border border-l-1 border-r-1 border-[#333639]">
            <div className="absolute transform -translate-x-1/2 -top-16 left-20">
              <Avatar className="w-32 h-32 border-black border-4">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {isTokenExist && (
                <FollowStatusComponent
                  refetchProfile={refetchProfile}
                  userId={data.userId}
                />
              )}
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
                <p>{data.following}</p>
                <p className="text-[#71767b]">Following</p>
              </div>
              <div className="flex flex-row gap-2">
                <p>{data.followers}</p>
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
              <ProfileLikesPost username={username} />
            </>
          ) : null}
        </div>
      </>
    );
  }
};
