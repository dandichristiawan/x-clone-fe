import React from 'react';
import Cookies from 'js-cookie';
import { PropsData } from '@/features/home/home-types';

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
  const [createPost, setCreatePost] = React.useState<string>('');
  const [loadingPost, setLoadingPost] = React.useState<boolean>(false);

  async function Tweet(content: string) {
    setLoadingPost(true)
    try {
      const res = await fetch('http://192.168.103.56:3000/api/createPost', {
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

  return { createPost, loadingPost, setCreatePost, Tweet };
};
