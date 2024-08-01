import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import share from '@/assets/share.svg';
import { Replies } from '../post-detail-types';
import chatBubble from '@/assets/chatbubble.svg';
import { formatDateList } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  replies: Replies[] | undefined
};

export const ListReplyComponent = ({ replies }: Props) => {
  if (replies)
    return (
      <div className="flex flex-col justify-center items-center w-full">
        {replies?.map((val, idx) => (
          <div
            key={idx}
            className="border border-b-1 border-l-1 border-r-1 border-t-0 border-gray-600 p-4 w-full md:w-2/5"
          >
            <>
              <div className="flex flex-row gap-4 items-start">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-row gap-2">
                  <h1 className="font-bold">{val.user.fullname}</h1>
                  <p className="text-gray-500">@{val.user.username}</p>
                  <p className="text-gray-500">&middot;</p>
                  <p className="text-gray-500">
                    {formatDateList(val.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex flex-col ml-14">
                <p className="">{val.reply}</p>
                <div className="flex flex-row justify-between mt-7">
                  <div className="flex flex-row  items-center gap-2">
                    <img
                      src={chatBubble}
                      alt="chat bubble"
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img
                      src={repost}
                      alt="chat bubble"
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-row  items-center gap-2">
                    <img src={love} alt="chat bubble" width={18} height={18} />
                  </div>
                  <div className="flex flex-row  items-center gap-2">
                    <img src={chart} alt="chat bubble" width={18} height={18} />
                  </div>
                  <div className="flex flex-row  items-center gap-2">
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
            </>
          </div>
        ))}
      </div>
    );
};
