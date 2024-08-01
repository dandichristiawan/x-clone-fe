import Cookies from 'js-cookie';
import { SpinnerXl } from '@/components/Spinner/xl';
import { NavbarLeft } from '@/components/Navbar/navbar-left';
import { NavbarRight } from '@/components/Navbar/navbar-right';
import { NavbarHome } from '@/components/Navbar/navbar-home';
import { useCreatePost, useGetAllPost } from '@/hooks/home.hooks';
import { ListPostComponent } from '@/features/home/list-post/list';
import { CreatePostComponent } from '@/features/home/create-post/post';
import { FooterHome } from '@/components/Footer/footer-home';

export const Home = () => {
  const isTokenExist = Cookies.get('token');

  const { data, loadingData, refetch } = useGetAllPost();

  const { createPost, loadingPost, setCreatePost, Tweet, progress } =
    useCreatePost();

  const onCreatePost = async () => {
    await Tweet(createPost);
    setCreatePost('');
    refetch();
  };

  return (
    <>
      <NavbarLeft refetch={refetch} />
      <main className="bg-black min-h-dvh">
        <div className="text-white flex flex-col justify-center items-center w-full">
          <NavbarHome />
          {isTokenExist ? (
            <>
              <CreatePostComponent
                val={createPost}
                progress={progress}
                loading={loadingPost}
                onChangeVal={setCreatePost}
                onCreatePost={onCreatePost}
              />
            </>
          ) : null}
          {loadingData ? <SpinnerXl /> : <ListPostComponent data={data} />}
        </div>
        <FooterHome />
      </main>
      <NavbarRight />
    </>
  );
};
