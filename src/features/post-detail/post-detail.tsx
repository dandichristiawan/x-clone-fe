import React from 'react';
import Cookies from 'js-cookie';
import love from '@/assets/love.svg';
import chart from '@/assets/chart.svg';
import repost from '@/assets/repost.svg';
import bookmark from '@/assets/bookmark.svg';
import share from '@/assets/share.svg';
import chatBubble from '@/assets/chatbubble.svg';
import { useParams } from 'react-router-dom';
import { PropsData } from './post-detail-types';
import { Separator } from '@radix-ui/react-separator';
import { twitterTimestamp } from '@/lib/utils';
import { CreateReplyComponent } from './create-reply/reply';
import { ListReplyComponent } from './list-reply/list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
      <nav className="bg-black p-2 border border-gray-500 border-t-0 border-b-1 w-2/5 sticky top-0 flex flex-row justify-between z-50 opacity-70">
        <div className=" w-1/2 items-center flex justify-center">
          Back
        </div>
        <div className=" w-1/2 items-center flex justify-center">
          Post
        </div>
      </nav>
      <div className="border border-gray-600 border-t-0 flex flex-col w-2/5 p-5 m">
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

      <ListReplyComponent data={data?.replies} />
    </div>
  );
};
