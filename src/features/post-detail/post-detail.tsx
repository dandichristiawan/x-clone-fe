import React from 'react';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { PropsData } from './post-detail-types';
import { PostUserComponent } from './post-user/user';
import { ListReplyComponent } from './list-reply/list';
import { CreateReplyComponent } from './create-reply/reply';
import { NavbarDetail } from '@/components/Navbar/NavbarDetail';

export const PostDetail = () => {
  const { id } = useParams();

  const [data, setData] = React.useState<PropsData>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [createReply, setCreateReply] = React.useState<string>('');
  const [loadingReply, setLoadingReply] = React.useState<boolean>(false);

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

  async function reply(reply: string) {
    setLoadingReply(true);
    try {
      const res = await fetch(
        `http://192.168.103.56:3000/api/post/${id}/reply`,
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

  if (loading) {
    return <div className='text-white'>Loading...</div>
  }

  if (data) {
    return (
      <div className="flex flex-col items-center justify-start text-white">
        <NavbarDetail />
        <div className="border border-gray-600 border-t-0 flex flex-col w-2/5 p-5 m">
          <PostUserComponent data={data} />
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
  }
};
