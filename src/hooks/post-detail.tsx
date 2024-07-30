import React from 'react';
import Cookies from 'js-cookie';
import { PropsData } from '@/features/post-detail/post-detail-types';

export const useGetPostDetail = (id: string | undefined) => {
  const [data, setData] = React.useState<PropsData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function GetPostDetail(id: string | undefined) {
    try {
      const res = await fetch(`http://192.168.1.153:3000/api/post/${id}`, {
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
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  const refetch = () => {
    setIsLoading(true);
    GetPostDetail(id);
  };

  React.useEffect(() => {
    if (id) {
      GetPostDetail(id);
    }
  }, [id]);

  return { data, isLoading, refetch };
};

export const useReplyPost = (id: string | undefined) => {
  const [createReply, setCreateReply] = React.useState<string>('');
  const [loadingReply, setLoadingReply] = React.useState<boolean>(false);

  async function reply(reply: string) {
    setLoadingReply(true);
    try {
      const res = await fetch(
        `http://192.168.1.153:3000/api/post/${id}/reply`,
        {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          method: 'POST',
          body: JSON.stringify({ reply }),
        }
      );
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      setLoadingReply(false);
    } catch (error) {
      console.error(error);
    }
  }

  return { createReply, setCreateReply, loadingReply, reply };
};
