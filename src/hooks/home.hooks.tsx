import React from 'react';
import Cookies from 'js-cookie';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { PropsData } from '@/features/home/home-types';
import { Link } from 'react-router-dom';

export const useGetAllPost = () => {
  const [data, setData] = React.useState<PropsData[]>();
  const [loadingData, setLoadingData] = React.useState<boolean>(true);

  async function get() {
    try {
      const res = await fetch('http://192.168.103.56:3000/api/getPosts', {
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

  const refetch = () => {
    setLoadingData(true);
    get();
  };

  React.useEffect(() => {
    get();
  }, []);

  return { data, loadingData, refetch };
};

export const useCreatePost = () => {
  const { toast } = useToast();
  const [progress, setProgress] = React.useState<number>(0);
  const [createPost, setCreatePost] = React.useState<string>('');
  const [loadingPost, setLoadingPost] = React.useState<boolean>(false);

  async function Tweet(content: string) {
    setLoadingPost(true);
    setProgress(25);
    try {
      setProgress(45);
      const res = await fetch('http://192.168.103.56:3000/api/createPost', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      setProgress(70);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setProgress(100);
      setTimeout(() => {
        setLoadingPost(false);
        toast({
          title: 'Your post was sent.',
          duration: 2000,
          action: (
            <ToastAction altText="View">
              <Link to={`/post/${data.postId}`}>View</Link>
            </ToastAction>
          ),
          className: 'bg-[#1d9bf0] border-none rounded-lg text-white',
        });
      }, 1000);
    } catch (error) {
      setProgress(0);
      console.error(error);
    }
  }

  return { createPost, loadingPost, setCreatePost, Tweet, progress };
};
