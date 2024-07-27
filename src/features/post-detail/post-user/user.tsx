import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import share from '@/assets/share.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import chatBubble from '@/assets/chatbubble.svg';
import { PropsData } from '@/features/post-detail/post-detail-types';
import { twitterTimestamp } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  data: PropsData | undefined;
};

export const PostUserComponent = ({ data }: Props) => {
  return (
    <>
      <div className="flex flex-row gap-4 items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h1 className="text-white font-bold">{data?.user.fullname}</h1>
          <p className="text-gray-500">@{data?.user.username}</p>
        </div>
      </div>
      <p className="my-4">{data?.content}</p>
      <p className="text-gray-500">{twitterTimestamp(data?.createdAt)}</p>

      <Separator className="my-4 border border-gray-600 border-1" />
      <div className="flex flex-row gap-2">
        <img src={chart} alt="chat bubble" width={18} height={18} />
        <p className="text-gray-500">View post engagements</p>
      </div>

      <Separator className="my-4 border border-gray-600" />
      {data ? (
        <div className="flex flex-row justify-between">
          <div className="flex flex-row  items-center gap-2">
            <img src={chatBubble} alt="chat bubble" width={18} height={18} />
            {data?.replies.length > 0 ? (
              <p className="text-gray-600 text-sm">{data!.replies.length}</p>
            ) : null}
          </div>
          <div className="flex flex-row items-center gap-2">
            <img src={repost} alt="chat bubble" width={20} height={20} />
          </div>
          <div className="flex flex-row  items-center gap-2">
            <img src={love} alt="chat bubble" width={18} height={18} />
            {data!.likes > 0 ? (
              <p className="text-gray-600">{data!.likes}</p>
            ) : null}
          </div>
          <div className="flex flex-row  items-center gap-2">
            <img src={bookmark} alt="chat bubble" width={24} height={24} />
          </div>
          <div className="flex flex-row  items-center gap-2">
            <img src={share} alt="share" width={18} height={18} />
          </div>
        </div>
      ) : null}
    </>
  );
};
