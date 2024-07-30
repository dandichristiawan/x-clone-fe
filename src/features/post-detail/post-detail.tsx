import { useParams } from 'react-router-dom';
import { PostUserComponent } from './post-user/user';
import { ListReplyComponent } from './list-reply/list';
import { CreateReplyComponent } from './create-reply/reply';
import { NavbarDetail } from '@/components/Navbar/NavbarDetail';
import { useGetPostDetail, useReplyPost } from '@/hooks/post-detail';

export const PostDetail = () => {
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetPostDetail(id);

  const { createReply, loadingReply, reply, setCreateReply } = useReplyPost(id);

  const onCreateReply = async () => {
    await reply(createReply);
    setCreateReply('');
    refetch();
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
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
