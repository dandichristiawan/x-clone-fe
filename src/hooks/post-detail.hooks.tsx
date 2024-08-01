import React from 'react';
import Cookies from 'js-cookie';
import { PropsData, Replies } from '@/features/post-detail/post-detail-types';

export const useGetPostDetail = (id: string | undefined) => {
  const [data, setData] = React.useState<PropsData>();

  async function GetPostDetail(id: string | undefined) {
    try {
      const res = await fetch(`http://192.168.103.56:3000/api/post/${id}`, {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const refetchPostDetail = () => {
    GetPostDetail(id);
  };

  React.useEffect(() => {
    if (id) {
      GetPostDetail(id);
    }
  }, [id]);

  return { data, refetchPostDetail };
};

export const useGetPostReplies = (id: string | undefined) => {
  const [replies, setReplies] = React.useState<Replies[]>();

  async function GetPostReplies(id: string | undefined) {
    try {
      const res = await fetch(
        `http://192.168.103.56:3000/api/post/${id}/replies`,
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
      setReplies(data.replies);
    } catch (error) {
      console.log(error);
    }
  }

  const refetchPostReplies = () => {
    GetPostReplies(id);
  };

  React.useEffect(() => {
    if (id) {
      GetPostReplies(id);
    }
  }, [id]);

  return { replies, refetchPostReplies };
};

export const useReplyPost = (id: string | undefined) => {
  const [progress, setProgress] = React.useState<number>(0);
  const [createReply, setCreateReply] = React.useState<string>('');
  const [loadingReply, setLoadingReply] = React.useState<boolean>(false);

  async function reply(reply: string) {
    setLoadingReply(true);
    setProgress(25);
    try {
      setProgress(45);
      const res = await fetch(
        `http://192.168.103.56:3000/api/post/${id}/reply`,
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
      setProgress(70);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      setProgress(100);
      setTimeout(() => {
        setLoadingReply(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }

  return { createReply, setCreateReply, loadingReply, reply, progress };
};
