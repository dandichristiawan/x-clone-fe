import React from 'react';
import { VITE_API_BASE_URL } from '@/lib/utils';
import { Likes, Posts, PropsData } from '@/features/profile/profile-types';

export const useGetProfile = (username: string | undefined) => {
  const [data, setData] = React.useState<PropsData>();
  const [loadingProfile, setLoadingProfile] = React.useState<boolean>(true)

  async function getProfile() {
    try {
      const res = await fetch(`${VITE_API_BASE_URL}/user/${username}`, {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setData(data);
      setLoadingProfile(false)
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

  return { data, refetchProfile, loadingProfile };
};

export const useGetProfileLikes = (username: string | undefined) => {
  const [data, setData] = React.useState<Likes[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  async function getProfileLikesPost(username: string) {
    try {
      const res = await fetch(`${VITE_API_BASE_URL}/likes/${username}`, {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await res.json();
      setData(data.likes);
      setIsLoading(false);
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
      const res = await fetch(`${VITE_API_BASE_URL}/userPost/${username}`, {
        mode: 'cors',
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
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
