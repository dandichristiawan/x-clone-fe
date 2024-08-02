import React from 'react';
import backArrow from '@/assets/back.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCreatePost } from '@/hooks/home.hooks';

export const CreatePostMobile = () => {
  const navTo = useNavigate();

  const { createPost, setCreatePost, Tweet, loadingPost, progress } =
    useCreatePost();

  const handlePost = async () => {
    await Tweet(createPost);
    setCreatePost('');
    setTimeout(() => navTo(-1), 1000);
  };

  return (
    <>
      <main className="bg-black min-h-dvh">
        <nav className="bg-black flex flex-row p-2 h-16 w-full">
          <div className="items-center flex justify-start w-1/2">
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={() => navTo(-1)}
            >
              <img src={backArrow} alt="" width={25} height={25} className="" />
            </Button>
          </div>
          <div className="items-center flex justify-end w-1/2 mr-4">
            <Button
              disabled={createPost.length < 1}
              onClick={handlePost}
              className="bg-[#1d9bf0] text-white p-4 rounded-full shadow-lg hover:bg-[#1d9bf0] "
            >
              Post
            </Button>
          </div>
        </nav>
        {loadingPost && (
          <progress className="custom-progress" value={progress} max={100} />
        )}
        <div className="p-5 text-white flex flex-row border border-gray-600 border-t-0 border-l-0 border-r-0">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Textarea
            value={createPost}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCreatePost(e.target.value)
            }
            className="border-none bg-black text-xl text-white font-medium"
            placeholder="What is happening?!"
          />
        </div>
      </main>
    </>
  );
};
