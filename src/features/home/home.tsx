import Cookies from 'js-cookie';
import { SkeletonPosts } from './list-post/skeleton';
import { NavbarHome } from '@/components/Navbar/NavbarHome';
import { ListPostComponent } from '@/features/home/list-post/list';
import { CreatePostComponent } from '@/features/home/create-post/post';
import { useCreatePost, useGetAllPost } from '@/hooks/home';

export const Home = () => {
  const isTokenExist = Cookies.get('token');

  const { data, loadingData, refetch } = useGetAllPost();

  const { createPost, loadingPost, setCreatePost, Tweet } = useCreatePost();

  const onCreatePost = async () => {
    await Tweet(createPost);
    setCreatePost('');
    refetch();
  };

  return (
    <div className="text-white flex flex-col justify-center items-center w-full">
      <NavbarHome />
      {isTokenExist ? (
        <>
          <CreatePostComponent
            val={createPost}
            loading={loadingPost}
            onChangeVal={setCreatePost}
            onCreatePost={onCreatePost}
          />
        </>
      ) : null}
      {loadingData ? (
        <SkeletonPosts data={data} />
      ) : (
        <ListPostComponent data={data} />
      )}
    </div>
  );
};
