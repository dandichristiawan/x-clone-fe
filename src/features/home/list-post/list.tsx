import { PropsData } from '../home-types';
import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import share from '@/assets/share.svg';
import chatBubble from '@/assets/chatbubble.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { formatDateList } from '@/lib/utils';
import { useLikeUnlikeHooks } from '@/hooks/like.hooks';
import { Button } from '@/components/ui/button';

type Props = {
  data: PropsData[] | undefined;
  refetch?: () => void | undefined;
};

export const ListPostComponent = ({ data, refetch }: Props) => {
  const { likeUnlikePost } = useLikeUnlikeHooks()

  const onLike = async (postId: string) => {
    await likeUnlikePost(postId)
    if (refetch) {
      refetch()
    }
  }

  return (
    <>
      <div className="flex flex-col w-full md:w-2/5">
        {data?.map((i) => (
          <div
            className={`border border-gray-600 border-b-1 border-l-1 border-r-1 border-t-1 p-4`}
          >
            <div className="flex flex-row w-full gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="flex flex-row gap-2">
                  <h1 className="font-semibold">{i.user.fullname}</h1>
                  <Link to={`/user/${i.user.username}`}>
                    <p className="text-gray-500 hover:underline">
                      @{i.user.username}
                    </p>
                  </Link>
                  <p className="text-gray-500">&middot;</p>
                  <p className="text-gray-500">{formatDateList(i.createdAt)}</p>
                </div>
                <Link to={`/post/${i._id}`}>
                  <p>{i.content}</p>
                </Link>
                <div className="flex flex-row justify-between mt-5 w-full">
                  <div className="flex flex-row  items-center gap-2 w-full">
                    <img
                      src={chatBubble}
                      alt="chat bubble"
                      width={18}
                      height={18}
                    />
                    {i.replies.length > 0 ? (
                      <p className="text-gray-600 text-sm">
                        {i.replies.length}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex flex-row items-center gap-2 w-full">
                    <img
                      src={repost}
                      alt="chat bubble"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-row  items-center gap-2 w-full">
                    <Button variant='ghost' className='bg-transparent p-0 h-0' onClick={() => onLike(i._id)}>
                      <img src={love} alt="chat bubble" width={18} height={18} className='hover:bg-red' />
                    </Button>
                    {i.likes > 0 ? (
                      <p className="text-gray-600">{i.likes}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-row  items-center gap-2 w-full">
                    <img src={chart} alt="chat bubble" width={18} height={18} />
                  </div>
                  <div className="flex flex-row  items-center gap-2 w-full">
                    <img
                      src={bookmark}
                      alt="chat bubble"
                      width={18}
                      height={18}
                    />
                    <img src={share} alt="share" width={18} height={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
