import React from 'react';
import Cookies from 'js-cookie';
import { VITE_API_BASE_URL } from '@/lib/utils';

export const useFollowHook = () => {
  async function followUser(userIdToFollow: string) {
    try {
      const res = await fetch(`${VITE_API_BASE_URL}/followUser`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({ userIdToFollow }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function unfollowUser(userIdToUnfollow: string) {
    try {
      const res = await fetch(`${VITE_API_BASE_URL}/unfollowUser`, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        method: 'POST',
        body: JSON.stringify({ userIdToUnfollow }),
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { followUser, unfollowUser };
};

export const useCheckFollowStatus = (userIdToCheck: string) => {
  const [status, setStatus] = React.useState<boolean>(false);

  async function isFollowing() {
    try {
      const req = await fetch(
        `${VITE_API_BASE_URL}/check-follow-status?userIdToCheck=${userIdToCheck}`,
        {
          mode: 'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        }
      );

      if (!req.ok) {
        throw new Error('Something went wrong');
      }

      const res = await req.json();
      setStatus(res.isFollowing);
    } catch (error) {
      console.error(error);
    }
  }

  const refetchStatus = () => {
    isFollowing();
  };

  React.useEffect(() => {
    if (userIdToCheck) {
      isFollowing();
    }
  }, [userIdToCheck]);

  return { status, refetchStatus };
};
