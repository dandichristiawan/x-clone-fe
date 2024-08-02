import Cookies from 'js-cookie';
import { VITE_API_BASE_URL } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export const useLikeUnlikeHooks = () => {
  const { toast } = useToast();
  const likeUnlikePost = async (postId: string) => {
    try {
      const res = await fetch(
        `${VITE_API_BASE_URL}/post/like-events`,
        {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
          body: JSON.stringify({ postId }),
        }
      );
      if (!res.ok) {
        throw new Error('Something went wrong');
      }
      const data = await res.json();
      if (data.message === 'Post liked successfully') {
        toast({
          title: 'You liked the post.',
          duration: 2000,
          className:
            'bg-[#1d9bf0] w-30 h-10 border-none rounded-lg text-white fixed bottom-7 left-1/2 -translate-x-1/2',
        });
      } else {
        toast({
          title: 'You unliked the post.',
          duration: 2000,
          className:
            'bg-[#1d9bf0] w-48 h-10 border-none rounded-lg text-white fixed bottom-7 left-1/2 -translate-x-1/2',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { likeUnlikePost };
};
