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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const PostDetail = () => {
  const { id } = useParams();

  const [data, setData] = React.useState<PropsData>();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function getSingle() {
    setLoading(true);
    try {
      const res = await fetch(`http://192.168.103.56:3000/api/post/${id}`, {
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

  React.useEffect(() => {
    getSingle();
  }, []);

  return (
    <main className="bg-black min-h-dvh flex flex-col items-center justify-start text-white ">
      <div className="bg-black flex flex-col w-1/2 p-5">
        <div className="flex flex-row gap-4 items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>@{data?.user.username}</h1>
        </div>
        <p className="my-4">{data?.content}</p>
        <p>{data?.createdAt}</p>

        <Separator className="my-4 border border-gray-600" />
        <div className="flex flex-row gap-2">
          <img src={chart} alt="chat bubble" width={18} height={18} />
          <p>View post engagements</p>
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

        <Separator className="my-4 border border-gray-600" />
        <div className="flex flex-col">
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Textarea
              className="border-none bg-black"
              placeholder="Post your reply"
            ></Textarea>
          </div>
        </div>
        <div className="mt-2 mb-4 flex justify-end">
          <>
            <Button className="bg-[#1a8cd8] rounded-full hover:bg-white hover:text-black">
              Reply
            </Button>
          </>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        {data?.replies.map((val, idx) => (
          <div
            key={idx}
            className="border border-b-0 border-l-1 border-r-1 border-gray-600 p-4 w-1/2"
          >
            <>
              <div className="flex flex-row gap-4 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1>@{val.user.username}</h1>
              </div>
              <div className="flex flex-col ml-14">
                <p className="">{val.reply}</p>
                <div className="flex flex-row justify-between mt-10">
                  <div className="flex flex-row  items-center gap-2">
                    <img
                      src={chatBubble}
                      alt="chat bubble"
                      width={18}
                      height={18}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <img src={repost} alt="chat bubble" width={20} height={20} />
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
    </main>
  );
};
