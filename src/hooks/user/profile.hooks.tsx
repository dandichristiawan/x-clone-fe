import React from 'react';
import { Likes, Posts, PropsData } from '@/features/profile/profile-types';

export const useGetProfile = (username: string | undefined) => {
  const [data, setData] = React.useState<PropsData>();

  async function getProfile() {
    try {
      const res = await fetch(
        `http://192.168.103.56:3000/api/user/${username}`,
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
    } catch (error) {
      console.error(error);
    }
  }

  const refetchProfile = React.useCallback(() => {
    if (username) {
      getProfile();
    }
  }, [username]);

  React.useEffect(() => {
    if (username) {
      getProfile();
    }
  }, [username]);

  return { data, refetchProfile };
};

export const useGetProfileLikes = (username: string | undefined) => {
  const [data, setData] = React.useState<Likes[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getProfileLikesPost(username: string) {
    try {
      const res = await fetch(
        `http://192.168.103.56:3000/api/likes/${username}`,
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
      setData(data.likes);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    if (username) {
      getProfileLikesPost(username);
    }
  }, [username]);

  return { data, isLoading };
};

export const useGetProfilePost = (username: string | undefined) => {
  const [data, setData] = React.useState<Posts[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getProfilePost(username: string) {
    try {
      const res = await fetch(
        `http://192.168.103.56:3000/api/userPost/${username}`,
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
      setData(data.posts);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    if (username) {
      getProfilePost(username);
    }
  }, [username]);

  return { data, isLoading };
};
