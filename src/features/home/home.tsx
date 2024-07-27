import React from 'react';
import Cookies from 'js-cookie';
import { SkeletonPosts } from './list-post/skeleton';
import { PropsData } from '@/features/home/home-types';
import { ListPostComponent } from '@/features/home/list-post/list';
import { CreatePostComponent } from '@/features/home/create-post/post';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Home = () => {
  const isTokenExist = Cookies.get('token');

  const [data, setData] = React.useState<PropsData[]>();
  const [loadingData, setLoadingData] = React.useState<boolean>(false);

  const [createPost, setCreatePost] = React.useState<string>('');
  const [loadingPost, setLoadingPost] = React.useState<boolean>(false);

  async function get() {
    setLoadingData(true);
    try {
      const res = await fetch('http://192.168.1.153:3000/api/getPosts', {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setData(data);
      setTimeout(() => {
        setLoadingData(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  async function tweet(content: string) {
    setLoadingPost(true);
    try {
      const res = await fetch('http://192.168.1.153:3000/api/createPost', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    get();
  }, []);

  const onCreatePost = async () => {
    await tweet(createPost);
    setCreatePost('');
    await get();
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full">
      {/* <nav className="bg-black p-2 border border-gray-500 border-t-0 border-b-1 w-2/5 sticky top-0 flex flex-row justify-between z-50"> */}
        <Tabs defaultValue="foryou" className="">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger
              className="bg-black text-white focus:outline-none"
              value="foryou"
            >
              For you
            </TabsTrigger>
            <TabsTrigger
              className="bg-black text-white focus:outline-none"
              value="following"
            >
              Following
            </TabsTrigger>
          </TabsList>
        </Tabs>
      {/* </nav> */}

      {/* <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent> */}
      {isTokenExist ? (
        <>
          <CreatePostComponent
            val={createPost}
            loading={loadingPost}
            onChangeVal={setCreatePost}
            onCreatePost={onCreatePost}
          />
        </>
      ) : null}
      {loadingData ? (
        <SkeletonPosts data={data} />
      ) : (
        <ListPostComponent data={data} />
      )}
    </div>
  );
};
