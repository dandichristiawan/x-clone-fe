import React from 'react';
import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import share from '@/assets/share.svg';
import chatBubble from '@/assets/chatbubble.svg';
import { useParams } from 'react-router-dom';
import { PropsData } from './post-detail-types';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { twitterTimestamp, formatDateList } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreateReplyComponent } from './create-reply/reply';
import Cookies from 'js-cookie';

export const PostDetail = () => {
  const { id } = useParams();

  const [data, setData] = React.useState<PropsData>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [createReply, setCreateReply] = React.useState<string>('');
  const [loadingReply, setLoadingReply] = React.useState<boolean>(false);

  async function getSingle() {
    setLoading(true);
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
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

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

  React.useEffect(() => {
    getSingle();
  }, []);

  const onCreateReply = async () => {
    await reply(createReply);
    setCreateReply('');
    await getSingle();
  };

  return (
    <div className="flex flex-col items-center justify-start text-white">
      <div className="border border-gray-600 border-t-0 flex flex-col w-2/5 p-5">
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
      </div>

      <CreateReplyComponent
        onChangeVal={setCreateReply}
        onCreateReply={onCreateReply}
        val={createReply}
        loading={loadingReply}
      />

      <div className="flex flex-col justify-center items-center w-full">
        {data?.replies.map((val, idx) => (
          <div
            key={idx}
            className="border border-b-1 border-l-1 border-r-1 border-gray-600 p-4 w-2/5"
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
    </div>
  );
};
