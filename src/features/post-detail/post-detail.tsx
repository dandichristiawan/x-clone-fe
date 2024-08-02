import { useParams } from 'react-router-dom';
import { PostUserComponent } from './post-user/user';
import { ListReplyComponent } from './list-reply/list';
import { CreateReplyComponent } from './create-reply/reply';
import { NavbarDetail } from '@/components/Navbar/navbar-detail';
import {
  useGetPostDetail,
  useGetPostReplies,
  useReplyPost,
} from '@/hooks/post-detail.hooks';
import Cookies from 'js-cookie';
import { SpinnerMd } from '@/components/Spinner/md';

export const PostDetail = () => {
  const isTokenExist = Cookies.get('token');

  const { id } = useParams();

  const { data, refetchPostDetail } = useGetPostDetail(id);

  const { createReply, loadingReply, reply, setCreateReply, progress } =
    useReplyPost(id);

  const { replies, refetchPostReplies, loading } = useGetPostReplies(id);

  const onCreateReply = async () => {
    await reply(createReply);
    setCreateReply('');
    setTimeout(() => {
      refetchPostDetail();
      refetchPostReplies();
    }, 1000);
  };

  if (data) {
    return (
      <div className="flex flex-col items-center justify-start text-white">
        <NavbarDetail />
        <div className="border border-gray-600 border-t-0 flex flex-col w-full md:w-2/5 p-5 m">
          <PostUserComponent data={data} />
        </div>
        {isTokenExist ? (
          <>
            <CreateReplyComponent
              progress={progress}
              onChangeVal={setCreateReply}
              onCreateReply={onCreateReply}
              val={createReply}
              loading={loadingReply}
            />
          </>
        ) : (
          <></>
        )}
        {loading ? <SpinnerMd /> : <ListReplyComponent replies={replies} />}
      </div>
    );
  }
};
