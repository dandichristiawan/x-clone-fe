import React from 'react';
import { Posts, PropsData } from '@/features/profile/profile-types';

export const useGetProfile = (username: string | undefined) => {

  const [data, setData] = React.useState<PropsData>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  const refetchProfile = React.useCallback(() => {
    if (username) {
      setIsLoading(true);
      getProfile();
    }
  }, [username]);

  React.useEffect(() => {
    if (username) {
      getProfile();
    }
  }, [username]);

  return { data, isLoading, refetchProfile };
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
